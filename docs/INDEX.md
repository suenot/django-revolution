---
layout: default
title: Django Revolution
---

# 🚀 Django Revolution - LLM-Optimized Documentation

## 📖 Overview

Django Revolution is a **zero-config TypeScript & Python client generator** for Django REST Framework that uses **dynamic zone-based architecture**. It automatically generates fully-authenticated clients from your Django API with no static files required.

**Key Innovations:**
- **Dynamic Zone Management** - Zones generated in-memory, no static files
- **Rich CLI Interface** - Interactive commands with beautiful output
- **Multithreaded Generation** - Parallel processing for performance
- **Monorepo Integration** - Optional monorepo support
- **Development Tools** - Comprehensive CLI toolbox

---

## 📦 Core Modules

### django_revolution.app_config
**Purpose**: Core configuration management with Pydantic models.
**Dependencies**: `pydantic`, `pydantic-settings`, `pathlib`
**Exports**: `ZoneConfig`, `MonorepoConfig`, `get_revolution_config`
**Used in**: Django settings, zone definition, CLI configuration

### django_revolution.zones
**Purpose**: Dynamic zone management and URL generation.
**Dependencies**: `django.urls`, `types.ModuleType`, `django_revolution.app_config`
**Exports**: `DynamicZoneManager`, `DynamicZoneDetector`, `validate_zone_configuration`
**Used in**: Zone URL patterns, app detection, dynamic module creation

### django_revolution.openapi.generator
**Purpose**: OpenAPI schema and client generation.
**Dependencies**: `@hey-api/openapi-ts`, `datamodel-code-generator`, `drf-spectacular`
**Exports**: `OpenAPIGenerator`, `ArchiveManager`, `GenerationResult`
**Used in**: Schema generation, TypeScript/Python clients, archive management

### django_revolution.cli
**Purpose**: Command-line interface with multiple modes.
**Dependencies**: `questionary`, `rich`, `click`
**Exports**: `main` (CLI entry point), interactive/command line modes
**Used in**: Django management commands, standalone CLI, development scripts

---

## 🧾 APIs (ReadMe.LLM Format)

%%README.LLM id=zone-config%%

## 🧭 Library Description
Type-safe zone configuration using Pydantic models. Defines API zones with apps, authentication, and metadata.

## ✅ Rules
- Always use Pydantic models for type safety
- Zone name comes from dictionary key, not path_prefix
- All zones must have apps list and version
- Public zones can have auth_required=False

## 🧪 Functions

### ZoneConfig(apps: List[str], title: str, description: str, public: bool, auth_required: bool, version: str)
**Creates a zone configuration.**
```python
zone = ZoneConfig(
    apps=['accounts', 'billing'],
    title='Public API',
    description='Public endpoints',
    public=True,
    auth_required=False,
    version='v1'
)
```

### get_revolution_config(project_root: Path, zones: Dict[str, ZoneConfig], debug: bool = False, monorepo: Optional[MonorepoConfig] = None)
**Creates Django Revolution configuration.**
```python
DJANGO_REVOLUTION = get_revolution_config(
    project_root=BASE_DIR,
    zones=zones,
    debug=DEBUG
)
```

%%END%%

%%README.LLM id=cli-commands%%

## 🧭 Library Description
Django management command for client generation with interactive and command-line modes.

## ✅ Rules
- Always validate zones before generation
- Use multithreading for multiple zones
- Clean output directories before generation
- Test schema generation regularly

## 🧪 Functions

### python manage.py revolution [options]
**Main CLI command with multiple modes.**
```bash
# Interactive generation
python manage.py revolution

# Specific zones
python manage.py revolution --zones public admin

# TypeScript only
python manage.py revolution --typescript

# With multithreading
python manage.py revolution --generate --max-workers 16
```

### --validate-zones
**Validates all zone configurations.**
```bash
python manage.py revolution --validate-zones
```

### --test-schemas
**Tests OpenAPI schema generation.**
```bash
python manage.py revolution --test-schemas
```

%%END%%

---

## 🔁 Core Flows

### Client Generation Workflow
1. **Zone Detection** - `DynamicZoneManager` detects apps in each zone
2. **URL Generation** - Creates dynamic URL modules in-memory
3. **Schema Generation** - `OpenAPIGenerator` creates OpenAPI schemas
4. **Client Generation** - Parallel generation of TypeScript and Python clients
5. **Archive Creation** - Packages clients into timestamped archives
6. **Monorepo Sync** - Optional sync to monorepo structure

**Modules**: `django_revolution.zones.DynamicZoneManager`, `django_revolution.openapi.generator.OpenAPIGenerator`, `django_revolution.cli`

