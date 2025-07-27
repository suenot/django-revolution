/**
 * Simple API Class
 * Everything in one place - auth, clients, configuration
 */

import { API } from '@repo/api';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Initialize API client with base URL only
const api = new API(apiUrl);

export default api;
