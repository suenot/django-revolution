/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Environment variables
    env: {
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    },
    
    // Webpack configuration for better module resolution
    webpack: (config, { isServer }) => {
        // Add resolve fallbacks for Node.js modules
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
            };
        }
        
        return config;
    },
    
    // TypeScript configuration
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: false,
    },
    
    // ESLint configuration
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
