'use client';

import { useState } from 'react';

interface LocalDjangoNotificationProps {
    className?: string;
}

export default function LocalDjangoNotification({ className = '' }: LocalDjangoNotificationProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-blue-800">
                        Local Django Project Required
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
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
                                <div className="bg-white rounded-md p-3 border border-blue-100">
                                    <h4 className="font-medium text-blue-900 mb-2">Quick Setup:</h4>
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
                </div>
            </div>
        </div>
    );
} 