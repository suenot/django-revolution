import { useState, useEffect } from 'react';
import axios from 'axios';

type ServerStatus = 'checking' | 'online' | 'offline';

export const useDjangoServer = () => {
  const [serverStatus, setServerStatus] = useState<ServerStatus>('checking');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkDjangoServer = async () => {
    setServerStatus('checking');
    try {
      // Try to connect to Django admin or any endpoint
      await axios.get('http://localhost:8000/admin/', {
        timeout: 3000, // 3 second timeout
        validateStatus: (status) => status < 500, // Accept any status < 500 (including 403, 404, etc.)
      });
      
      // If we get any response, the server is running
      setServerStatus('online');
      setLastChecked(new Date());
    } catch {
      setServerStatus('offline');
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    checkDjangoServer();
    
    let interval: NodeJS.Timeout;
    
    // If server is offline, check every second
    // If server is online, check every 30 seconds
    const startInterval = () => {
      const intervalTime = serverStatus === 'online' ? 30000 : 1000;
      interval = setInterval(checkDjangoServer, intervalTime);
    };
    
    startInterval();
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [serverStatus]); // Re-run effect when serverStatus changes

  return {
    serverStatus,
    lastChecked,
    isOnline: serverStatus === 'online',
    isOffline: serverStatus === 'offline',
    isChecking: serverStatus === 'checking',
    checkServer: checkDjangoServer,
  };
}; 