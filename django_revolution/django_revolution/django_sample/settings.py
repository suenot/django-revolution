"""
Django settings for Django Revolution tests.
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-test-key-for-testing-only-do-not-use-in-production'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'drf_spectacular',
    'django_revolution',
    # Test apps
    'django_sample.apps.public_api',
    'django_sample.apps.private_api',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'test_db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
}

# DRF Spectacular
SPECTACULAR_SETTINGS = {
    'TITLE': 'Django Revolution Test API',
    'DESCRIPTION': 'Test API for Django Revolution',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

# Django Revolution Configuration
DJANGO_REVOLUTION = {
    'api_prefix': 'api',
    'debug': True,
    'auto_install_deps': False,  # Disable for testing
    'zones': {
        'public': {
            'apps': ['django_sample.apps.public_api'],
            'title': 'Public API',
            'description': 'Public API for testing',
            'public': True,
            'auth_required': False
        },
        'private': {
            'apps': ['django_sample.apps.private_api'],
            'title': 'Private API',
            'description': 'Private API for testing',
            'public': False,
            'auth_required': True
        }
    },
    'output': {
        'base_directory': str(BASE_DIR / 'tests' / 'openapi'),
        'schemas_directory': 'schemas',
        'clients_directory': 'clients',
    },
    'generators': {
        'typescript': {
            'enabled': True,
            'output_directory': str(BASE_DIR / 'tests' / 'openapi' / 'clients' / 'typescript'),
        },
        'python': {
            'enabled': True,
            'output_directory': str(BASE_DIR / 'tests' / 'openapi' / 'clients' / 'python'),
        }
    },
    'monorepo': {
        'enabled': True,
        'path': str(BASE_DIR.parent.parent / 'monorepo'),
        'api_package_path': 'packages/api/src'
    }
} 