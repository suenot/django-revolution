---
layout: default
title: CLI Reference
---

# 🎯 CLI Reference - LLM-Optimized

## 📖 Overview

Command-line interface for Django Revolution with multiple modes, interactive features, and comprehensive development tools.

**Key Features:**
- **Multiple CLI interfaces** - Django management commands, standalone CLI, development scripts
- **Interactive mode** - Beautiful terminal interface with questionary
- **Command line mode** - Direct command execution
- **Development tools** - Comprehensive CLI toolbox for development

---

## 📦 CLI Modules

### django_revolution.cli
**Purpose**: Main CLI entry point with multiple modes.
**Dependencies**: `questionary`, `rich`, `click`
**Exports**: `main` (CLI entry point), interactive/command line modes
**Used in**: Django management commands, standalone CLI

### scripts.dev_cli
**Purpose**: Interactive development interface.
**Dependencies**: `questionary`, `rich`, `django_revolution`
**Exports**: `main` (development CLI)
**Used in**: Development workflow, interactive commands

### scripts.version_manager
**Purpose**: Version management across package files.
**Dependencies**: `toml`, `pathlib`, `semver`
**Exports**: `VersionManager`, version bumping functions
**Used in**: Version control, requirements generation

### scripts.publisher
**Purpose**: Interactive package publishing.
**Dependencies**: `twine`, `build`, `questionary`
**Exports**: `main` (publishing interface)
**Used in**: PyPI publishing, package distribution

---

## 🧾 APIs (ReadMe.LLM Format)

%%README.LLM id=django-management-command%%

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

### --show-urls
**Shows URL patterns for each zone.**
```bash
python manage.py revolution --show-urls
```

%%END%%

%%README.LLM id=standalone-cli%%

## 🧭 Library Description
Standalone CLI with interactive and command-line modes.

## ✅ Rules
- Interactive mode is default
- Use command line mode for automation
- Rich output for better user experience
- Debug mode for troubleshooting

## 🧪 Functions

### django-revolution [options]
**Standalone CLI command.**
```bash
# Interactive mode (default)
django-revolution

# Command line mode
django-revolution --generate

# Specific zones
django-revolution --zones public admin

# Custom output directory
django-revolution --output-dir /custom/path
```

### --interactive
**Forces interactive mode.**
```bash
django-revolution --interactive
```

### --debug
**Enables debug logging.**
```bash
django-revolution --debug
```

%%END%%

%%README.LLM id=development-scripts%%

## 🧭 Library Description
Development scripts for version management, publishing, and requirements generation.

## ✅ Rules
- Run from project root directory
- Use interactive mode for user input
- Validate before publishing
- Generate requirements after version bump

## 🧪 Functions

### python scripts/dev_cli.py
**Interactive development interface.**
```bash
python scripts/dev_cli.py
```

### python scripts/version_manager.py [command]
**Version management commands.**
```bash
# Get current version
python scripts/version_manager.py get

# Bump version
python scripts/version_manager.py bump --bump-type patch

# Validate version consistency
python scripts/version_manager.py validate

# Regenerate requirements
python scripts/version_manager.py requirements
```

### python scripts/publisher.py
**Interactive publishing.**
```bash
python scripts/publisher.py
```

%%END%%

---

## 🔁 CLI Flows

### Interactive Generation Flow
1. **Zone Selection** - Checkbox-based zone selection
2. **Client Type Selection** - TypeScript/Python options
3. **Archive Options** - Archive creation settings
4. **Progress Tracking** - Real-time generation progress
5. **Results Summary** - Beautiful results table

**Modules**: `django_revolution.cli`, `questionary`, `rich`

### Command Line Generation Flow
1. **Parameter Parsing** - Parse command line arguments
2. **Zone Validation** - Validate selected zones
3. **Generation Execution** - Execute generation process
4. **Output Display** - Show results and statistics
5. **Error Handling** - Handle and display errors

**Modules**: `django_revolution.cli`, `click`

### Development Workflow Flow
1. **Interactive CLI** - `python scripts/dev_cli.py`
2. **Version Management** - Automated version bumping
3. **Requirements Generation** - Automatic requirements.txt creation
4. **Testing** - Zone validation and schema testing
5. **Publishing** - Interactive PyPI publishing

