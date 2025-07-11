# Django Revolution - Sample Project

This is a test Django project for Django Revolution, demonstrating zone-based API client generation with automatic configuration.

## Quick Start

### Prerequisites

- Python 3.8+
- Django 4.0+
- Django REST Framework
- drf-spectacular

### Running Tests

1. **Navigate to the django_revolution directory:**

   ```bash
   cd /path/to/backend/pypi/django_revolution
   ```

2. **Run the generation script:**

   ```bash
   cd /path/to/backend/pypi/django_revolution/django_sample
   PYTHONPATH=..:$PYTHONPATH DJANGO_SETTINGS_MODULE=django_sample.settings python manage.py revolution --debug
   ```

   Or manually:

   ```bash
   cd /path/to/backend/pypi/django_revolution/django_sample
   PYTHONPATH=..:$PYTHONPATH DJANGO_SETTINGS_MODULE=django_sample.settings python manage.py revolution --list-zones
   ```

## Project Structure

```
django_sample/
├── apps/
│   ├── public_api/          # Public API zone
│   │   ├── models.py        # User, Post models
│   │   ├── views.py         # ViewSets
│   │   ├── urls.py          # URL patterns
│   │   └── serializers.py   # DRF serializers
│   └── private_api/         # Private API zone
│       ├── models.py        # Category, Product, Order models
│       ├── views.py         # ViewSets
│       ├── urls.py          # URL patterns
│       └── serializers.py   # DRF serializers
├── settings.py              # Django settings with automatic config
├── urls.py                  # Main URL configuration
└── teststest_real_generation.py  # Generation test script
```

## Automatic Configuration

This sample project demonstrates the **automatic configuration** approach used in production:

### 1. DRF + Spectacular Configuration

```python
# settings.py - Automatic DRF configuration
from django_revolution.drf_config import create_drf_config

drf_config = create_drf_config(
    title="Django Revolution Test API",
    description="Test API for Django Revolution with zone-based architecture",
    version="1.0.0",
    schema_path_prefix="/api/",
    enable_browsable_api=True,
    enable_throttling=True,
)

# Apply settings automatically
settings_dict = drf_config.get_django_settings()
REST_FRAMEWORK = settings_dict['REST_FRAMEWORK']
SPECTACULAR_SETTINGS = settings_dict['SPECTACULAR_SETTINGS']
```

### 2. Zone Configuration

```python
# settings.py - Automatic zone configuration
from django_revolution.app_config import ZoneConfig, get_revolution_config

def create_revolution_config() -> dict:
    """Get Django Revolution configuration as dictionary."""

    zones = {
        'public': ZoneConfig(
            apps=['django_sample.apps.public_api'],
            title='Public API',
            description='Public API for testing - users and posts',
            public=True,
            auth_required=False,
            version='v1',
            path_prefix='public'
        ),
        'private': ZoneConfig(
            apps=['django_sample.apps.private_api'],
            title='Private API',
            description='Private API for testing - categories, products, orders',
            public=False,
            auth_required=True,
            version='v1',
            path_prefix='private'
        )
    }

    return get_revolution_config(project_root=BASE_DIR, zones=zones, debug=DEBUG)

# Apply Django Revolution settings
DJANGO_REVOLUTION = create_revolution_config()
```

### 3. URL Integration

```python
# urls.py - Automatic URL generation
from django_revolution import add_revolution_urls

urlpatterns = [
    # Your existing URLs
    path('admin/', admin.site.urls),
    path('api/', include('django_sample.apps.public_api.urls')),
    path('api/private/', include('django_sample.apps.private_api.urls')),
]

# Django Revolution automatically adds:
# - /api/public/schema/ (Swagger UI)
# - /api/public/schema.yaml (OpenAPI spec)
# - /api/private/schema/ (Swagger UI)
# - /api/private/schema.yaml (OpenAPI spec)
# - /openapi/archive/ (Generated clients)
urlpatterns = add_revolution_urls(urlpatterns)
```

## Zones Configuration

The project demonstrates two API zones:

### Public Zone

- **Apps:** `django_sample.apps.public_api`
- **Models:** User, Post
- **Endpoints:** `/api/users/`, `/api/posts/`
- **Access:** Public, no auth required
- **Schema:** `/api/public/schema/`

### Private Zone

- **Apps:** `django_sample.apps.private_api`
- **Models:** Category, Product, Order, OrderItem
- **Endpoints:** `/api/private/categories/`, `/api/private/products/`, etc.
- **Access:** Private, auth required
- **Schema:** `/api/private/schema/`
