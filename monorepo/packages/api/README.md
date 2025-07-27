# @carapis/api

Auto-generated TypeScript API clients from Django OpenAPI generator.

## Installation

```bash
pnpm add @carapis/api
```

## Usage

```typescript
import { initializeAllClients } from '@carapis/api';

// Initialize all API clients
const api = await initializeAllClients({
  apiUrl: 'http://localhost:8000/apix',
  token: 'your-token',
});

// Use the clients
const vehicles = await api.encar_public.dataEncarVehiclesList();
const user = await api.client.accountsMeRetrieve();
```

## License

MIT
