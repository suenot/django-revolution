/**
 * Trading Signals API - Index
 * API for trading signals, channels and messages
 * 
 * Zone: trading
 * Apps: apps.trading_signals
 */

export * from './sdk.gen';
export * from './types.gen';
export * from './client.gen';

// Re-export main client for convenience
export { client as default } from './client.gen'; 