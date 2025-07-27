/**
 * Tests for auto-generated API clients
 */

import { describe, expect, it } from 'vitest';
import { AdminAPI, API_VERSION, ClientAPI, GENERATED_AT, InternalAPI, TOTAL_CLIENTS, ZONES } from '../clients';

describe('@webrtc2/api - Auto-generated API clients', () => {
    describe('Metadata', () => {
        it('should have correct API version', () => {
            expect(API_VERSION).toBe('1.0.0');
            expect(typeof API_VERSION).toBe('string');
        });

        it('should have generated timestamp', () => {
            expect(GENERATED_AT).toBeDefined();
            expect(typeof GENERATED_AT).toBe('string');
            expect(new Date(GENERATED_AT)).toBeInstanceOf(Date);
        });

        it('should have correct zones list', () => {
            expect(ZONES).toEqual(['admin', 'internal', 'client']);
            expect(TOTAL_CLIENTS).toBe(3);
        });
    });

    describe('API Namespaces', () => {
        it('should export AdminAPI namespace', () => {
            expect(AdminAPI).toBeDefined();
            expect(typeof AdminAPI).toBe('object');
        });

        it('should export InternalAPI namespace', () => {
            expect(InternalAPI).toBeDefined();
            expect(typeof InternalAPI).toBe('object');
        });

        it('should export ClientAPI namespace', () => {
            expect(ClientAPI).toBeDefined();
            expect(typeof ClientAPI).toBe('object');
        });
    });

    describe('Generated Clients Structure', () => {
        it('AdminAPI should have expected structure', () => {
            // Check if AdminAPI has typical client structure
            expect(typeof AdminAPI).toBe('object');
            // Should have types and SDK exports from generated files
            expect(Object.keys(AdminAPI).length).toBeGreaterThan(0);
        });

        it('InternalAPI should have expected structure', () => {
            expect(typeof InternalAPI).toBe('object');
            expect(Object.keys(InternalAPI).length).toBeGreaterThan(0);
        });

        it('ClientAPI should have expected structure', () => {
            expect(typeof ClientAPI).toBe('object');
            expect(Object.keys(ClientAPI).length).toBeGreaterThan(0);
        });
    });

    describe('Default Export', () => {
        it('should export default object with all clients', async () => {
            const defaultExport = await import('../clients');

            expect(defaultExport.default).toBeDefined();
            expect(defaultExport.default).toHaveProperty('admin');
            expect(defaultExport.default).toHaveProperty('internal');
            expect(defaultExport.default).toHaveProperty('client');

            expect(defaultExport.default.admin).toBe(AdminAPI);
            expect(defaultExport.default.internal).toBe(InternalAPI);
            expect(defaultExport.default.client).toBe(ClientAPI);
        });
    });

    describe('Type Safety', () => {
        it('should have proper TypeScript types', () => {
            // These should compile without errors if types are correct
            const version: string = API_VERSION;
            const timestamp: string = GENERATED_AT;
            const zones: string[] = ZONES;
            const count: number = TOTAL_CLIENTS;

            expect(version).toBe('1.0.0');
            expect(timestamp).toBeDefined();
            expect(zones.length).toBe(3);
            expect(count).toBe(3);
        });
    });

    describe('API Clients Availability', () => {
        it('should have all required zones available', () => {
            const expectedZones = ['admin', 'internal', 'client'];

            expectedZones.forEach(zone => {
                expect(ZONES).toContain(zone);
            });
        });

        it('should have consistent client count', () => {
            expect(ZONES.length).toBe(TOTAL_CLIENTS);
            expect(TOTAL_CLIENTS).toBe(3);
        });
    });
}); 