### Zone Validation Flow
1. **Configuration Check** - Validates Pydantic models
2. **App Detection** - Verifies Django apps exist
3. **URL Pattern Validation** - Tests URL pattern generation
4. **Schema Test Generation** - Creates test schemas
5. **Error Reporting** - Detailed error messages with suggestions

**Modules**: `django_revolution.zones.DynamicZoneDetector`, `django_revolution.zones.validate_zone_configuration`

### Multithreaded Generation Flow
1. **Worker Pool Creation** - Configurable thread pool (default: 20)
2. **Zone Distribution** - Zones distributed across workers
3. **Parallel Processing** - Simultaneous schema and client generation
4. **Result Aggregation** - Results collected and combined
5. **Index Generation** - Final index files created after all clients ready

**Modules**: `django_revolution.openapi.generator` (with threading), `concurrent.futures.ThreadPoolExecutor`

---

## 🎯 Quick Start Configuration

### Basic Zone Configuration
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
        version='v1'
    ),
    'admin': ZoneConfig(
        apps=['admin_panel', 'services'],
        title='Admin API',
        description='Administrative API endpoints',
        public=False,
        auth_required=True,
        version='v1'
    )
}

DJANGO_REVOLUTION = get_revolution_config(
    project_root=BASE_DIR,
    zones=zones
)
```

### URL Integration
```python
# urls.py
from django_revolution.urls_integration import add_revolution_urls

urlpatterns = [
    # ... your URLs
]

add_revolution_urls(urlpatterns)
```

### Generate Clients
```bash
# Interactive generation (recommended)
python manage.py revolution

# Direct generation
python manage.py revolution --zones public,admin --typescript --python

# This creates:
# - openapi/schemas/{zone}.yaml
# - clients/typescript/
# - clients/python/
# - openapi/archive/
```

---

## 🚨 Quick Troubleshooting

### Common Issues
**Zone Validation Failures**:
```bash
python manage.py revolution --validate-zones
python manage.py revolution --show-urls
```

**Schema Generation Errors**:
```bash
python manage.py revolution --test-schemas
pip install drf-spectacular
```

**Performance Issues**:
```bash
python manage.py revolution --generate --max-workers 16
python manage.py revolution --clean --generate
```

### Debug Mode
```bash
export DJANGO_REVOLUTION_DEBUG=1
python manage.py revolution --debug
python manage.py revolution --verbosity 3
```

---

## 📊 Performance Characteristics

### Memory Usage
- **Dynamic Zone Generation**: ~5-10MB per zone
- **Module Registry**: ~1-2MB total
- **Zone Cache**: ~2-5MB total

### Generation Speed
- **Zone Detection**: ~100-500ms per zone
- **Schema Generation**: ~1-3s per zone
- **Client Generation**: ~2-5s per client type

### Scalability
- **Zones**: Unlimited (limited by Django app count)
- **Apps per Zone**: 1-50 recommended
- **Endpoints per Zone**: 1-1000 recommended

---

## 🧠 Key Notes

- **Dynamic Architecture**: No static zone files required, everything generated in-memory
- **Type Safety**: Pydantic models ensure configuration correctness
- **Performance**: Multithreading provides 2-3x speedup for multiple zones
- **Development Tools**: Comprehensive CLI toolbox for development workflow
- **Monorepo Support**: Optional integration for monorepo projects
- **Zero Config**: Works out of the box with sensible defaults

---

## 📚 Documentation Structure

- **[Installation](installation/)** - How to install and configure Django Revolution
- **[Usage](usage/)** - How to use zones and generate clients
- **[CLI Reference](cli/)** - Command-line interface documentation
- **[API Reference](api-reference/)** - Detailed API documentation
- **[Architecture](architecture/)** - Understanding zone-based architecture
- **[Troubleshooting](troubleshooting/)** - Common issues and solutions

## 🧪 Examples

Check out our [sample project](https://github.com/markolofsen/django-revolution/tree/main/django_sample) for a complete working example.

## 🎯 Ready-to-Use Clients

```typescript
import API from '@myorg/api-client';

const api = new API('https://api.example.com');
api.setToken('your-access-token');

const profile = await api.public.getProfile();
const items = await api.public.listItems();
```

> 🔐 Auth, ⚙️ Headers, 🔄 Refresh – handled automatically.

## Support

- 🐛 [Issues](https://github.com/markolofsen/django-revolution/issues)
- 💬 [Discussions](https://github.com/markolofsen/django-revolution/discussions)

---

Made with ❤️ by [Unrealos](https://unrealos.com)
