%%README.LLM id=django-revolution-installation%%

# Installation Guide

**Get Django Revolution running in 2 minutes.**

## 🎯 Purpose

Simple installation steps. No complex configuration. Auto-installs everything.

## ✅ Rules

- Python 3.8+ required
- Django 4.0+ required
- Auto-installs npm dependencies (HeyAPI, openapi-python-client)
- Works with existing Django projects

## 🚀 Quick Install

Just run:

```bash
pip install django-revolution
# or
poetry add django-revolution
```

### Add to Django

```python
# settings.py
INSTALLED_APPS = [
    'django_revolution',
    # your existing apps
]
```

### Test Installation

```bash
python manage.py revolution --status
```

**Done!** Django Revolution auto-installs dependencies when first used.

## 🔧 Verify Installation

### Check Version & Status

```bash
python manage.py revolution --status
```

### List Available Commands

```bash
python manage.py revolution --help
```

### Install Dependencies

```bash
python manage.py revolution --install-deps
```

### List Zones

```bash
python manage.py revolution --list-zones
```

## 📦 Auto-Installed Dependencies

**Automatically installed when needed:**

- `@hey-api/openapi-ts` - TypeScript client generation
- `openapi-python-client` - Python client generation
- `drf-spectacular` - OpenAPI schema generation (via pip)

**Pre-installed with package:**

- `Django>=3.2` - Web framework
- `djangorestframework>=3.12.0` - API framework
- `Jinja2>=3.0.0` - Template engine
- `PyYAML>=6.0` - YAML processing

## 🛠️ Advanced Installation

### From Source

```bash
git clone https://github.com/django-revolution/django-revolution.git
cd django-revolution
pip install -e .
```

### With Poetry

```bash
poetry add django-revolution
```

### With Requirements File

```bash
# requirements.txt
django-revolution>=1.0.3

pip install -r requirements.txt
```

## 🚨 Troubleshooting

### Node.js Not Found

Django Revolution auto-installs npm packages but requires Node.js:

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS with Homebrew
brew install node

# Windows with Chocolatey
choco install nodejs
```

### Permission Errors

```bash
# Fix npm permissions (Linux/macOS)
sudo chown -R $(whoami) ~/.npm
```

### Import Errors

```bash
# Check installation
python -c "import django_revolution; print('✅ Django Revolution installed')"

# Reinstall if needed
pip uninstall django-revolution
pip install django-revolution
```

### Generation Fails

```bash
# Check detailed status
python manage.py revolution --status

# Install dependencies manually
python manage.py revolution --install-deps

# Clean and retry
python manage.py revolution --clean
python manage.py revolution
```

## ⚙️ Configuration

### Optional Django Settings

```python
# settings.py (optional customization)
REVOLUTION_CONFIG = {
    'output_dir': 'openapi',           # Default: 'openapi'
    'auto_install_deps': True,         # Default: True
    'typescript_enabled': True,        # Default: True
    'python_enabled': True,            # Default: True
    'archive_clients': True,           # Default: True
}
```

### Environment Variables

```bash
# Skip auto-installation of dependencies
export DJANGO_REVOLUTION_NO_AUTO_INSTALL=1

# Custom output directory
export DJANGO_REVOLUTION_OUTPUT_DIR=/custom/path
```

## 📋 System Requirements

### Minimum Requirements

- Python 3.8+
- Django 3.2+
- 100MB free disk space
- Internet connection (for dependency installation)

### Recommended

- Python 3.11+
- Django 4.2+
- Node.js 18+ (for TypeScript generation)
- 500MB free disk space

### Supported Platforms

- ✅ Linux (Ubuntu, CentOS, Alpine)
- ✅ macOS (Intel & Apple Silicon)
- ✅ Windows 10/11
- ✅ Docker containers

%%END%%
