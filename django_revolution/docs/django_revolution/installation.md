# Installation Guide

## Prerequisites

Before installing Django Revolution, make sure you have:

- **Python 3.8+**
- **Django 4.0+**
- **Django REST Framework 3.14+**
- **drf-spectacular** (for OpenAPI schema generation)

## Quick Installation

### 1. Install Django Revolution

```bash
pip install django-revolution
```

### 2. Add to Django Settings

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'rest_framework',
    'drf_spectacular',
    'django_revolution',  # Add this line
]
```

### 3. Configure Django Revolution

```python
# settings.py
from django_revolution.app_config import ZoneConfig, get_revolution_config
from pathlib import Path

# Define your API zones
zones = {
    'public': ZoneConfig(
        apps=['accounts', 'billing', 'payments', 'support', 'public'],
        title='Public API',
        description='API for public client applications',
        public=True,
        auth_required=False,
        version='v1',
        path_prefix='public'
    ),
    'admin': ZoneConfig(
        apps=['admin_panel', 'analytics', 'services'],
        title='Admin API',
        description='Administrative API endpoints',
        public=False,
        auth_required=True,
        version='v1',
        path_prefix='admin'
    )
}

# Get Django Revolution configuration
REVOLUTION_CONFIG = get_revolution_config(
    project_root=Path.cwd(),
    zones=zones,
    debug=DEBUG
)
```

### 4. Add URLs

```python
# urls.py
from django.contrib import admin
from django.urls import path, include
from django_revolution import add_revolution_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    # Your other URLs...
]

# Add Django Revolution URLs
urlpatterns = add_revolution_urls(urlpatterns)
```

### 5. Generate Clients

```bash
# Generate all clients
python manage.py revolution

# Generate specific zones
python manage.py revolution --zones public admin

# TypeScript only
python manage.py revolution --typescript
```

## Advanced Installation

### Using Poetry

```bash
# Add to pyproject.toml
poetry add django-revolution

# Or add to dependencies
poetry add --group dev django-revolution
```

### Using Pipenv

```bash
pipenv install django-revolution
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/markolofsen/django-revolution.git
cd django-revolution

# Install in development mode
pip install -e ".[dev]"

# Run tests
pytest
```

## Configuration Options

### Environment Variables

```bash
# Debug mode
export DJANGO_REVOLUTION_DEBUG=true

# API prefix
export DJANGO_REVOLUTION_API_PREFIX=apix

# Auto-install dependencies
export DJANGO_REVOLUTION_AUTO_INSTALL_DEPS=true
```

### Manual Configuration

```python
# settings.py
REVOLUTION_CONFIG = {
    'debug': True,
    'api_prefix': 'apix',
    'auto_install_deps': True,
    'zones': {
        'zone_name': {
            'apps': ['app1', 'app2'],           # Required
            'title': 'Human Readable Title',    # Optional
            'description': 'Zone description',  # Optional
            'public': True,                     # Optional
            'auth_required': False,             # Optional
            'rate_limit': '1000/hour',          # Optional
            'permissions': ['perm1', 'perm2'],  # Optional
            'version': 'v1',                    # Optional
            'prefix': 'custom_prefix',          # Optional
            'cors_enabled': False,              # Optional
        }
    },
    'generators': {
        'typescript': {
            'output_dir': 'monorepo/packages/api/typescript',
            'package_name': '@myorg/api-client',
            'custom_templates': './templates/typescript'
        },
        'python': {
            'output_dir': 'monorepo/packages/api/python',
            'package_name': 'myorg-api-client',
            'custom_templates': './templates/python'
        }
    }
}
```

## Monorepo Setup

### 1. Initialize Monorepo

```bash
# Create monorepo structure
mkdir my-monorepo
cd my-monorepo

# Initialize pnpm workspace
pnpm init
```

### 2. Configure Workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'backend/*'
```

### 3. Generate Clients

```bash
# From backend directory
cd backend
python manage.py revolution

# This will create:
# - packages/api/typescript/
# - packages/api/python/
```

### 4. Install Generated Packages

```bash
# In monorepo root
pnpm install

# The generated packages will be available as workspace dependencies
```

## Troubleshooting

### Common Issues

#### 1. Import Error: No module named 'django_revolution'

```bash
# Make sure Django Revolution is installed
pip install django-revolution

# Check if it's in INSTALLED_APPS
python manage.py check
```

#### 2. drf-spectacular not found

```bash
# Install drf-spectacular
pip install drf-spectacular

# Add to INSTALLED_APPS
INSTALLED_APPS = [
    'drf_spectacular',
    'django_revolution',
]
```

#### 3. Zone configuration error

```python
# Make sure all apps in zones exist
INSTALLED_APPS = [
    'accounts',
    'billing',
    'payments',
    # ... all apps referenced in zones
]
```

#### 4. Permission denied on output directory

```bash
# Check directory permissions
ls -la monorepo/packages/api/

# Create directory if it doesn't exist
mkdir -p monorepo/packages/api/typescript
mkdir -p monorepo/packages/api/python
```

### Getting Help

- **Documentation**: [https://django-revolution.readthedocs.io/](https://django-revolution.readthedocs.io/)
- **Issues**: [https://github.com/markolofsen/django-revolution/issues](https://github.com/markolofsen/django-revolution/issues)
- **Discussions**: [https://github.com/markolofsen/django-revolution/discussions](https://github.com/markolofsen/django-revolution/discussions)

## Next Steps

After installation, check out:

- [CLI Reference](cli.md) - All available commands
- Configuration Guide - Detailed configuration options (coming soon)
- Zone Management - How to organize your API into zones (coming soon)
- TypeScript Integration - Using generated TypeScript clients (coming soon)
- Python Integration - Using generated Python clients (coming soon)
