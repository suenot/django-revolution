%%README.LLM id=django-revolution-usage%%

# Usage Guide

**How to use Django Revolution in your projects.**

## 🎯 Purpose

Complete guide for using Django Revolution to generate and use API clients.

## ✅ Rules

- Always run `python manage.py revolution` after Django changes
- Use zone-based organization for better API structure
- Generated clients are ready to use immediately
- Archive management preserves version history

## 🚀 Basic Usage

### Installation

Just run:

```bash
pip install django-revolution
# or
poetry add django-revolution
```

### Generate Clients

```bash
# Generate all clients
python manage.py revolution

# Generate specific zones
python manage.py revolution --zones public admin

# TypeScript only
python manage.py revolution --typescript
```

### Use TypeScript Clients

```typescript
import API from '@myorg/api-client';

const api = new API('https://api.example.com');

// Authentication
api.setToken('your-access-token', 'your-refresh-token');

// Call endpoints
const profile = await api.public.getCurrentUser();
const products = await api.public.listProducts();

// Check auth status
if (api.isAuthenticated()) {
  console.log('User is logged in');
}
```

### Use Python Clients

```python
from openapi.clients.python.public import PublicAPI

api = PublicAPI(base_url="https://api.example.com")
api.set_token("your-token-here")

# Call endpoints
profile = api.accounts.get_current_user()
products = api.products.list()
```

## 🎯 Zone Configuration

### Define Zones

```python
# settings.py
from django_revolution.app_config import ZoneConfig, get_revolution_config

zones = {
    'public': ZoneConfig(
        apps=['accounts', 'billing', 'payments'],
        title='Public API',
        description='API for public client applications',
        public=True,
        auth_required=False,
        version='v1',
        path_prefix='public'
    ),
    'admin': ZoneConfig(
        apps=['admin_panel', 'analytics'],
        title='Admin API',
        description='Administrative API endpoints',
        public=False,
        auth_required=True,
        version='v1',
        path_prefix='admin'
    )
}

REVOLUTION_CONFIG = get_revolution_config(
    project_root=Path.cwd(),
    zones=zones
)
```

### Zone Properties

| Property        | Type | Required | Description                 |
| --------------- | ---- | -------- | --------------------------- |
| `apps`          | list | ✅       | Django apps to include      |
| `title`         | str  | ❌       | Human-readable title        |
| `description`   | str  | ❌       | Zone description            |
| `public`        | bool | ❌       | Is zone publicly accessible |
| `auth_required` | bool | ❌       | Requires authentication     |
| `version`       | str  | ❌       | API version (default: 'v1') |
| `path_prefix`   | str  | ❌       | URL path prefix             |

## 🔧 Ready-to-Use Configs

### DRF + Spectacular Configuration

```python
from django_revolution.drf_config import create_drf_config

# One function call - everything configured!
drf_config = create_drf_config(
    title="My API",
    description="My awesome API",
    version="1.0.0",
    schema_path_prefix="/api/",
    enable_browsable_api=False,
    enable_throttling=True,
)

# Get Django settings
settings = drf_config.get_django_settings()
REST_FRAMEWORK = settings['REST_FRAMEWORK']
SPECTACULAR_SETTINGS = settings['SPECTACULAR_SETTINGS']
```

### Configuration Options

| Option                 | Type | Default | Description              |
| ---------------------- | ---- | ------- | ------------------------ |
| `title`                | str  | "API"   | API title                |
| `description`          | str  | ""      | API description          |
| `version`              | str  | "1.0.0" | API version              |
| `schema_path_prefix`   | str  | "/api/" | Schema URL prefix        |
| `enable_browsable_api` | bool | False   | Enable DRF browsable API |
| `enable_throttling`    | bool | False   | Enable rate limiting     |

## 🌐 URL Configuration

### Add Revolution URLs

```python
# urls.py
from django_revolution import add_revolution_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    # Your existing URLs...
]

# Add Django Revolution URLs
urlpatterns = add_revolution_urls(urlpatterns)
```

### Generated URLs