**Modules**: `scripts.dev_cli`, `scripts.version_manager`, `scripts.publisher`

---

## 🚀 Django Management Commands

### Generate Clients

```bash
# Interactive generation (default)
python manage.py revolution

# Generate specific zones
python manage.py revolution --zones public admin

# TypeScript only
python manage.py revolution --typescript

# Python only
python manage.py revolution --python

# Without archiving
python manage.py revolution --no-archive

# Without monorepo sync
python manage.py revolution --no-monorepo
```

### ⚡ Multithreading Options

```bash
# Use custom number of worker threads
python manage.py revolution --generate --max-workers 10

# Disable multithreading (sequential processing)
python manage.py revolution --generate --no-multithreading

# Interactive mode with multithreading options
python manage.py revolution --interactive
```

### 🔍 Validation & Testing Commands

```bash
# Validate all zones with detailed logging
python manage.py revolution --validate-zones

# Show URL patterns for each zone
python manage.py revolution --show-urls

# Test schema generation for each zone
python manage.py revolution --test-schemas

# Validate environment and configuration
python manage.py revolution --validate

# List all available zones
python manage.py revolution --list-zones
```

### 📊 Status & Information

```bash
# Show current status and configuration
python manage.py revolution --status

# Show program version
python manage.py revolution --version

# Enable debug logging
python manage.py revolution --debug

# Set verbosity level (0-3)
python manage.py revolution --verbosity 2
```

### 🛠️ Utility Commands

```bash
# Clean output directories
python manage.py revolution --clean

# Install required dependencies
python manage.py revolution --install-deps

# Override output directory
python manage.py revolution --output-dir /custom/path

# Skip system checks
python manage.py revolution --skip-checks
```

---

## 🎨 Standalone CLI

### Interactive Mode

```bash
# Launch interactive CLI
django-revolution

# Or run directly
python -m django_revolution.cli
```

The interactive CLI provides:
- 🎯 **Zone selection** - Checkbox-based zone selection
- 🔧 **Client type selection** - TypeScript/Python options
- 📦 **Archive options** - Archive creation settings
- 📊 **Progress tracking** - Real-time generation progress
- ✅ **Results summary** - Beautiful results table

### Command Line Mode

```bash
# Generate all clients
django-revolution --generate

# Generate specific zones
django-revolution --zones public admin

# TypeScript only
django-revolution --typescript

# With custom output directory
django-revolution --output-dir /custom/path
```

---

## 🔧 Development Scripts

### Interactive Development CLI

```bash
# Main development interface
python scripts/dev_cli.py

# Or install and use as package command
pip install -e .
dev-cli
```

### Individual Scripts

```bash
# Version management
python scripts/version_manager.py get
python scripts/version_manager.py bump --bump-type patch

# Generate requirements files
python scripts/generate_requirements.py

# Interactive publishing
python scripts/publisher.py

# Test generation
./scripts/test_generation.sh
```

### Package Commands (after installation)

```bash
# Version management
version-manager get
version-manager bump --bump-type minor

# Publishing
publisher

# Requirements generation
generate-requirements
```

---

## 📋 Command Reference

### Django Management Command Options

| Option | Description | Default |
|--------|-------------|---------|
| `--generate, -g` | Generate API clients | False |
| `--zones [ZONES ...], -z [ZONES ...]` | Specific zones to generate | All zones |
| `--typescript, -t` | Generate TypeScript clients only | False |
| `--python, -p` | Generate Python clients only | False |
| `--no-typescript` | Skip TypeScript client generation | False |
| `--no-python` | Skip Python client generation | False |
| `--no-archive` | Skip archiving generated clients | False |
| `--no-monorepo` | Skip monorepo sync | False |
| `--clean` | Clean output directories before generation | False |
| `--no-multithreading` | Disable multithreaded generation | False |
| `--max-workers MAX_WORKERS` | Maximum number of worker threads | 20 |
| `--status` | Show current status and configuration | False |
| `--list-zones` | List all available zones | False |
| `--validate` | Validate environment and configuration | False |
| `--show-urls` | Show URL patterns for each zone | False |
| `--validate-zones` | Validate each zone with detailed logging | False |
| `--test-schemas` | Test schema generation for each zone | False |
| `--install-deps` | Install required dependencies | False |
| `--output-dir OUTPUT_DIR` | Override output directory | Auto-detected |
| `--debug` | Enable debug logging | False |
| `--interactive, -i` | Run in interactive mode | False |
| `--version` | Show program's version number and exit | False |
| `-v {0,1,2,3}, --verbosity {0,1,2,3}` | Verbosity level | 1 |
| `--settings SETTINGS` | Django settings module | Auto-detected |
| `--pythonpath PYTHONPATH` | Python path | Auto-detected |
| `--traceback` | Display full stack trace on errors | False |
| `--no-color` | Don't colorize output | False |
| `--force-color` | Force colorization of output | False |
| `--skip-checks` | Skip system checks | False |

