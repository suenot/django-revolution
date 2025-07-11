import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_sample.settings')
django.setup()

from django_revolution.config import get_settings
from django_revolution.openapi.generator import OpenAPIGenerator

settings = get_settings()
generator = OpenAPIGenerator(settings)
result = generator.generate_all()

print("=== GENERATION RESULT ===")
print(result) 