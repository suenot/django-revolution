"""
Django settings for Django Revolution tests.
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-test-key-for-testing-only-do-not-use-in-production"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "drf_spectacular",
    "django_revolution",
    # Test apps
    "apps.public_api",
    "apps.private_api",
    "apps.core",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "wsgi.application"

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "test_db.sqlite3",
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# Media files
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Django Revolution Configuration
# ======================================

# 1. DRF + Spectacular Configuration (like in services.py)
from django_revolution.drf_config import create_drf_config

drf_config = create_drf_config(
    title="Django Revolution Test API",
    description="Test API for Django Revolution with zone-based architecture",
    version="1.0.0",
    schema_path_prefix="/api/",
    enable_browsable_api=True,
    enable_throttling=True,
)

# Apply DRF and Spectacular settings
settings_dict = drf_config.get_django_settings()
REST_FRAMEWORK = settings_dict["REST_FRAMEWORK"]
# SPECTACULAR_SETTINGS = settings_dict['SPECTACULAR_SETTINGS']

# 2. Zone Configuration (like in revolution.py)
from django_revolution.app_config import ZoneConfig, get_revolution_config


def create_revolution_config() -> dict:
    """Get Django Revolution configuration as dictionary."""

    # Define zones with typed Pydantic models
    zones = {
        "public": ZoneConfig(
            apps=["apps.public_api"],
            title="Public API",
            description="Public API for testing - users and posts",
            public=True,
            auth_required=False,
            version="v1",
        ),
        "private": ZoneConfig(
            apps=["apps.private_api"],
            title="Private API",
            description="Private API for testing - categories, products, orders",
            public=False,
            auth_required=True,
            version="v1",
        ),
    }

    # Option 1: With monorepo (uncomment to enable)
    # from django_revolution.app_config import MonorepoConfig
    # monorepo = MonorepoConfig(
    #     enabled=True,
    #     path=str(BASE_DIR.parent.parent.parent / 'monorepo'),
    #     api_package_path='packages/api/src'
    # )
    # return get_revolution_config(project_root=BASE_DIR, zones=zones, debug=DEBUG, monorepo=monorepo)

    # Option 2: Without monorepo (current setup)
    return get_revolution_config(
        project_root=BASE_DIR, zones=zones, debug=DEBUG, api_prefix="api"
    )


# Apply Django Revolution settings
DJANGO_REVOLUTION = create_revolution_config()
