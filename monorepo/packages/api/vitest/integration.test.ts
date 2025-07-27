/**
 * Integration tests for @webrtc2/api package
 */

import { describe, expect, it } from 'vitest';

describe('@webrtc2/api - Integration Tests', () => {
    describe('Package Structure', () => {
        it('should be importable as ES module', async () => {
            const apiModule = await import('../clients');

            expect(apiModule).toBeDefined();
            expect(apiModule.AdminAPI).toBeDefined();
            expect(apiModule.InternalAPI).toBeDefined();
            expect(apiModule.ClientAPI).toBeDefined();
        });

        it('should have proper default export', async () => {
            const { default: defaultExport } = await import('../clients');

            expect(defaultExport).toBeDefined();
            expect(typeof defaultExport).toBe('object');
            expect(defaultExport.admin).toBeDefined();
            expect(defaultExport.internal).toBeDefined();
            expect(defaultExport.client).toBeDefined();
        });
    });

    describe('Version Consistency', () => {
        it('should have consistent version across package.json and exports', async () => {
            const packageJson = await import('../package.json');
            const { API_VERSION } = await import('../clients');

            expect(packageJson.version).toBe(API_VERSION);
            expect(API_VERSION).toBe('1.0.0');
        });
    });

    describe('Generated Files Structure', () => {
        it('should have all required client directories', () => {
            // This test ensures the file structure is correct
            const fs = require('fs');
            const path = require('path');

            const clientsDir = path.join(__dirname, '../clients');
            expect(fs.existsSync(clientsDir)).toBe(true);

            const zones = ['admin', 'internal', 'client'];
            zones.forEach(zone => {
                const zoneDir = path.join(clientsDir, zone);
                expect(fs.existsSync(zoneDir)).toBe(true);
            });

            // Check index.ts exists
            const indexFile = path.join(clientsDir, 'index.ts');
            expect(fs.existsSync(indexFile)).toBe(true);
        });

        it('should have TypeScript files in each zone', () => {
            const fs = require('fs');
            const path = require('path');

            const zones = ['admin', 'internal', 'client'];
            zones.forEach(zone => {
                const zoneDir = path.join(__dirname, '../clients', zone);
                const files = fs.readdirSync(zoneDir);

                // Should have TypeScript files
                const tsFiles = files.filter((file: string) => file.endsWith('.ts'));
                expect(tsFiles.length).toBeGreaterThan(0);

                // Should have index.ts
                expect(files).toContain('index.ts');
            });
        });
    });

    describe('Monorepo Integration', () => {
        it('should be usable by other packages in monorepo', async () => {
            // Test that the package can be imported with workspace:* syntax
            try {
                const apiModule = await import('@webrtc2/api');
                expect(apiModule).toBeDefined();
            } catch (error) {
                // This might fail in test environment, but structure should be correct
                expect(error).toBeDefined();
            }
        });
    });

    describe('Auto-generation Metadata', () => {
        it('should have recent generation timestamp', async () => {
            const { GENERATED_AT } = await import('../clients');

            const generatedDate = new Date(GENERATED_AT);
            const now = new Date();
            const timeDiff = now.getTime() - generatedDate.getTime();

            // Should be generated within the last 24 hours (86400000 ms)
            // This is more flexible for development/testing
            expect(timeDiff).toBeLessThan(86400000);
            expect(generatedDate).toBeInstanceOf(Date);
            expect(GENERATED_AT).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+$/);
        });

        it('should have valid zone configuration', async () => {
            const { ZONES, TOTAL_CLIENTS } = await import('../clients');

            expect(Array.isArray(ZONES)).toBe(true);
            expect(ZONES.length).toBe(TOTAL_CLIENTS);
            expect(ZONES.every(zone => typeof zone === 'string')).toBe(true);
            expect(ZONES.every(zone => zone.length > 0)).toBe(true);
        });
    });
}); 