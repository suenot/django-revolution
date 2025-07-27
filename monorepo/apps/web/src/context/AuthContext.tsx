'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';
import { DjangoErrorHandler } from '@repo/api';
import type { AuthContextType, AuthProviderProps, UserProfile, UserRegistration, LoginCredentials } from './types';

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Use existing API client

    // Check if user is authenticated on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Check authentication status
    const checkAuthStatus = async () => {
        try {
            if (api.isAuthenticated()) {
                await getCurrentUser();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            // Clear invalid tokens
            api.clearTokens();
        } finally {
            setIsLoading(false);
        }
    };

    // Register new user
    const register = async (userData: UserRegistration): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        clearError();

        const response = await api.accounts.authRegisterCreate({
            body: userData
        });

        // Check if response has error (non-2xx status)
        if ('error' in response && response.error) {
            const errorHandler = new DjangoErrorHandler(response, 'Registration failed');

            // Check if it's a 400 error (validation errors)
            if (errorHandler.isBadRequest()) {
                setError(errorHandler.getMessage());
            } else {
                setError(errorHandler.getMessage());
            }

            setIsLoading(false);
            return false;
        }

        if (response.data) {
            // Handle successful registration response
            const data = response.data as any;

            // Check if response contains tokens and user (auto-login response)
            if (data.tokens && data.user) {
                const tokens = data.tokens;
                const user = data.user;

                if (tokens.access && tokens.refresh) {
                    // Store tokens
                    api.setToken(tokens.access, tokens.refresh);

                    // Set user directly
                    setUser(user);

                    setIsLoading(false);
                    return true;
                }
            }

            // If no tokens in response, try auto-login
            setIsLoading(false);
            if (userData.email) {
                return await login({
                    email: userData.email,
                    password: userData.password
                });
            }
            return false;
        }

        setIsLoading(false);
        return false;
    };

    // Login user
    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        clearError();

        const response = await api.accounts.authLoginCreate({
            body: credentials
        });

        // Check if response has error (non-2xx status)
        if ('error' in response && response.error) {
            const errorHandler = new DjangoErrorHandler(response, 'Login failed');

            // Check if it's a 400 error (validation errors)
            if (errorHandler.isBadRequest()) {
                setError(errorHandler.getMessage());
            } else {
                setError(errorHandler.getMessage());
            }

            setIsLoading(false);
            return false;
        }

        // Handle login response
        if (response.data) {
            const data = response.data as any;

            // Check if response contains tokens and user
            if (data.tokens && data.user) {
                const tokens = data.tokens;
                const user = data.user;

                if (tokens.access && tokens.refresh) {
                    // Store tokens
                    api.setToken(tokens.access, tokens.refresh);

                    // Set user directly
                    setUser(user);

                    setIsLoading(false);
                    return true;
                }
            }

            // Fallback: try old format (just tokens)
            const tokens = data as Record<string, unknown>;
            if ('access' in tokens && 'refresh' in tokens && typeof tokens.access === 'string' && typeof tokens.refresh === 'string') {
                api.setToken(tokens.access, tokens.refresh);

                // Get user profile
                await getCurrentUser();
                setIsLoading(false);
                return true;
            }
        }

        setIsLoading(false);
        return false;
    };

    // Logout user
    const logout = async (): Promise<void> => {
        try {
            // Call logout endpoint to blacklist tokens
            await api.accounts.authLogoutCreate();
        } catch (error) {
            console.error('Logout API call failed:', error);
        } finally {
            // Clear local state regardless of API call success
            setUser(null);
            api.clearTokens();
        }
    };

    // Refresh access token
    const refreshToken = async (): Promise<boolean> => {
        try {
            const refreshToken = api.getRefreshToken();
            if (!refreshToken) {
                return false;
            }

            const response = await api.accounts.authRefreshCreate({
                body: { refresh: refreshToken }
            });

            if (response.data) {
                const tokens = response.data;
                if ('access' in tokens) {
                    api.setToken(tokens.access, refreshToken);
                    return true;
                }
            }

            return false;
        } catch (error) {
            console.error('Token refresh failed:', error);
            // Clear invalid tokens
            api.clearTokens();
            setUser(null);
            return false;
        }
    };

    // Get current user profile
    const getCurrentUser = async (): Promise<void> => {
        try {
            const response = await api.accounts.profileRetrieve();

            if (response.data) {
                setUser(response.data);
            }
        } catch (error) {
            if (error && typeof error === 'object' && 'response' in error) {
                const apiError = error as { response?: { status?: number } };
                if (apiError.response?.status === 401) {
                    // Token expired, try to refresh
                    const refreshed = await refreshToken();
                    if (refreshed) {
                        // Retry getting user profile
                        await getCurrentUser();
                    } else {
                        // Refresh failed, logout
                        await logout();
                    }
                } else {
                    console.error('Failed to get user profile:', error);
                    setError('Failed to load user profile');
                }
            } else {
                console.error('Failed to get user profile:', error);
                setError('Failed to load user profile');
            }
        }
    };

    // Update user profile
    const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await api.accounts.profileUpdate({
                body: profileData
            });

            if (response.data) {
                setUser(response.data);
                return true;
            }

            return false;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Clear error
    const clearError = () => {
        setError(null);
    };

    // Context value
    const contextValue: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        register,
        login,
        logout,
        refreshToken,
        updateProfile,
        getCurrentUser,
        clearError,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use AuthContext
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 