import os
import sys
from pathlib import Path

# Add the package to Python path
package_root = Path(__file__).parent.parent
sys.path.insert(0, str(package_root))

# Setup minimal environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tests.test_settings')
