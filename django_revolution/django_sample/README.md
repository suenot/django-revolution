# Django Revolution - Sample Project

This is a test Django project for Django Revolution, demonstrating zone-based API client generation.

## Quick Start

### Prerequisites

- Python 3.8+
- Django 4.0+
- Django REST Framework
- drf-spectacular

### Running Tests

1. **Navigate to the django_revolution directory:**

   ```bash
   cd /path/to/backend/pypi/django_revolution
   ```

2. **Run the generation script:**

   ```bash
   ./run_generation.sh
   ```

   Or manually:

   ```bash
   PYTHONPATH=.:django_sample:. python django_sample/teststest_real_generation.py
   ```

## Project Structure

```
django_sample/
├── apps/
│   ├── public_api/          # Public API zone
│   │   ├── models.py        # User, Post models
│   │   ├── views.py         # ViewSets
│   │   ├── urls.py          # URL patterns
│   │   └── serializers.py   # DRF serializers
│   └── private_api/         # Private API zone
│       ├── models.py        # Category, Product, Order models
│       ├── views.py         # ViewSets
│       ├── urls.py          # URL patterns
│       └── serializers.py   # DRF serializers
├── settings.py              # Django settings with zones config
├── urls.py                  # Main URL configuration
└── teststest_real_generation.py  # Generation test script
```

## Zones Configuration

The project demonstrates two API zones:

### Public Zone

- **Apps:** `django_sample.apps.public_api`
- **Models:** User, Post
- **Endpoints:** `/api/users/`, `/api/posts/`
- **Access:** Public, no auth required

### Private Zone

- **Apps:** `django_sample.apps.private_api`
- **Models:** Category, Product, Order, OrderItem
- **Endpoints:** `/api/private/categories/`, `/api/private/products/`, etc.
- **Access:** Private, auth required

## Generated Output

After running the generation script, you'll find:

- **OpenAPI Schemas:** `../openapi/schemas/public.yaml`, `private.yaml`
- **TypeScript Clients:** `../openapi/clients/typescript/public/`, `private/`
- **Python Clients:** `../openapi/clients/python/public/`, `private/`

## Testing the Generated Clients

### TypeScript

```typescript
import { PublicApiClient } from './openapi/clients/typescript/public';

const client = new PublicApiClient();
const users = await client.users.list();
```

### Python

```python
from openapi.clients.python.public import PublicApiClient

client = PublicApiClient()
users = client.users.list()
```

## Troubleshooting

### Common Issues

1. **Import errors:** Ensure you're running from the correct directory with proper PYTHONPATH
2. **Missing dependencies:** Install required packages (Django, DRF, drf-spectacular)
3. **Zone detection:** Check that apps are properly configured in `settings.py`

### Debug Mode

Enable debug logging by setting `DEBUG = True` in `settings.py` or environment variables.

## Next Steps

- Customize zone configurations in `settings.py`
- Add more models and endpoints
- Integrate with your real Django project
- Configure monorepo sync for production use
