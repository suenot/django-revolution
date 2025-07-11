# CLI Reference

Django Revolution provides both Django management commands and a standalone CLI tool.

## Django Management Commands

### Basic Commands

#### `python manage.py revolution`

Generate all API clients for all configured zones.

```bash
# Generate everything
python manage.py revolution

# Verbose output
python manage.py revolution --verbosity=2

# Dry run (show what would be generated)
python manage.py revolution --dry-run
```

#### `python manage.py revolution --zones <zone1> <zone2>`

Generate clients for specific zones only.

```bash
# Generate only public zone
python manage.py revolution --zones public

# Generate multiple zones
python manage.py revolution --zones public admin

# Generate all zones except admin
python manage.py revolution --zones public internal
```

#### `python manage.py revolution --typescript`

Generate only TypeScript clients.

```bash
# TypeScript only
python manage.py revolution --typescript

# TypeScript for specific zones
python manage.py revolution --typescript --zones public
```

#### `python manage.py revolution --python`

Generate only Python clients.

```bash
# Python only
python manage.py revolution --python

# Python for specific zones
python manage.py revolution --python --zones admin
```

### Utility Commands

#### `python manage.py revolution --status`

Show the current status of generated clients.

```bash
python manage.py revolution --status
```

**Output:**

```
Django Revolution Status
=======================

Zones:
  ✓ public (TypeScript: 2024-01-15 10:30:15, Python: 2024-01-15 10:30:15)
  ✓ admin (TypeScript: 2024-01-15 10:30:15, Python: 2024-01-15 10:30:15)

Generated Files:
  - monorepo/packages/api/typescript/public/index.ts
  - monorepo/packages/api/typescript/admin/index.ts
  - monorepo/packages/api/python/public/client.py
  - monorepo/packages/api/python/admin/client.py

Archive:
  - openapi/archive/2024-01-15_10-30-15/
```

#### `python manage.py revolution --list-zones`

List all configured zones.

```bash
python manage.py revolution --list-zones
```

**Output:**

```
Configured Zones:
  - public: Public API (apps: accounts, billing, payments, support, public)
  - admin: Admin API (apps: admin_panel, analytics, services)
```

#### `python manage.py revolution --validate`

Validate the current configuration without generating anything.

```bash
python manage.py revolution --validate
```

**Output:**

```
✓ Configuration is valid
✓ All apps exist in INSTALLED_APPS
✓ All zones have required fields
✓ Output directories are writable
```

#### `python manage.py revolution --clean`

Remove all generated files and archives.

```bash
# Clean everything
python manage.py revolution --clean

# Clean specific zones
python manage.py revolution --clean --zones public

# Clean specific generators
python manage.py revolution --clean --typescript
```

#### `python manage.py revolution --no-archive`

Generate clients without creating archive copies.

```bash
python manage.py revolution --no-archive
```

### Advanced Options

#### `python manage.py revolution --force`

Force regeneration even if files are up to date.

```bash
python manage.py revolution --force
```

#### `python manage.py revolution --watch`

Watch for changes and regenerate automatically.

```bash
python manage.py revolution --watch
```

#### `python manage.py revolution --config <path>`

Use a custom configuration file.

```bash
python manage.py revolution --config ./custom_revolution_config.py
```

## Standalone CLI

### Interactive CLI

```bash
# Start interactive CLI
django-revolution

# Or run directly
python -m django_revolution.cli
```

**Interactive Interface:**

```
🤖 Django Revolution CLI
========================

What would you like to do?

1. Generate all clients
2. Generate specific zones
3. Show status
4. Validate configuration
5. Clean generated files
6. Interactive zone selection
7. Exit

Enter your choice (1-7):
```

### Non-Interactive Commands

#### `django-revolution generate`

```bash
# Generate all
django-revolution generate

# Generate specific zones
django-revolution generate --zones public admin

# TypeScript only
django-revolution generate --typescript

# Python only
django-revolution generate --python
```

#### `django-revolution status`

```bash
django-revolution status
```

#### `django-revolution validate`

```bash
django-revolution validate
```

#### `django-revolution clean`

```bash
django-revolution clean
```

#### `django-revolution zones`

```bash
django-revolution zones
```

## Command Line Options

### Global Options

| Option              | Description                  | Example                           |
| ------------------- | ---------------------------- | --------------------------------- |
| `--verbosity`, `-v` | Set verbosity level (0-3)    | `--verbosity=2`                   |
| `--dry-run`         | Show what would be generated | `--dry-run`                       |
| `--force`           | Force regeneration           | `--force`                         |
| `--config`          | Custom config file           | `--config ./config.py`            |
| `--project-root`    | Django project root          | `--project-root /path/to/project` |

### Generator Options

| Option         | Description              | Example                |
| -------------- | ------------------------ | ---------------------- |
| `--typescript` | Generate TypeScript only | `--typescript`         |
| `--python`     | Generate Python only     | `--python`             |
| `--zones`      | Specific zones           | `--zones public admin` |
| `--no-archive` | Skip archive creation    | `--no-archive`         |
| `--watch`      | Watch for changes        | `--watch`              |

### Output Options

| Option           | Description             | Example                     |
| ---------------- | ----------------------- | --------------------------- |
| `--output-dir`   | Custom output directory | `--output-dir ./custom/api` |
| `--package-name` | Custom package name     | `--package-name @myorg/api` |
| `--templates`    | Custom templates        | `--templates ./templates`   |

## Examples

### Development Workflow

```bash
# 1. Check status
python manage.py revolution --status

# 2. Validate configuration
python manage.py revolution --validate

# 3. Generate clients
python manage.py revolution --zones public

# 4. Check generated files
ls -la monorepo/packages/api/typescript/public/
```

### CI/CD Pipeline

```bash
# In your CI script
python manage.py revolution --validate
python manage.py revolution --typescript --zones public admin
python manage.py revolution --python --zones public admin
```

### Debugging

```bash
# Verbose output
python manage.py revolution --verbosity=3

# Dry run to see what would happen
python manage.py revolution --dry-run

# Force regeneration
python manage.py revolution --force
```

### Custom Configuration

```bash
# Use custom config
python manage.py revolution --config ./custom_config.py

# Override project root
python manage.py revolution --project-root /path/to/django/project
```

## Exit Codes

| Code | Meaning             |
| ---- | ------------------- |
| 0    | Success             |
| 1    | General error       |
| 2    | Configuration error |
| 3    | Validation error    |
| 4    | Generation error    |
| 5    | Permission error    |

## Environment Variables

You can also control behavior via environment variables:

```bash
# Debug mode
export DJANGO_REVOLUTION_DEBUG=true

# Custom output directory
export DJANGO_REVOLUTION_OUTPUT_DIR=./custom/api

# Verbosity level
export DJANGO_REVOLUTION_VERBOSITY=2

# Force regeneration
export DJANGO_REVOLUTION_FORCE=true
```

## Troubleshooting

### Common Issues

#### Command not found

```bash
# Make sure Django Revolution is installed
pip install django-revolution

# Check if it's in INSTALLED_APPS
python manage.py check
```

#### Permission denied

```bash
# Check directory permissions
ls -la monorepo/packages/api/

# Create directories if needed
mkdir -p monorepo/packages/api/typescript
mkdir -p monorepo/packages/api/python
```

#### Configuration errors

```bash
# Validate configuration
python manage.py revolution --validate

# Check Django settings
python manage.py check
```

### Getting Help

```bash
# Show help
python manage.py revolution --help

# Show help for specific command
python manage.py revolution generate --help
```
