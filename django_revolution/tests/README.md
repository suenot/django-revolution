# 🧪 Django Revolution Test Suite

## 📚 Purpose

Comprehensive test environment for Django Revolution - universal zone-based API client generator.

Tests validate:

- ✅ Configuration management with Pydantic validation
- ✅ Zone detection and management
- ✅ OpenAPI schema generation
- ✅ TypeScript and Python client generation
- ✅ Management command functionality
- ✅ End-to-end integration workflows

## 📁 Test Structure

```
tests/
├── README.md                    # This documentation
├── conftest.py                  # Pytest configuration and fixtures
├── test_config.py              # Configuration and validation tests
├── test_zones.py               # Zone management tests
├── test_openapi.py             # OpenAPI generation tests
├── test_management.py          # Management command tests
├── test_integration.py         # End-to-end integration tests
└── django_sample/              # Sample Django project for testing
    ├── manage.py
    ├── settings.py
    ├── urls.py
    ├── wsgi.py
    └── apps/
        ├── public_api/         # Sample public API app
        │   ├── models.py       # User, Post models
        │   ├── serializers.py  # DRF serializers
        │   ├── views.py        # ViewSets with drf-spectacular
        │   └── urls.py         # Router configuration
        └── private_api/        # Sample private API app
            ├── models.py       # Category, Product, Order models
            ├── serializers.py  # Complex nested serializers
            ├── views.py        # Advanced ViewSets with actions
            └── urls.py         # Router with nested endpoints
```

## 🚀 Running Tests

### Prerequisites

```bash
# Install test dependencies
pip install pytest pytest-django pytest-cov
pip install django djangorestframework drf-spectacular
```

### Run All Tests

```bash
# From package root
export DJANGO_SETTINGS_MODULE=tests.django_sample.settings
pytest -v
```

### Run Specific Test Categories

```bash
# Configuration tests
pytest tests/test_config.py -v

# Zone management tests
pytest tests/test_zones.py -v

# OpenAPI generation tests
pytest tests/test_openapi.py -v

# Management command tests
pytest tests/test_management.py -v

# Integration tests
pytest tests/test_integration.py -v
```

### Test Coverage

```bash
# Generate coverage report
pytest --cov=django_revolution --cov-report=html
```

## 🧩 Test Categories

### 1. Configuration Tests (`test_config.py`)

**Purpose:** Validate Pydantic configuration models and settings management

**Key Tests:**

- `TestZoneModel` - Zone configuration validation
- `TestDjangoRevolutionSettings` - Main settings class
- `TestOutputSettings` - Output directory configuration
- `TestGeneratorSettings` - TypeScript/Python generator settings

**Example:**

```python
def test_valid_zone_creation(self):
    zone = ZoneModel(
        name="test_zone",
        apps=["tests.django_sample.apps.public_api"],
        title="Test Zone",
        public=True
    )
    assert zone.name == "test_zone"
    assert zone.public is True
```

### 2. Zone Tests (`test_zones.py`)

**Purpose:** Test zone detection, management, and URL generation

**Key Tests:**

- `TestZoneManager` - Zone URL pattern generation
- `TestZoneDetector` - Zone discovery and validation
- `TestZoneIntegration` - Component integration
- `TestZoneURLGeneration` - drf-spectacular URL creation

**Example:**

```python
def test_zone_manager_initialization(self):
    manager = ZoneManager(self.config)
    assert len(manager.zones) == 2
    assert "public" in manager.zones
    assert isinstance(manager.zones["public"], ZoneModel)
```

### 3. OpenAPI Tests (`test_openapi.py`)

**Purpose:** Test schema generation and client creation

**Key Tests:**

- `TestOpenAPIGenerator` - Main generation orchestrator
- `TestTypeScriptGenerator` - HeyAPI TypeScript client generation
- `TestPythonClientGenerator` - openapi-python-client generation
- `TestUtilities` - Logger, ErrorHandler, utilities

**Example:**

```python
def test_generate_all_with_mock(self):
    with patch.object(self.generator, 'generate_schemas') as mock_schemas:
        mock_schemas.return_value = {"public": {}, "private": {}}
        summary = self.generator.generate_all()
        assert summary["total_zones"] == 2
```

### 4. Management Command Tests (`test_management.py`)

**Purpose:** Test Django management command interface

**Key Tests:**

- `TestRevolutionCommand` - Core command functionality
- `TestCommandOptions` - Option parsing and validation
- `TestCommandIntegration` - Integration with other components
- `TestCommandArguments` - Argument validation

**Example:**

```python
def test_list_zones_option(self):
    out = StringIO()
    call_command('revolution', '--list-zones', stdout=out)
    output = out.getvalue()
    assert "public" in output
    assert "private" in output
```

### 5. Integration Tests (`test_integration.py`)

**Purpose:** End-to-end workflow validation

**Key Tests:**

- `TestFullWorkflow` - Complete generation pipeline
- `TestRealWorldScenarios` - E-commerce, SaaS, microservices
- `TestPerformance` - Large configurations and memory usage
- `TestEdgeCases` - Error conditions and edge cases

**Example:**

```python
def test_end_to_end_workflow_mock(self):
    with patch('django_revolution.config.get_settings') as mock_settings:
        mock_settings.return_value = self.config
        call_command('revolution', stdout=out)
        output = out.getvalue()
        assert "Generated" in output
        assert "2 zones" in output
```

## 🎯 Test Django Apps

### Public API App (`tests.django_sample.apps.public_api`)

**Models:** `User`, `Post`
**Features:**

- Simple user management
- Blog post system
- Basic relationships
- Standard DRF serializers

### Private API App (`tests.django_sample.apps.private_api`)

**Models:** `Category`, `Product`, `Order`, `OrderItem`
**Features:**

- E-commerce domain models
- Complex relationships
- drf-spectacular documentation
- Custom ViewSet actions
- Nested serializers

## 🔧 Mock Strategy

### External Dependencies Mocked

- **Django management commands** - `run_command()` mocked
- **Subprocess calls** - `subprocess.run()` mocked for client generation
- **File system operations** - `pathlib.Path` operations mocked
- **Django app detection** - `django.apps.apps.is_installed()` mocked

### Real Components Tested

- Pydantic validation
- Configuration parsing
- Zone model creation
- URL pattern generation logic
- Management command argument parsing

## 📊 Test Data

### Sample Zone Configuration

```python
{
    "public": {
        "apps": ["tests.django_sample.apps.public_api"],
        "title": "Public API",
        "public": True,
        "auth_required": False
    },
    "private": {
        "apps": ["tests.django_sample.apps.private_api"],
        "title": "Private API",
        "public": False,
        "auth_required": True
    }
}
```

### Sample OpenAPI Schema

```python
{
    "openapi": "3.0.0",
    "info": {
        "title": "Test API",
        "version": "1.0.0"
    },
    "paths": {
        "/api/users/": {
            "get": {
                "summary": "List users",
                "responses": {"200": {"description": "Success"}}
            }
        }
    }
}
```

## 🧪 Testing Principles

### 1. **Comprehensive Coverage**

- All public APIs tested
- Error conditions validated
- Edge cases covered

### 2. **Realistic Scenarios**

- Real Django apps with DRF
- Actual OpenAPI schemas
- Production-like configurations

### 3. **Isolated Testing**

- External dependencies mocked
- Components tested independently
- Integration tested separately

### 4. **Performance Validation**

- Large configuration handling
- Memory usage verification
- Scalability testing

## 🚨 Common Issues

### Import Errors

```bash
# Ensure Django apps can be imported
export PYTHONPATH=/path/to/django_revolution
export DJANGO_SETTINGS_MODULE=tests.django_sample.settings
```

### Missing Dependencies

```bash
# Install all test dependencies
pip install -r requirements-test.txt
```

### Database Issues

```bash
# Create test database if needed
cd tests/django_sample
python manage.py migrate
```

## 📈 Test Metrics

**Target Coverage:** 85%+
**Test Count:** 80+ tests
**Performance:** <10s total execution
**Reliability:** 100% pass rate

## 🔄 CI/CD Integration

```yaml
# Example GitHub Actions
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
    - name: Install dependencies
      run: |
        pip install -e .
        pip install pytest pytest-django pytest-cov
    - name: Run tests
      run: |
        export DJANGO_SETTINGS_MODULE=tests.django_sample.settings
        pytest --cov=django_revolution --cov-report=xml
```

## 📖 See Also

- [Django Revolution Documentation](../README.md)
- [Configuration Guide](../docs/USAGE.md)
- [API Reference](../docs/API_REFERENCE.md)
