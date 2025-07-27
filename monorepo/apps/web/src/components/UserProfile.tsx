'use client';

import { useAuth } from '../context';

export function UserProfile() {
    const { user, logout, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Not authenticated</div>;
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
                {user.avatar && (
                    <img
                        src={user.avatar}
                        alt={user.display_name}
                        className="w-16 h-16 rounded-full"
                    />
                )}
                <div>
                    <h2 className="text-xl font-semibold">{user.display_name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
            </div>

            {user.bio && (
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700">Bio</h3>
                    <p className="text-gray-600 mt-1">{user.bio}</p>
                </div>
            )}

            <div className="mt-4 flex space-x-2">
                {user.phone && (
                    <span className="text-sm text-gray-600">📞 {user.phone}</span>
                )}
                {user.website && (
                    <span className="text-sm text-gray-600">🌐 {user.website}</span>
                )}
                {user.location && (
                    <span className="text-sm text-gray-600">📍 {user.location}</span>
                )}
            </div>

            <div className="mt-6">
                <button
                    onClick={logout}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
} 