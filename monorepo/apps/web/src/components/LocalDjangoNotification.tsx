'use client';

import { useState, ReactNode } from 'react';
import { useDjangoServer } from '@/hooks/useDjangoServer';

interface LocalDjangoNotificationProps {
    className?: string;
    children?: ReactNode;
}

export default function LocalDjangoNotification({ className = '', children }: LocalDjangoNotificationProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { serverStatus, lastChecked, checkServer } = useDjangoServer();

    const getStatusIcon = () => {
        switch (serverStatus) {
            case 'checking':
                return (
                    <svg className="h-5 w-5 text-blue-400 animate-spin" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                );
            case 'online':
                return (
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'offline':
                return (
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
        }
    };

    const getStatusText = () => {
        switch (serverStatus) {
            case 'checking':
                return 'Checking Django server...';
            case 'online':
                return 'Django server is running';
            case 'offline':
                return 'Django server is not running';
        }
    };

    const getStatusColor = () => {
        switch (serverStatus) {
            case 'checking':
                return 'bg-blue-50 border-blue-200';
            case 'online':
                return 'bg-green-50 border-green-200';
            case 'offline':
                return 'bg-red-50 border-red-200';
        }
    };

    return (
        <>
            {/* Server Status Notification */}
            <div className={`${getStatusColor()} border rounded-lg p-4 ${className}`}>
                <div className="flex">
                    <div className="flex-shrink-0">
                        {getStatusIcon()}
                    </div>
                    <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-800">
                                {getStatusText()}
                            </h3>
                            {lastChecked && (
                                <span className="text-xs text-gray-500">
                                    Last checked: {lastChecked.toLocaleTimeString()}
                                </span>
                            )}
                        </div>
                        
                        {serverStatus === 'offline' && (
                            <div className="mt-2 text-sm text-gray-700">
                                <p>
                                    This API demo requires a running local Django project. The API endpoints are designed to work with the Django Revolution sample project.
                                </p>

                                {!isExpanded && (
                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        className="mt-2 text-blue-600 hover:text-blue-500 font-medium underline"
                                    >
                                        Show setup instructions
                                    </button>
                                )}

                                {isExpanded && (
                                    <div className="mt-3 space-y-3">
                                        <div className="bg-white rounded-md p-3 border border-gray-200">
                                            <h4 className="font-medium text-gray-900 mb-2">Quick Setup:</h4>
                                            <ol className="list-decimal list-inside space-y-1 text-sm">
                                                <li>Clone the Django Revolution sample project:
                                                    <div className="bg-gray-100 rounded p-2 mt-1 font-mono text-xs">
                                                        git clone https://github.com/markolofsen/django-revolution.git
                                                    </div>
                                                </li>
                                                <li>Navigate to the django_sample directory:
                                                    <div className="bg-gray-100 rounded p-2 mt-1 font-mono text-xs">
                                                        cd django-revolution/django_sample
                                                    </div>
                                                </li>
                                                <li>Install dependencies and run migrations:
                                                    <div className="bg-gray-100 rounded p-2 mt-1 font-mono text-xs">
                                                        pip install -r requirements.txt<br />
                                                        python manage.py migrate
                                                    </div>
                                                </li>
                                                <li>Start the development server:
                                                    <div className="bg-gray-100 rounded p-2 mt-1 font-mono text-xs">
                                                        python manage.py runserver
                                                    </div>
                                                </li>
                                            </ol>
                                        </div>

                                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-2">
                                                    <p className="text-sm text-yellow-700">
                                                        Make sure the Django server is running on <code className="bg-yellow-100 px-1 rounded">http://localhost:8000</code> before testing the API endpoints.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setIsExpanded(false)}
                                            className="text-blue-600 hover:text-blue-500 font-medium underline text-sm"
                                        >
                                            Hide instructions
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {serverStatus === 'online' && (
                            <div className="mt-2 text-sm text-gray-700">
                                <p className="text-green-700">
                                    ✅ Django server is running and accessible. You can now test the API endpoints.
                                </p>
                                <button
                                    onClick={checkServer}
                                    className="mt-2 text-blue-600 hover:text-blue-500 font-medium underline text-sm"
                                >
                                    Refresh status
                                </button>
                            </div>
                        )}

                        {serverStatus === 'checking' && (
                            <div className="mt-2 text-sm text-gray-700">
                                <p>
                                    Checking if Django server is running on <code className="bg-gray-100 px-1 rounded">http://localhost:8000</code>...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Render children if provided */}
            {children && <>{children}</>}
        </>
    );
} 