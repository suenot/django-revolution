import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['vitest/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'dist/',
                'clients/',
                'vitest/',
                '*.config.*',
            ],
        },
    },
    esbuild: {
        target: 'node18',
    },
}); 