### Standalone CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--generate` | Generate API clients | False |
| `--zones [ZONES ...]` | Specific zones to generate | All zones |
| `--typescript` | Generate TypeScript clients only | False |
| `--python` | Generate Python clients only | False |
| `--output-dir OUTPUT_DIR` | Override output directory | Auto-detected |
| `--interactive` | Run in interactive mode | True |
| `--debug` | Enable debug logging | False |
| `--version` | Show version and exit | False |

---

## 🎯 Examples

### Basic Generation

```bash
# Generate all clients interactively
python manage.py revolution

# Generate specific zones
python manage.py revolution --zones public admin

# TypeScript only with custom workers
python manage.py revolution --typescript --max-workers 8
```

### Validation & Testing

```bash
# Validate all zones
python manage.py revolution --validate-zones

# Test schema generation
python manage.py revolution --test-schemas

# Show URL patterns
python manage.py revolution --show-urls
```

### Performance Optimization

```bash
# Use 16 worker threads for faster generation
python manage.py revolution --generate --max-workers 16

# Disable multithreading for debugging
python manage.py revolution --generate --no-multithreading

# Clean and regenerate
python manage.py revolution --clean --generate
```

### Development Workflow

```bash
# Interactive development
python scripts/dev_cli.py

# Version bump
python scripts/version_manager.py bump --bump-type minor

# Generate requirements
python scripts/generate_requirements.py

# Publish to PyPI
python scripts/publisher.py
```

---

## 🚨 Troubleshooting

### Common Issues

**Command not found:**
```bash
# Install in development mode
pip install -e .

# Or use Python module directly
python -m django_revolution.cli
```

**Django settings not found:**
```bash
# Set Django settings module
export DJANGO_SETTINGS_MODULE=myproject.settings

# Or use --settings option
python manage.py revolution --settings myproject.settings
```

**Permission errors:**
```bash
# Check file permissions
ls -la openapi/

# Fix permissions if needed
chmod -R 755 openapi/
```

### Debug Mode

```bash
# Enable debug logging
python manage.py revolution --debug

# Set verbosity to maximum
python manage.py revolution --verbosity 3

# Show full stack traces
python manage.py revolution --traceback
```

---

## 📊 Performance Tips

### Multithreading Optimization

- **Default workers**: 20 (good for most systems)
- **High-end systems**: 32-64 workers
- **Low-end systems**: 4-8 workers
- **Single zone**: Automatically uses sequential processing

### Memory Usage

- **Large projects**: Monitor memory usage with high worker counts
- **Batch processing**: Use `--clean` between generations
- **Archive management**: Regular cleanup of old archives

### Network Optimization

- **Monorepo sync**: Use `--no-monorepo` for local-only generation
- **Archive downloads**: Compressed archives for faster transfers
- **Caching**: Zone caching reduces repeated work

---

## 🧠 Key Notes

- **Multiple interfaces** - Django management commands, standalone CLI, development scripts
- **Interactive mode** - Beautiful terminal interface with questionary
- **Rich output** - Beautiful formatting with progress tracking
- **Development tools** - Comprehensive CLI toolbox for development
- **Performance optimization** - Configurable multithreading and memory management
- **Troubleshooting** - Comprehensive debugging and error handling

---

[← Back to Usage](usage.html) | [Next: API Reference →](api-reference.html)
