# Django Revolution Documentation

> **Zero-config TypeScript & Python client generator for Django REST Framework** 🚀

## 📚 Table of Contents

```{toctree}
:maxdepth: 2
:caption: Getting Started

installation
cli

```

## 🎯 Quick Start

### Installation

```bash
pip install django-revolution
```

### Basic Setup

```python
# settings.py
INSTALLED_APPS = [
    'drf_spectacular',
    'django_revolution',  # Add this line
]
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

## 🧬 What Does It Generate?

| Language       | Location                            | Structure                                                 |
| -------------- | ----------------------------------- | --------------------------------------------------------- |
| **TypeScript** | `monorepo/packages/api/typescript/` | `public/`, `admin/` → `index.ts`, `types.ts`, `services/` |
| **Python**     | `monorepo/packages/api/python/`     | `public/`, `admin/` → `client.py`, `models/`, `setup.py`  |

## ⚡ TypeScript Client Usage

```typescript
import API from '@myorg/api-client';

const api = new API('https://api.example.com');
api.setToken('your-access-token');

const profile = await api.public.getProfile();
const items = await api.public.listItems();
```

## 🌐 Auto-Generated URLs

Django Revolution automatically generates all necessary URLs:

```python
# urls.py
from django_revolution import add_revolution_urls

urlpatterns = [
    # Your existing URLs
    path('admin/', admin.site.urls),
]

# Django Revolution automatically adds:
# - /api/public/schema/ (Swagger UI)
# - /api/public/schema.yaml (OpenAPI spec)
# - /api/admin/schema/ (Swagger UI)
# - /api/admin/schema.yaml (OpenAPI spec)
# - /openapi/archive/ (Generated clients)
urlpatterns = add_revolution_urls(urlpatterns)
```

## 🎯 Ready-to-Use Pydantic Configs

### DRF + Spectacular Config

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

## 🧪 CLI Toolbox

### Django Management Commands

```bash
# Generate all clients
python manage.py revolution

# Specific zones
python manage.py revolution --zones public admin

# Generator options
python manage.py revolution --typescript
python manage.py revolution --python
python manage.py revolution --no-archive

# Utility commands
python manage.py revolution --status
python manage.py revolution --list-zones
python manage.py revolution --validate
python manage.py revolution --clean
```

### Standalone CLI (Interactive)

```bash
# Interactive CLI with rich interface
django-revolution

# Or run directly
python -m django_revolution.cli
```

## 🪆 Monorepo-Friendly

Django Revolution automatically configures your monorepo:

```yaml
# pnpm-workspace.yaml (auto-generated)
packages:
  - 'packages/**'
  - 'packages/api/**' # Added automatically
```

**Package.json dependencies:**

```json
{
  "dependencies": {
    "@unrealos/public-api-client": "workspace:*",
    "@unrealos/admin-api-client": "workspace:*"
  }
}
```

## 📊 Comparison Table

| Feature                           | Django Revolution  | drf-spectacular + generators | openapi-generator-cli | Fern.dev | Manual Setup |
| --------------------------------- | ------------------ | ---------------------------- | --------------------- | -------- | ------------ |
| **Zone-based architecture**       | ✅ **UNIQUE**      | ❌                           | ❌                    | ✅       | ❌           |
| **Automatic URL generation**      | ✅ **UNIQUE**      | ❌                           | ❌                    | ❌       | ❌           |
| **Monorepo integration**          | ✅ **UNIQUE**      | ❌                           | ❌                    | ✅       | ❌           |
| **Django management commands**    | ✅ **UNIQUE**      | ❌                           | ❌                    | ❌       | ❌           |
| **Archive management**            | ✅ **UNIQUE**      | ❌                           | ❌                    | ❌       | ❌           |
| **TypeScript + Python clients**   | ✅                 | ✅                           | ✅                    | ✅       | ✅           |
| **DRF native integration**        | ✅ **SEAMLESS**    | ✅                           | ⚠️ (via schema)       | ❌       | ✅           |
| **Ready-to-use Pydantic configs** | ✅ **UNIQUE**      | ❌                           | ❌                    | ❌       | ❌           |
| **Zero configuration**            | ✅ **UNIQUE**      | ❌                           | ❌                    | ❌       | ❌           |
| **Environment variables**         | ✅ **Pydantic**    | ❌                           | ❌                    | ❌       | ❌           |
| **CLI interface**                 | ✅ **Rich output** | ❌                           | ✅                    | ✅       | ❌           |

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

**Q: How do I use the ready-to-use Pydantic configs?**  
Simply import and use: `from django_revolution.drf_config import create_drf_config` and `from django_revolution.app_config import ZoneConfig, get_revolution_config`.

**Q: Are the Pydantic configs type-safe?**  
Yes! Full Pydantic v2 validation with IDE autocomplete and error checking.

## 📞 Support

- **Documentation**: [https://django-revolution.readthedocs.io/](https://django-revolution.readthedocs.io/)
- **Issues**: [https://github.com/markolofsen/django-revolution/issues](https://github.com/markolofsen/django-revolution/issues)
- **Discussions**: [https://github.com/markolofsen/django-revolution/discussions](https://github.com/markolofsen/django-revolution/discussions)

## 📝 License

MIT License - see the LICENSE file for details.

---

**Made with ❤️ by the [Unrealos Team](https://unrealos.com)**

**Django Revolution** - The **ONLY** tool that makes Django API client generation **truly automated** and **zone-aware**.
