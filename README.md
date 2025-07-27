# Django Revolution

**Zone-based API client generator for Django projects**

## 🎯 Purpose

A powerful Django framework extension that revolutionizes web development with modern patterns, enhanced tooling, and streamlined workflows.

## ✅ Rules

- Define zones in Django settings using Pydantic models
- Use `python manage.py revolution` for generation
- Auto-installs dependencies (HeyAPI, openapi-python-client)
- Supports monorepo integration
- Archives clients with versioning

## 🚀 Features

- **Zone-Based API Organization** - Organize APIs into logical zones with clear boundaries
- **Multi-Language Client Generation** - TypeScript and Python clients with type safety
- **Automatic OpenAPI Schemas** - Generate OpenAPI 3.0 schemas automatically
- **Seamless Django Integration** - Zero configuration, works out of the box
- **Monorepo Support** - Intelligent synchronization with monorepo structures
- **Type-Safe Configuration** - Pydantic models for zone configuration

## 📦 Installation

```bash
pip install django-revolution
```

## 🛠️ Quick Start

### 1. Configure Django Settings

```python
# settings.py
INSTALLED_APPS = [
    'django_revolution',
    # ... your other apps
]

# Django Revolution Configuration
from django_revolution.app_config import ZoneConfig, get_revolution_config

def create_revolution_config() -> dict:
    """Get Django Revolution configuration as dictionary."""

    # Define zones with typed Pydantic models
    zones = {
        'public': ZoneConfig(
            apps=['apps.public_api'],
            title='Public API',
            description='Public API for testing - users and posts',
            public=True,
            auth_required=False,
            version='v1'
        ),
        'private': ZoneConfig(
            apps=['apps.private_api'],
            title='Private API',
            description='Private API for testing - categories, products, orders',
            public=False,
            auth_required=True,
            version='v1'
        )
    }

    return get_revolution_config(
        project_root=BASE_DIR,
        zones=zones,
        debug=DEBUG,
        api_prefix="api"
    )

# Apply Django Revolution settings
DJANGO_REVOLUTION = create_revolution_config()
```

### 2. Configure URLs

```python
# urls.py
from django.urls import path, include
from django_revolution.urls_integration import add_revolution_urls

urlpatterns = [
    # Your existing URLs...
]

# Add Django Revolution URL patterns automatically
# This creates:
# - /schema/public/schema/ (OpenAPI spec)
# - /schema/public/schema/swagger/ (Swagger UI)
# - /schema/private/schema/ (OpenAPI spec)
# - /schema/private/schema/swagger/ (Swagger UI)
# - /api/public/ (Public API endpoints)
# - /api/private/ (Private API endpoints)
# - /openapi/archive/ (Generated clients)
urlpatterns = add_revolution_urls(urlpatterns)
```

### 3. Generate Clients

```bash
# Auto-detects zones and generates all clients
python manage.py revolution

# Generate specific zones
python manage.py revolution --zones public private

# TypeScript only
python manage.py revolution --typescript
```

### 4. Use Generated Clients

```typescript
// TypeScript
import { client } from "./openapi/clients/typescript/public";
const users = await client.sdk.users.list();
```

```python
# Python
from openapi.clients.python.public import PublicAPI
api = PublicAPI(base_url="https://api.example.com")
users = api.users.list()
```

## 🔧 Zone Configuration

### ZoneConfig Parameters

Each zone is configured using a `ZoneConfig` Pydantic model with the following parameters:

| Parameter       | Type        | Default      | Description                             |
| --------------- | ----------- | ------------ | --------------------------------------- |
| `apps`          | `List[str]` | **Required** | List of Django apps in this zone        |
| `title`         | `str`       | **Required** | Zone title for documentation            |
| `description`   | `str`       | **Required** | Zone description                        |
| `public`        | `bool`      | `True`       | Is zone public (affects documentation)  |
| `auth_required` | `bool`      | `False`      | Authentication required for this zone   |
| `version`       | `str`       | `"v1"`       | API version (used in generated clients) |

### Zone Parameters Explained

- **`apps`**: List of Django app names that belong to this zone
- **`title`**: Human-readable title used in OpenAPI documentation
- **`description`**: Detailed description of the zone's purpose
- **`public`**: Whether the zone is intended for public access (affects documentation metadata)
- **`auth_required`**: Whether authentication is required (may be used for future middleware)
- **`version`**: API version string used in generated client packages

### Generated URLs

Based on the zone configuration, Django Revolution automatically creates:

#### Schema URLs

- `/schema/{zone_name}/schema/` - OpenAPI specification (JSON/YAML)
- `/schema/{zone_name}/schema/swagger/` - Swagger UI interface
- `/schema/{zone_name}/schema/redoc/` - ReDoc interface

#### API URLs

- `/api/{zone_name}/` - API endpoints for the zone

#### Archive URLs

- `/openapi/archive/` - Generated client packages

### Example URLs for Sample Configuration

With the sample configuration above, you get:

```
# Public Zone
/schema/public/schema/           # OpenAPI spec
/schema/public/schema/swagger/   # Swagger UI
/api/public/                     # API endpoints

# Private Zone
/schema/private/schema/          # OpenAPI spec
/schema/private/schema/swagger/  # Swagger UI
/api/private/                    # API endpoints

# Generated Clients
/openapi/archive/                # Client packages
```

## 🎯 Best Practices

### Zone Organization

```python
# Good: Logical separation by domain
zones = {
    'auth': ZoneConfig(
        apps=['apps.accounts', 'apps.permissions'],
        title='Authentication API',
        description='User authentication and authorization',
        public=True,
        auth_required=False,
        version='v1'
    ),
    'billing': ZoneConfig(
        apps=['apps.billing', 'apps.payments'],
        title='Billing API',
        description='Payment processing and billing management',
        public=False,
        auth_required=True,
        version='v1'
    ),
    'content': ZoneConfig(
        apps=['apps.posts', 'apps.comments', 'apps.media'],
        title='Content API',
        description='User-generated content management',
        public=True,
        auth_required=False,
        version='v1'
    )
}
```

### API Prefix Configuration

```python
# Customize API prefix
return get_revolution_config(
    project_root=BASE_DIR,
    zones=zones,
    debug=DEBUG,
    api_prefix="v1"  # Results in /v1/public/, /v1/private/
)
```

### Monorepo Integration

```python
# Enable monorepo integration
from django_revolution.app_config import MonorepoConfig

monorepo = MonorepoConfig(
    enabled=True,
    path=str(BASE_DIR.parent.parent / 'monorepo'),
    api_package_path='packages/api/src'
)

return get_revolution_config(
    project_root=BASE_DIR,
    zones=zones,
    debug=DEBUG,
    monorepo=monorepo
)
```

## 📚 Documentation

Comprehensive documentation is available at [GitHub Pages](https://revolution.unrealos.com/).

## 🔧 Requirements

- Python 3.9+
- Django 4.0+
- Pydantic 2.0+ (for type-safe configuration)
- Node.js 18+ (for TypeScript generation)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

Non-Commercial License - see [LICENSE](LICENSE) file for details.

For commercial use, please contact Unrealos Inc. at licensing@unrealos.com

## 🆘 Support

- 📖 [Documentation](https://revolution.unrealos.com/)
- 🐛 [Issue Tracker](https://github.com/markolofsen/django-revolution/issues)
- 💬 [Discussions](https://github.com/markolofsen/django-revolution/discussions)
