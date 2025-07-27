# @webrtc2/api Tests

Tests for auto-generated API clients from Django OpenAPI generator.

## Test Structure

### `api-clients.test.ts`
Core tests for verifying:
- ✅ Metadata (API version, timestamp, zones)
- ✅ Namespace exports (AdminAPI, InternalAPI, ClientAPI)
- ✅ Generated client structure
- ✅ Default export with all clients
- ✅ Type safety and TypeScript types

### `integration.test.ts`
Integration tests for verifying:
- ✅ ES module imports
- ✅ Version consistency
- ✅ Generated client file structure
- ✅ Monorepo integration
- ✅ Auto-generation metadata

## Running Tests

```bash
# Run all tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run with coverage
pnpm test:coverage
```

## What is Tested

1. **Auto-generation**: Verify clients are generated correctly
2. **Versioning**: API_VERSION matches package.json
3. **Structure**: All zones (admin, internal, client) are present
4. **Exports**: Namespace exports work without type conflicts
5. **Metadata**: Generation timestamp is current
6. **Typing**: TypeScript types are correct

## Automatic Updates

Tests automatically update when clients are generated:
- New zones are automatically added to tests
- API version is synchronized
- Generation timestamp is updated

## CI/CD Integration

Tests should run:
- On every Django API change
- During monorepo builds
- Before publishing @webrtc2/api package 