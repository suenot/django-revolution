%%README.LLM id=django-revolution-docs-readme%%

# Django Revolution Documentation

**Local documentation development guide.**

## 🎯 Purpose

Build and serve Django Revolution documentation locally for development.

## ✅ Rules

- Use `make` commands for all operations
- Install dependencies first: `make install-deps`
- Build HTML: `make html`
- Serve locally: `make serve`
- Clean builds: `make clean`

## 🚀 Quick Start

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Build Documentation

```bash
# Build HTML documentation
make html

# Or use sphinx-build directly
sphinx-build -b html . _build/html
```

### View Documentation

```bash
# Serve locally
make serve

# Or open in browser
open _build/html/index.html
```

## 🛠️ Development

### Watch Mode

```bash
# Auto-rebuild on changes
make watch
```

### Clean Build

```bash
# Remove all build artifacts
make clean

# Rebuild from scratch
make clean && make html
```

### Quality Checks

```bash
# Check all links
make linkcheck

# Check spelling
make spelling

# Run all quality checks
make qa
```

### Full Build

```bash
# Complete build with all checks
make all
```

## 📁 Structure

```
docs/
├── conf.py              # Sphinx configuration
├── index.md             # Main documentation page
├── INSTALLATION.md      # Installation guide
├── USAGE.md             # Usage guide
├── CLI.md               # CLI reference
├── API_REFERENCE.md     # API documentation
├── ARCHITECTURE.md      # Architecture guide
├── DEPLOYMENT.md        # Deployment guide
├── TROUBLESHOOTING.md   # Troubleshooting guide
├── requirements.txt     # Documentation dependencies
├── Makefile             # Build commands
└── README.md            # This file
```

## 🌐 ReadTheDocs Integration

### Automatic Builds

Documentation builds automatically on:

- Push to `main` branch
- New tag creation
- Pull request creation

### Configuration

`.readthedocs.yml` in project root:

```yaml
version: 2
build:
  os: ubuntu-22.04
  tools:
    python: '3.11'
python:
  install:
    - method: pip
      path: .
      extra_requirements:
        - docs
sphinx:
  configuration: docs/conf.py
  fail_on_warning: true
```

## 🛠️ Contributing

### Adding New Pages

1. Create new `.md` file in `docs/` directory (use UPPERCASE for key docs)
2. Add to navigation in `index.md` toctree
3. Update file tree above if needed

### Writing Style

- Use clear, concise language
- Include code examples
- Add screenshots for UI elements
- Keep it up to date with the codebase

### Building Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Build documentation
make html

# Serve locally
make serve
```

## 🚨 Troubleshooting

### Common Issues

#### Import Errors

```bash
# Install the package in development mode
pip install -e ..

# Or add the project root to PYTHONPATH
export PYTHONPATH=$PYTHONPATH:$(pwd)/..
```

#### Theme Issues

```bash
# Reinstall theme
pip install --force-reinstall sphinx-rtd-theme

# Clear cache
make clean
make html
```

#### Build Errors

```bash
# Check for syntax errors
sphinx-build -b html . _build/html -W

# Verbose output
sphinx-build -b html . _build/html -v
```

## 🚀 Deployment

### Manual Deployment

```bash
# Build for production
make rtd

# Upload to server (if needed)
rsync -av _build/html/ user@server:/path/to/docs/
```

### ReadTheDocs

Documentation automatically deploys to:
https://django-revolution.readthedocs.io/

## 📞 Support

- **Documentation Issues**: [GitHub Issues](https://github.com/markolofsen/django-revolution/issues)
- **ReadTheDocs Issues**: [ReadTheDocs Support](https://readthedocs.org/support/)
- **Sphinx Issues**: [Sphinx Documentation](https://www.sphinx-doc.org/)

%%END%%
