%%README.LLM id=django-revolution-docs%%

# Django Revolution Documentation

**Zone-based API client generator for Django projects**

## 📚 Table of Contents

```{toctree}
:maxdepth: 2
:caption: Getting Started

INSTALLATION.md
USAGE.md
CLI.md
```

```{toctree}
:maxdepth: 2
:caption: Technical Reference

API_REFERENCE.md
ARCHITECTURE.md
```

```{toctree}
:maxdepth: 2
:caption: Deployment & Maintenance

DEPLOYMENT.md
TROUBLESHOOTING.md
```

## Docs Meta

- [Documentation Summary](DOCUMENTATION_SUMMARY.md)
- [Local Docs Guide](README.md)

## 🎯 Purpose

Complete documentation for Django Revolution - the fastest way to generate TypeScript and Python clients from Django REST Framework with zone-based architecture.

## ✅ Rules

- Zero configuration required
- Auto-installs dependencies
- Zone-based API organization
- Monorepo integration support
- Ready-to-use Pydantic configs

## 🚀 Quick Start

### Installation

Just run:

```bash
pip install django-revolution
# or
poetry add django-revolution
```

### Basic Setup

```python
# settings.py
INSTALLED_APPS = [
    'drf_spectacular',
    'django_revolution',
]

# Ready-to-use configuration
from django_revolution.app_config import ZoneConfig, get_revolution_config

zones = {
    'public': ZoneConfig(
        apps=['accounts', 'billing', 'payments'],
        title='Public API',
        public=True,
        auth_required=False,
    ),
    'admin': ZoneConfig(
        apps=['admin_panel', 'analytics'],
        title='Admin API',
        public=False,
        auth_required=True,
    )
}

REVOLUTION_CONFIG = get_revolution_config(project_root=Path.cwd(), zones=zones)
```

### Generate Clients

```bash
# Generate everything
python manage.py revolution

# Generate specific zones
python manage.py revolution --zones public admin

# TypeScript only
python manage.py revolution --typescript
```

### Use Generated Clients

```typescript
// TypeScript
import API from '@myorg/api-client';

const api = new API('https://api.example.com');
api.setToken('your-access-token');

const profile = await api.public.getCurrentUser();
const products = await api.public.listProducts();
```

```python
# Python
from openapi.clients.python.public import PublicAPI

api = PublicAPI(base_url="https://api.example.com")
api.set_token("your-token-here")

profile = api.accounts.get_current_user()
products = api.products.list()
```

## 📚 Documentation Sections

### Getting Started

- [Installation Guide](INSTALLATION.md) - Complete setup instructions
- [Usage Guide](USAGE.md) - How to use Django Revolution
- [CLI Reference](CLI.md) - All available commands

### Technical Reference

- [API Reference](API_REFERENCE.md) - Complete API documentation
- [Architecture](ARCHITECTURE.md) - How Django Revolution works

### Deployment & Maintenance

- [Deployment Guide](DEPLOYMENT.md) - Hosting on ReadTheDocs
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues and solutions

### Docs Meta

- [Documentation Summary](DOCUMENTATION_SUMMARY.md) - Overview of all docs
- [Local Docs Guide](README.md) - How to build docs locally

## 🎯 Key Features

### Zone-Based Architecture

- **Organize APIs** into logical zones (public, admin, internal)
- **Automatic URL generation** for each zone
- **Type-safe configuration** with Pydantic models

### Multi-Language Generation

- **TypeScript clients** with full type safety
- **Python clients** for backend integration
- **OpenAPI schemas** automatically generated

### Ready-to-Use Configs

- **DRF + Spectacular config** - One function call setup
- **Zone configuration** - Typed Pydantic models
- **Environment variables** - Pydantic-based validation

### Monorepo Integration

- **Automatic workspace setup** for pnpm/yarn
- **Package generation** with proper dependencies
- **Archive management** with versioning

## 🧪 What Gets Generated

| Language       | Location                            | Structure                                                 |
| -------------- | ----------------------------------- | --------------------------------------------------------- |
| **TypeScript** | `monorepo/packages/api/typescript/` | `public/`, `admin/` → `index.ts`, `types.ts`, `services/` |
| **Python**     | `monorepo/packages/api/python/`     | `public/`, `admin/` → `client.py`, `models/`, `setup.py`  |

## 🌐 Auto-Generated URLs

Django Revolution automatically creates:

```python
# urls.py
from django_revolution import add_revolution_urls

urlpatterns = [
    path('admin/', admin.site.urls),
]

# Automatically adds:
# - /api/public/schema/ (Swagger UI)
# - /api/public/schema.yaml (OpenAPI spec)
# - /api/admin/schema/ (Swagger UI)
# - /api/admin/schema.yaml (OpenAPI spec)
urlpatterns = add_revolution_urls(urlpatterns)
```

## 🚀 Ready-to-Use Pydantic Configs

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

### Zone Configuration

```python
from django_revolution.app_config import ZoneConfig, get_revolution_config

# Typed zone definitions
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

# One function - full configuration!
config = get_revolution_config(project_root=Path.cwd(), zones=zones)
```

## 📊 Comparison

| Feature                           | Django Revolution | drf-spectacular + generators | openapi-generator-cli | Fern.dev |
| --------------------------------- | ----------------- | ---------------------------- | --------------------- | -------- |
| **Zone-based architecture**       | ✅ **UNIQUE**     | ❌                           | ❌                    | ✅       |
| **Automatic URL generation**      | ✅ **UNIQUE**     | ❌                           | ❌                    | ❌       |
| **Monorepo integration**          | ✅ **UNIQUE**     | ❌                           | ❌                    | ✅       |
| **Ready-to-use Pydantic configs** | ✅ **UNIQUE**     | ❌                           | ❌                    | ❌       |
| **Zero configuration**            | ✅ **UNIQUE**     | ❌                           | ❌                    | ❌       |
| **TypeScript + Python clients**   | ✅                | ✅                           | ✅                    | ✅       |

## 🙋 FAQ

**Q: Is this production-ready?**  
✅ Yes. Used in monorepos and multi-tenant production apps.

**Q: What if I use DRF with custom auth?**  
Use `setHeaders()` or `setApiKey()` to inject custom logic.

**Q: Can I use this in non-monorepo setups?**  
Absolutely. Monorepo is optional.

**Q: What if I need only TypeScript clients?**  
Use `--typescript` flag to generate only TS clients.

**Q: Does it support custom OpenAPI decorators?**  
Yes, built on `drf-spectacular` so all extensions apply.

## 📞 Support

- **Documentation**: [https://django-revolution.readthedocs.io/](https://django-revolution.readthedocs.io/)
- **Issues**: [https://github.com/markolofsen/django-revolution/issues](https://github.com/markolofsen/django-revolution/issues)
- **Discussions**: [https://github.com/markolofsen/django-revolution/discussions](https://github.com/markolofsen/django-revolution/discussions)

## 📝 License

MIT License - see the LICENSE file for details.

---

**Made with ❤️ by the [Unrealos Team](https://unrealos.com)**

%%END%%
