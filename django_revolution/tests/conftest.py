"""
Pytest configuration for Django Revolution tests.
"""

import pytest
import os
import sys
from pathlib import Path

# Add the package to Python path
package_root = Path(__file__).parent.parent
sys.path.insert(0, str(package_root))

# Django settings for testing
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tests.django_sample.settings')

import django
from django_revolution.config import DjangoRevolutionSettings
from django_revolution.zones import ZoneManager, ZoneDetector
from django_revolution.openapi.generator import OpenAPIGenerator

django.setup()


@pytest.fixture
def sample_zones():
    """Sample zone configuration for testing."""
    return {
        "public": {
            "apps": ["tests.django_sample.apps.public_api"],
            "title": "Public API",
            "description": "Public API for test purposes",
            "public": True,
            "auth_required": False
        },
        "private": {
            "apps": ["tests.django_sample.apps.private_api"],
            "title": "Private API", 
            "description": "Private API for admin purposes",
            "public": False,
            "auth_required": True
        }
    }


@pytest.fixture
def sample_config(sample_zones):
    """Sample DjangoRevolutionSettings for testing."""
    return DjangoRevolutionSettings(
        api_prefix="api",
        zones=sample_zones,
        output={
            "base_directory": "tests/openapi",
            "schemas_directory": "schemas",
            "clients_directory": "clients"
        },
        generators={
            "typescript": {
                "enabled": True,
                "output_directory": "tests/openapi/clients/typescript"
            },
            "python": {
                "enabled": True,
                "output_directory": "tests/openapi/clients/python"
            }
        }
    )


@pytest.fixture
def zone_manager(sample_config):
    """Zone manager instance for testing."""
    return ZoneManager(sample_config)


@pytest.fixture
def zone_detector(sample_config):
    """Zone detector instance for testing."""
    return ZoneDetector(sample_config)


@pytest.fixture
def openapi_generator(sample_config):
    """OpenAPI generator instance for testing."""
    return OpenAPIGenerator(sample_config)


@pytest.fixture
def temp_output_dir(tmp_path):
    """Temporary output directory for testing."""
    output_dir = tmp_path / "openapi"
    output_dir.mkdir()
    (output_dir / "schemas").mkdir()
    (output_dir / "clients").mkdir()
    (output_dir / "clients" / "typescript").mkdir()
    (output_dir / "clients" / "python").mkdir()
    return output_dir


@pytest.fixture
def mock_django_apps():
    """Mock Django apps availability."""
    from unittest.mock import patch
    
    def mock_is_installed(app_name):
        return app_name in [
            "tests.django_sample.apps.public_api",
            "tests.django_sample.apps.private_api"
        ]
    
    with patch('django.apps.apps.is_installed', side_effect=mock_is_installed):
        yield


@pytest.fixture
def mock_subprocess():
    """Mock subprocess for command execution."""
    from unittest.mock import patch, MagicMock
    
    with patch('subprocess.run') as mock_run:
        mock_result = MagicMock()
        mock_result.returncode = 0
        mock_result.stdout = ""
        mock_result.stderr = ""
        mock_run.return_value = mock_result
        yield mock_run


@pytest.fixture
def sample_openapi_schema():
    """Sample OpenAPI schema for testing."""
    return {
        "openapi": "3.0.0",
        "info": {
            "title": "Test API",
            "version": "1.0.0",
            "description": "Test API for Django Revolution"
        },
        "paths": {
            "/api/users/": {
                "get": {
                    "summary": "List users",
                    "responses": {
                        "200": {
                            "description": "List of users",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": {"type": "integer"},
                                                "name": {"type": "string"},
                                                "email": {"type": "string"}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } 