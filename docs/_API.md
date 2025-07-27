---
layout: default
title: API Reference
---

# 🔧 API Reference - LLM-Optimized

## 📖 Overview

Complete API documentation for Django Revolution with comprehensive function references, configuration examples, and utility functions.

**Key Features:**
- **Core configuration functions** - Zone configuration and management
- **Dynamic zone management** - In-memory URL generation and validation
- **OpenAPI generation** - Schema and client library generation
- **Development tools** - Version management and publishing utilities

---

## 📦 Core Modules

### django_revolution.app_config
**Purpose**: Core configuration management with Pydantic models.
**Dependencies**: `pydantic`, `pydantic-settings`, `pathlib`
**Exports**: `ZoneConfig`, `MonorepoConfig`, `get_revolution_config`
**Used in**: Django settings, zone definition, CLI configuration

### django_revolution.zones
**Purpose**: Dynamic zone management and URL generation.
**Dependencies**: `django.urls`, `types.ModuleType`, `django_revolution.app_config`
**Exports**: `DynamicZoneManager`, `DynamicZoneDetector`, `validate_zone_configuration`
**Used in**: Zone URL patterns, app detection, dynamic module creation

### django_revolution.openapi.generator
**Purpose**: OpenAPI schema and client generation.
**Dependencies**: `@hey-api/openapi-ts`, `datamodel-code-generator`, `drf-spectacular`
**Exports**: `OpenAPIGenerator`, `ArchiveManager`, `GenerationResult`
**Used in**: Schema generation, TypeScript/Python clients, archive management

### django_revolution.drf_config
**Purpose**: DRF and Spectacular configuration management.
**Dependencies**: `djangorestframework`, `drf-spectacular`, `pydantic`
**Exports**: `create_drf_config`, `DRFConfig`, `SpectacularSettings`
**Used in**: Django settings integration, REST framework configuration

---

## 🧾 APIs (ReadMe.LLM Format)

%%README.LLM id=zone-configuration%%

## 🧭 Library Description
Core configuration management with Pydantic models for zone definition and validation.

## ✅ Rules
- Always use Pydantic models for type safety
- Zone name comes from dictionary key, not path_prefix
- All zones must have apps list and version
- Public zones can have auth_required=False

## 🧪 Functions

### ZoneConfig(apps: List[str], title: str, description: str, public: bool, auth_required: bool, version: str)
**Creates a zone configuration.**
```python
zone = ZoneConfig(
    apps=['accounts', 'billing'],
    title='Public API',
    description='Public endpoints',
    public=True,
    auth_required=False,
    version='v1'
)
```

### get_revolution_config(project_root: Path, zones: Dict[str, ZoneConfig], debug: bool = False, monorepo: Optional[MonorepoConfig] = None)
**Creates Django Revolution configuration.**
```python
DJANGO_REVOLUTION = get_revolution_config(
    project_root=BASE_DIR,
    zones=zones,
    debug=DEBUG
)
```

### get_settings()
**Get Django Revolution settings from Django settings.**
```python
from django_revolution.config import get_settings
settings = get_settings()
print(settings.zones)
```

%%END%%

%%README.LLM id=dynamic-zone-management%%

## 🧭 Library Description
Dynamic zone management and URL generation with in-memory module creation.

## ✅ Rules
- No static zone files required
- Zones generated in-memory dynamically
- Validate zone configuration before generation
- Handle errors gracefully with detailed logging

## 🧪 Functions

### DynamicZoneManager()
**Manages zone configuration and URL generation in-memory.**
```python
from django_revolution.zones import DynamicZoneManager

zone_manager = DynamicZoneManager()
urlconf_module = zone_manager.create_dynamic_urlconf_module('public', zone_config)
apps = zone_manager.detect_apps_in_zone(zone_config)
is_valid = zone_manager.validate_zone_configuration('public', zone_config)
```

### create_dynamic_urlconf_module(zone_name: str, zone_config: ZoneConfig) -> ModuleType
**Create URL configuration module in-memory.**
```python
urlconf_module = zone_manager.create_dynamic_urlconf_module('public', zone_config)
```

### detect_apps_in_zone(zone_config: ZoneConfig) -> List[str]
**Detect Django apps that belong to a zone.**
```python
apps = zone_manager.detect_apps_in_zone(zone_config)
```

### validate_zone_configuration(zone_name: str, zone_config: ZoneConfig) -> bool
**Validate zone configuration and dependencies.**
```python
is_valid = zone_manager.validate_zone_configuration('public', zone_config)
```

%%END%%

%%README.LLM id=openapi-generator%%

## 🧭 Library Description
Generates OpenAPI schemas and client libraries with multithreaded support.

## ✅ Rules
- Always generate schemas before clients
- Use parallel processing for multiple zones
- Validate schemas after generation
- Handle errors gracefully with detailed logging

## 🧪 Functions

### OpenAPIGenerator(config)
**Generates OpenAPI schemas and client libraries.**
```python
from django_revolution.openapi.generator import OpenAPIGenerator

generator = OpenAPIGenerator(config)
schemas = generator.generate_schemas()
ts_client = generator.generate_typescript_client()
py_client = generator.generate_python_client()
archive = generator.generate_archive()
```

### generate_schemas() -> Dict[str, Path]
**Generate OpenAPI schemas for all zones.**
```python
schemas = generator.generate_schemas()
```

### generate_typescript_client() -> Path
**Generate TypeScript client using @hey-api/openapi-ts.**
```python
ts_client = generator.generate_typescript_client()
```

### generate_python_client() -> Path
**Generate Python client using datamodel-code-generator.**
```python
py_client = generator.generate_python_client()
```

### generate_archive() -> Path
**Generate archive of all clients.**
```python
archive = generator.generate_archive()
```

%%END%%

%%README.LLM id=drf-configuration%%

## 🧭 Library Description
DRF and Spectacular configuration management for Django settings integration.

## ✅ Rules
- Use Pydantic models for configuration
- Validate settings before application
- Handle environment-specific configurations
- Provide sensible defaults

## 🧪 Functions

### create_drf_config(title: str, description: str, version: str, schema_path_prefix: str = '/apix/', enable_browsable_api: bool = False, enable_throttling: bool = False)
**Create DRF and Spectacular configuration.**
```python
from django_revolution.drf_config import create_drf_config

drf_config = create_drf_config(
    title='My API',
    description='My awesome API',
    version='1.0.0',
    schema_path_prefix='/apix/',
    enable_browsable_api=False,
    enable_throttling=False
)
```

### get_rest_framework_settings()
**Get REST framework settings.**
```python
rest_framework_settings = drf_config.get_rest_framework_settings()
```

### get_spectacular_settings()
**Get Spectacular settings.**
```python
spectacular_settings = drf_config.get_spectacular_settings()
```

### get_django_settings()
**Get all Django settings.**
```python
django_settings = drf_config.get_django_settings()
```

%%END%%

---

## 🔁 Core Functions

### URL Integration Functions

```python
from django_revolution.urls_integration import add_revolution_urls, get_revolution_urlpatterns, get_revolution_urls_info

# Add Django Revolution URLs to your URL patterns
urlpatterns = [
    # Your existing URLs
]
urlpatterns = add_revolution_urls(urlpatterns)

# Get Django Revolution URL patterns
urlpatterns = [
    # Your existing URLs
    *get_revolution_urlpatterns()
]

# Get information about generated URLs
urls_info = get_revolution_urls_info()
for zone, info in urls_info.items():
    print(f"Zone: {zone}")
    print(f"  Schema URL: {info['schema_url']}")
    print(f"  API URL: {info['api_url']}")
```

### Dynamic Zone Detection

```python
from django_revolution.zones import DynamicZoneDetector

detector = DynamicZoneDetector()

# Detect apps in project
apps = detector.detect_apps()

# Get URL patterns for app
patterns = detector.get_app_url_patterns('accounts')

# Validate app exists
exists = detector.app_exists('accounts')
```

---

## 🛠️ Development Tools

### Version Management

```python
from scripts.version_manager import VersionManager

version_manager = VersionManager()

# Get current version
version = version_manager.get_current_version()

# Bump version
new_version = version_manager.bump_version('patch')

# Validate version consistency
is_consistent = version_manager.validate_version_consistency()

# Regenerate requirements
version_manager.regenerate_requirements()
```

### Publisher

```python
from scripts.publisher import main as publish

# Interactive publishing
exit_code = publish()
```

### CLI Main Function

```python
from django_revolution.cli import main

# Run CLI
exit_code = main()
```

### Development CLI

```python
from scripts.dev_cli import main as dev_cli

# Run development CLI
dev_cli()
```

---

## 📋 Utility Functions

### Auto-installation

```python
from django_revolution.utils import auto_install_dependencies

success = auto_install_dependencies()
if success:
    print("✅ Dependencies installed")
else:
    print("❌ Failed to install dependencies")
```

### Command Execution

```python
from django_revolution.utils import run_command

success, output = run_command("npm install @hey-api/openapi-ts")
if success:
    print(f"✅ Command succeeded: {output}")
else:
    print(f"❌ Command failed: {output}")
```

### Directory Management

```python
from django_revolution.utils import ensure_directories
from pathlib import Path

success = ensure_directories(
    Path("openapi/schemas"),
    Path("clients/typescript"),
    Path("clients/python")
)
```

### Template Rendering

```python
from django_revolution.utils import render_template

template = "Hello {{ name }}!"
context = {"name": "World"}
result = render_template(template, context)
# Result: "Hello World!"
```

---

## 🔍 Validation Functions

### Zone Validation

```python
from django_revolution.zones import validate_zone_configuration

is_valid = validate_zone_configuration('public', zone_config)
if not is_valid:
    print("❌ Invalid zone configuration")
```

### Environment Validation

```python
from django_revolution.utils import validate_environment

validation_result = validate_environment()
if validation_result['success']:
    print("✅ Environment is valid")
else:
    print(f"❌ Environment issues: {validation_result['errors']}")
```

---

## 📊 Data Models

### GenerationResult

```python
from django_revolution.openapi.generator import GenerationResult

result = GenerationResult(
    success=True,
    schemas={'public': Path('openapi/schemas/public.yaml')},
    typescript_client=Path('clients/typescript/index.ts'),
    python_client=Path('clients/python/client.py'),
    archive=Path('openapi/archive/2024-01-15_10-30-00.zip'),
    errors=[],
    warnings=[]
)
```

### ZoneInfo

```python
from django_revolution.zones import ZoneInfo

zone_info = ZoneInfo(
    name='public',
    apps=['accounts', 'billing'],
    url_patterns=5,
    schema_patterns=3,
    is_valid=True,
    errors=[],
    warnings=[]
)
```

---

## 🎯 Error Handling

### ErrorHandler

```python
from django_revolution.utils import ErrorHandler

error_handler = ErrorHandler()

# Handle exception
result = error_handler.handle_exception(
    exception,
    context="zone generation"
)

# Validate path
is_valid = error_handler.validate_path(Path("openapi/schemas"))

# Validate file
is_valid = error_handler.validate_file(Path("settings.py"))
```

---

## 📝 Logging

### Logger

```python
from django_revolution.utils import Logger

logger = Logger("my_module")

logger.info("Starting generation...")
logger.success("Generation completed!")
logger.warning("Some warnings occurred")
logger.error("Generation failed")
logger.debug("Debug information")
```

---

## 🔧 Configuration Examples

### Basic Configuration

```python
# settings.py
from django_revolution.app_config import ZoneConfig, get_revolution_config

zones = {
    'public': ZoneConfig(
        apps=['accounts', 'billing'],
        title='Public API',
        description='Public endpoints',
        public=True,
        auth_required=False,
        version='v1'
    )
}

DJANGO_REVOLUTION = get_revolution_config(
    project_root=BASE_DIR,
    zones=zones,
    debug=DEBUG
)
```

### Advanced Configuration

```python
# settings.py
from django_revolution.app_config import ZoneConfig, MonorepoConfig, get_revolution_config

zones = {
    'public': ZoneConfig(
        apps=['accounts', 'billing', 'payments'],
        title='Public API',
        description='Public endpoints',
        public=True,
        auth_required=False,
        version='v1'
    ),
    'admin': ZoneConfig(
        apps=['admin_panel', 'analytics'],
        title='Admin API',
        description='Administrative endpoints',
        public=False,
        auth_required=True,
        version='v1'
    )
}

monorepo = MonorepoConfig(
    enabled=True,
    path=str(BASE_DIR.parent.parent / 'monorepo'),
    api_package_path='packages/api/src'
)

DJANGO_REVOLUTION = get_revolution_config(
    project_root=BASE_DIR,
    zones=zones,
    monorepo=monorepo,
    debug=DEBUG
)
```

---

## 🧠 Key Notes

- **Dynamic Architecture**: No static zone files required, everything generated in-memory
- **Type Safety**: Pydantic models ensure configuration correctness
- **Performance**: Multithreading provides 2-3x speedup for multiple zones
- **Development Tools**: Comprehensive CLI toolbox for development workflow
- **Error Handling**: Comprehensive error handling and validation
- **Logging**: Enhanced logger with rich output for debugging

---

[← Back to CLI Reference](cli.html) | [Next: Architecture →](architecture.html)
