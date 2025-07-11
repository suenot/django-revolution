# Django Revolution Documentation

This directory contains the documentation for Django Revolution, built with Sphinx and hosted on ReadTheDocs.

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Build Documentation

```bash
# Build HTML documentation
make html

# Or use sphinx-build directly
sphinx-build -b html . _build/html
```

### 3. View Documentation

```bash
# Serve locally
make serve

# Or open in browser
open _build/html/index.html
```

## Development

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

### Link Checking

```bash
# Check all links
make linkcheck
```

### Spell Checking

```bash
# Check spelling
make spelling
```

## Structure

```
docs/
├── conf.py              # Sphinx configuration
├── index.md             # Main documentation page
├── installation.md      # Installation guide
├── cli.md              # CLI reference
├── requirements.txt     # Documentation dependencies
├── Makefile            # Build commands
└── README.md           # This file
```

## ReadTheDocs Integration

### Automatic Builds

This documentation is automatically built and deployed to ReadTheDocs when:

1. Code is pushed to the `main` branch
2. A new tag is created
3. A pull request is opened

### Configuration

The `.readthedocs.yml` file in the project root configures the build process:

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

## Contributing

### Adding New Pages

1. Create a new `.md` file in the `docs/` directory
2. Add it to the navigation in `conf.py`
3. Update the index page if needed

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

## Troubleshooting

### Common Issues

#### Import Errors

If you get import errors when building:

```bash
# Install the package in development mode
pip install -e ..

# Or add the project root to PYTHONPATH
export PYTHONPATH=$PYTHONPATH:$(pwd)/..
```

#### Theme Issues

If the theme doesn't load:

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

## Deployment

### Manual Deployment

```bash
# Build for production
make rtd

# Upload to server (if needed)
rsync -av _build/html/ user@server:/path/to/docs/
```

### ReadTheDocs

The documentation is automatically deployed to ReadTheDocs at:
https://django-revolution.readthedocs.io/

## Support

- **Documentation Issues**: [GitHub Issues](https://github.com/markolofsen/django-revolution/issues)
- **ReadTheDocs Issues**: [ReadTheDocs Support](https://readthedocs.org/support/)
- **Sphinx Issues**: [Sphinx Documentation](https://www.sphinx-doc.org/)
