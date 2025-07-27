import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

type ServerStatus = 'checking' | 'online' | 'offline';

export const useDjangoServer = () => {
  const [serverStatus, setServerStatus] = useState<ServerStatus>('checking');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCheckingRef = useRef(false);

  const checkDjangoServer = useCallback(async () => {
    // Prevent multiple simultaneous checks
    if (isCheckingRef.current) return;
    
    isCheckingRef.current = true;
    
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
    } finally {
      isCheckingRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkDjangoServer();
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set up interval based on current status
    const intervalTime = serverStatus === 'online' ? 30000 : 5000; // 30s for online, 5s for offline
    
    intervalRef.current = setInterval(checkDjangoServer, intervalTime);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [serverStatus, checkDjangoServer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    serverStatus,
    lastChecked,
    isOnline: serverStatus === 'online',
    isOffline: serverStatus === 'offline',
    isChecking: serverStatus === 'checking',
    checkServer: checkDjangoServer,
  };
}; 