# Documentation Deployment Guide

This guide explains how to deploy Django Revolution documentation to ReadTheDocs.

## Prerequisites

1. **GitHub Repository**: Your code must be in a public GitHub repository
2. **ReadTheDocs Account**: Sign up at [readthedocs.org](https://readthedocs.org)
3. **Documentation Structure**: Ensure your docs are properly structured

## Quick Setup

### 1. Connect Repository to ReadTheDocs

1. Go to [readthedocs.org](https://readthedocs.org)
2. Click "Import a Project"
3. Connect your GitHub account
4. Select your `django-revolution` repository
5. Click "Next"

### 2. Configure Build Settings

ReadTheDocs will automatically detect the `.readthedocs.yml` file and use these settings:

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
  fail_on_warning: false
```

### 3. Build Documentation

ReadTheDocs will automatically:

- Install your package with `pip install -e ".[docs]"`
- Build documentation using Sphinx
- Deploy to `https://your-project.readthedocs.io/`

## Manual Deployment

### Local Build

```bash
# Install dependencies
pip install -r docs/requirements.txt

# Build documentation
cd docs
make html

# Serve locally
make serve
```

### Manual Upload

```bash
# Build for production
make rtd

# Upload to server (if needed)
rsync -av _build/html/ user@server:/path/to/docs/
```

## Configuration Options

### Environment Variables

You can set these in ReadTheDocs project settings:

```bash
# Build environment
READTHEDOCS_PROJECT=django-revolution
READTHEDOCS_VERSION=latest
READTHEDOCS_LANGUAGE=en

# Custom settings
READTHEDOCS_USE_CONDA=false
READTHEDOCS_CONDA_ENV=docs
```

### Custom Domain

1. Go to your ReadTheDocs project settings
2. Under "Custom Domains", add your domain
3. Update DNS records to point to ReadTheDocs
4. Configure SSL certificate

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Check build logs in ReadTheDocs
# Common causes:
# - Missing dependencies
# - Import errors
# - Configuration issues
```

#### Import Errors

```bash
# Make sure package is installable
pip install -e ".[docs]"

# Check imports work
python -c "import django_revolution"
```

#### Theme Issues

```bash
# Verify theme is installed
pip install sphinx-rtd-theme

# Check theme configuration
grep -r "html_theme" docs/conf.py
```

### Getting Help

- **ReadTheDocs Support**: [https://readthedocs.org/support/](https://readthedocs.org/support/)
- **Sphinx Documentation**: [https://www.sphinx-doc.org/](https://www.sphinx-doc.org/)
- **GitHub Issues**: [https://github.com/markolofsen/django-revolution/issues](https://github.com/markolofsen/django-revolution/issues)

## Advanced Configuration

### Multiple Versions

ReadTheDocs automatically builds documentation for:

- All branches
- All tags
- Pull requests

### Custom Build Commands

You can override build commands in ReadTheDocs settings:

```bash
# Pre-build commands
pip install --upgrade pip
pip install -r docs/requirements.txt

# Build commands
cd docs && make html
```

### Analytics

Enable Google Analytics in ReadTheDocs settings:

```html
<!-- Add to docs/conf.py -->
html_theme_options = { 'analytics_id': 'G-XXXXXXXXXX', }
```

## Maintenance

### Regular Tasks

1. **Update Dependencies**: Keep documentation dependencies up to date
2. **Check Links**: Run `make linkcheck` regularly
3. **Test Builds**: Verify builds work after major changes
4. **Review Content**: Keep documentation current with code

### Monitoring

- **Build Status**: Check ReadTheDocs dashboard regularly
- **User Feedback**: Monitor GitHub issues for documentation problems
- **Analytics**: Review ReadTheDocs analytics for popular pages

## Best Practices

### Documentation Structure

```
docs/
├── conf.py              # Sphinx configuration
├── index.md             # Main page
├── installation.md      # Installation guide
├── cli.md              # CLI reference
├── requirements.txt     # Dependencies
├── Makefile            # Build commands
└── README.md           # Local guide
```

### Writing Style

- Use clear, concise language
- Include code examples
- Add screenshots for UI elements
- Keep it up to date with the codebase
- Use consistent formatting

### Version Control

- Commit documentation changes with code changes
- Use descriptive commit messages
- Tag releases to trigger documentation builds
- Review documentation in pull requests

## Support

For help with documentation deployment:

- **ReadTheDocs Documentation**: [https://docs.readthedocs.io/](https://docs.readthedocs.io/)
- **Sphinx Documentation**: [https://www.sphinx-doc.org/](https://www.sphinx-doc.org/)
- **Project Issues**: [https://github.com/markolofsen/django-revolution/issues](https://github.com/markolofsen/django-revolution/issues)
