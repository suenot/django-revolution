# Django Revolution

**Zone-based API client generator for Django projects**

## 🎯 Purpose

A powerful Django framework extension that revolutionizes web development with modern patterns, enhanced tooling, and streamlined workflows.

## ✅ Rules

- Define zones in `api/config.py` or Django settings
- Use `python manage.py revolution` for generation
- Auto-installs dependencies (HeyAPI, openapi-python-client)
- Supports monorepo integration
- Archives clients with versioning

## 🚀 Features

- **Zone-Based API Organization** - Organize APIs into logical zones with clear boundaries
- **Multi-Language Client Generation** - TypeScript and Python clients with type safety
- **Automatic OpenAPI Schemas** - Generate OpenAPI 3.0 schemas automatically
- **Seamless Django Integration** - Zero configuration, works out of the box
- **Monorepo Support** - Intelligent synchronization with monorepo structures

## 📦 Installation

```bash
pip install django-revolution
```

## 🛠️ Quick Start

```python
# settings.py
INSTALLED_APPS = [
    'django_revolution',
    # ... your other apps
]

# Optional: Configure zones
DJANGO_REVOLUTION = {
    'zones': {
        'client': {
            'apps': ['src.accounts', 'src.billing'],
            'title': 'Client API',
            'public': True,
        }
    }
}
```

### Generate Clients

```bash
# Auto-detects zones and generates all clients
python manage.py revolution

# Generate specific zones
python manage.py revolution --zones public private

# TypeScript only
python manage.py revolution --typescript
```

### Use Generated Clients

```typescript
// TypeScript
import { client } from './openapi/clients/typescript/public';
const users = await client.sdk.users.list();
```

```python
# Python
from openapi.clients.python.public import PublicAPI
api = PublicAPI(base_url="https://api.example.com")
users = api.users.list()
```

## 📚 Documentation

Comprehensive documentation is available at [GitHub Pages](https://markolofsen.github.io/django-revolution/).

## 🔧 Requirements

- Python 3.9+
- Django 4.0+
- Node.js 18+ (for TypeScript generation)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

Non-Commercial License - see [LICENSE](LICENSE) file for details.

For commercial use, please contact Unrealos Inc. at licensing@unrealos.com

## 🆘 Support

- 📖 [Documentation](https://markolofsen.github.io/django-revolution/)
- 🐛 [Issue Tracker](https://github.com/markolofsen/django-revolution/issues)
- 💬 [Discussions](https://github.com/markolofsen/django-revolution/discussions)
