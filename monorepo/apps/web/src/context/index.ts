/**
 * Context exports
 */

// Re-export context and hooks
export { AuthProvider, useAuth } from './AuthContext';
export type { AuthContextType, AuthProviderProps, UserProfile, UserRegistration, LoginCredentials } from './types';

// Re-export components for convenience
export { default as LoginForm } from '../components/LoginForm';
export { default as RegisterForm } from '../components/RegisterForm'; 