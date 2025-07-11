# Documentation

This directory contains documentation for the PyPI packages in the backend.

## Structure

- `django_revolution/` - Documentation for Django Revolution package

## Building Documentation

Each package has its own documentation directory with a Makefile for building and serving.

### Django Revolution

```bash
cd django_revolution
make html      # Build HTML documentation
make serve     # Build and serve on http://localhost:8000
make clean     # Clean build artifacts
```

## Requirements

- Python 3.9+
- Sphinx 7.4.7
- docutils 0.21.2
- sphinx-rtd-theme
- myst-parser

## Deployment

Documentation can be deployed to ReadTheDocs by connecting the repository and configuring the build settings in `.readthedocs.yml`.