Django Revolution automatically creates:

- `/api/{zone}/schema/` - Interactive Swagger UI
- `/api/{zone}/schema.yaml` - OpenAPI specification
- `/openapi/archive/` - Download generated clients

## 📦 Monorepo Integration

### Automatic Setup

Django Revolution configures your monorepo automatically:

```yaml
# pnpm-workspace.yaml (auto-generated)
packages:
  - 'packages/**'
  - 'packages/api/**' # Added automatically
```

### Package Dependencies

```json
{
  "dependencies": {
    "@myorg/public-api-client": "workspace:*",
    "@myorg/admin-api-client": "workspace:*"
  }
}
```

### Install Generated Packages

```bash
# In monorepo root
pnpm install

# Use in your apps
import API from '@myorg/public-api-client';
```

## 🔄 Archive Management

### Automatic Versioning

```bash
# Generated archive structure
openapi/archive/
├── files/
│   ├── 2024-01-15_14-30-00/
│   │   ├── public.zip
│   │   └── admin.zip
│   └── 2024-01-15_15-45-00/
│       ├── public.zip
│       └── admin.zip
└── latest/
    ├── public.zip
    └── admin.zip
```

### Archive Commands

```bash
# Generate without archiving
python manage.py revolution --no-archive

# Clean old archives
python manage.py revolution --clean

# Download specific archive
curl -O https://api.example.com/openapi/archive/latest/public.zip
```

## 🧪 Advanced Usage

### Custom Templates

```python
# settings.py
REVOLUTION_CONFIG = {
    'generators': {
        'typescript': {
            'custom_templates': './templates/typescript'
        },
        'python': {
            'custom_templates': './templates/python'
        }
    }
}
```

### Programmatic Usage

```python
from django_revolution import OpenAPIGenerator, get_settings

# Get configuration
config = get_settings()

# Create generator
generator = OpenAPIGenerator(config)

# Generate specific zones
summary = generator.generate_all(zones=['public', 'admin'])

# Check results
print(f"Generated {summary.total_files} files")
print(f"Zones: {summary.zones}")
```

### Environment Variables

```bash
# Debug mode
export DJANGO_REVOLUTION_DEBUG=true

# Custom output directory
export DJANGO_REVOLUTION_OUTPUT_DIR=./custom/api

# Skip auto-installation
export DJANGO_REVOLUTION_NO_AUTO_INSTALL=1
```

## 🔐 Authentication

### TypeScript Client Auth

```typescript
import API from '@myorg/api-client';

const api = new API('https://api.example.com');

// Bearer token
api.setToken('your-access-token', 'your-refresh-token');

// API key
api.setApiKey('your-api-key');

// Custom headers
api.setHeaders({
  'X-Custom-Header': 'value',
  Authorization: 'Bearer token',
});

// Check auth status
if (api.isAuthenticated()) {
  // User is logged in
}
```

### Python Client Auth

```python
from openapi.clients.python.public import PublicAPI

api = PublicAPI(base_url="https://api.example.com")

# Bearer token
api.set_token("your-token-here")

# API key
api.set_api_key("your-api-key")

# Custom headers
api.set_headers({
    "X-Custom-Header": "value",
    "Authorization": "Bearer token"
})
```

## 🚨 Troubleshooting

### Common Issues

#### Import Errors

```bash
# Check if clients were generated
ls -la monorepo/packages/api/typescript/public/

# Regenerate if missing
python manage.py revolution --force
```

#### Authentication Issues

```typescript
// Check token format
api.setToken('Bearer your-token'); // Wrong
api.setToken('your-token'); // Correct

// Check API URL
api.setApiUrl('https://api.example.com'); // Make sure URL is correct
```

#### Zone Configuration Errors

```bash
# Validate configuration
python manage.py revolution --validate

# Check if apps exist
python manage.py check
```

### Getting Help

```bash
# Show status
python manage.py revolution --status

# Verbose output
python manage.py revolution --verbosity=3

# Dry run
python manage.py revolution --dry-run
```

%%END%%
