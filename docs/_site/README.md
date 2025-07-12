# Django Revolution Documentation

This directory contains the documentation for Django Revolution, hosted on GitHub Pages.

## Structure

```
docs/
├── _config.yml          # Jekyll configuration
├── index.md             # Home page
├── installation.md      # Installation guide
├── usage.md             # Usage guide
├── cli.md               # CLI reference
├── api-reference.md     # API reference
├── architecture.md      # Architecture guide
├── troubleshooting.md   # Troubleshooting guide
└── README.md            # This file
```

## Local Development

### Prerequisites

- Ruby 2.6+
- Jekyll 4.0+

### Setup

```bash
# Install Jekyll
gem install jekyll bundler

# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Open http://localhost:4000
```

### Build

```bash
# Build for production
bundle exec jekyll build

# Build to _site directory
bundle exec jekyll build --destination _site
```

## GitHub Pages Setup

1. **Enable GitHub Pages** in your repository settings
2. **Select source**: Deploy from a branch
3. **Select branch**: `main` or `gh-pages`
4. **Select folder**: `/docs`
5. **Save** the configuration

## Customization

### Theme

The documentation uses the Cayman theme. To customize:

1. Edit `_config.yml`
2. Add custom CSS in `assets/css/`
3. Override theme files in `_layouts/`

### Navigation

Update navigation in `_config.yml`:

```yaml
nav:
  - title: Home
    url: /
  - title: Installation
    url: /installation.html
  # ... more pages
```

### Styling

Add custom styles in `assets/css/style.scss`:

```scss
---
---

// Your custom styles here
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}
```

## Deployment

### Automatic (GitHub Pages)

Push to the configured branch and GitHub Pages will automatically build and deploy.

### Manual

```bash
# Build
bundle exec jekyll build

# Deploy to GitHub Pages
git add _site
git commit -m "Update documentation"
git push origin gh-pages
```

## Contributing

1. Edit Markdown files in the `docs/` directory
2. Test locally with `bundle exec jekyll serve`
3. Commit and push changes
4. GitHub Pages will automatically rebuild

## Links

- **Live Site**: https://markolofsen.github.io/django-revolution/
- **Repository**: https://github.com/markolofsen/django-revolution
- **Issues**: https://github.com/markolofsen/django-revolution/issues
