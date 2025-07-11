#!/usr/bin/env python3
"""
Version Configuration for Django Revolution

Centralized version management for all package files.
"""

import re
from pathlib import Path
from typing import Tuple


class VersionConfig:
    """Manages version across all package files."""
    
    def __init__(self, base_path: Path = None):
        """
        Initialize version config.
        
        Args:
            base_path: Base path for the package (defaults to current directory)
        """
        self.base_path = base_path or Path.cwd()
        
        # Files that contain version information
        self.version_files = {
            'pyproject.toml': {
                'pattern': r'version\s*=\s*["\']([^"\']+)["\']',
                'replacement': 'version = "{version}"'
            },
            'django_revolution/__init__.py': {
                'pattern': r'__version__\s*=\s*["\']([^"\']+)["\']',
                'replacement': '__version__ = "{version}"'
            },
            'django_revolution/openapi/templates/__init__.py.j2': {
                'pattern': r'__version__\s*=\s*["\']([^"\']+)["\']',
                'replacement': '__version__ = "{version}"'
            },
            'django_revolution/openapi/templates/package.json.j2': {
                'pattern': r'"version":\s*["\']([^"\']+)["\']',
                'replacement': '"version": "{version}"'
            }
        }
    
    def get_current_version(self) -> str:
        """
        Get current version from pyproject.toml.
        
        Returns:
            Current version string
        """
        pyproject_path = self.base_path / 'pyproject.toml'
        
        if not pyproject_path.exists():
            raise FileNotFoundError(f"pyproject.toml not found at {pyproject_path}")
        
        content = pyproject_path.read_text(encoding='utf-8')
        match = re.search(r'version\s*=\s*["\']([^"\']+)["\']', content)
        
        if not match:
            raise ValueError("Version not found in pyproject.toml")
        
        return match.group(1)
    
    def parse_version(self, version: str) -> Tuple[int, int, int]:
        """
        Parse version string into components.
        
        Args:
            version: Version string (e.g., "1.0.1")
            
        Returns:
            Tuple of (major, minor, patch)
        """
        parts = version.split('.')
        if len(parts) != 3:
            raise ValueError(f"Invalid version format: {version}")
        
        return tuple(int(part) for part in parts)
    
    def bump_version(self, bump_type: str = 'patch') -> str:
        """
        Bump version and update all files.
        
        Args:
            bump_type: Type of version bump ('major', 'minor', 'patch')
            
        Returns:
            New version string
        """
        current_version = self.get_current_version()
        major, minor, patch = self.parse_version(current_version)
        
        if bump_type == 'major':
            major += 1
            minor = 0
            patch = 0
        elif bump_type == 'minor':
            minor += 1
            patch = 0
        elif bump_type == 'patch':
            patch += 1
        else:
            raise ValueError(f"Invalid bump type: {bump_type}")
        
        new_version = f"{major}.{minor}.{patch}"
        
        # Update all version files
        self.update_version_in_all_files(new_version)
        
        return new_version
    
    def update_version_in_all_files(self, version: str):
        """
        Update version in all configured files.
        
        Args:
            version: New version string
        """
        for filename, config in self.version_files.items():
            file_path = self.base_path / filename
            
            if not file_path.exists():
                print(f"Warning: {filename} not found, skipping...")
                continue
            
            try:
                content = file_path.read_text(encoding='utf-8')
                pattern = config['pattern']
                replacement = config['replacement'].format(version=version)
                
                # Replace version
                new_content = re.sub(pattern, replacement, content)
                
                if new_content != content:
                    file_path.write_text(new_content, encoding='utf-8')
                    print(f"✅ Updated version in {filename}")
                else:
                    print(f"⚠️  No version found in {filename}")
                    
            except Exception as e:
                print(f"❌ Failed to update {filename}: {e}")
    
    def validate_version_consistency(self) -> bool:
        """
        Validate that all files have the same version.
        
        Returns:
            True if all versions are consistent
        """
        reference_version = self.get_current_version()
        inconsistent_files = []
        
        for filename, config in self.version_files.items():
            if filename == 'pyproject.toml':
                continue  # This is our reference
            
            file_path = self.base_path / filename
            
            if not file_path.exists():
                continue
            
            try:
                content = file_path.read_text(encoding='utf-8')
                match = re.search(config['pattern'], content)
                
                if not match:
                    inconsistent_files.append(f"{filename}: no version found")
                elif match.group(1) != reference_version:
                    inconsistent_files.append(f"{filename}: {match.group(1)} != {reference_version}")
                    
            except Exception as e:
                inconsistent_files.append(f"{filename}: error - {e}")
        
        if inconsistent_files:
            print("❌ Version inconsistencies found:")
            for file_info in inconsistent_files:
                print(f"  - {file_info}")
            return False
        
        print(f"✅ All files have consistent version: {reference_version}")
        return True


def main():
    """CLI for version management."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Django Revolution Version Manager")
    parser.add_argument('action', choices=['get', 'bump', 'validate'], help='Action to perform')
    parser.add_argument('--bump-type', choices=['major', 'minor', 'patch'],
                       default='patch', help='Type of version bump (default: patch)')
    
    args = parser.parse_args()
    
    config = VersionConfig()
    
    if args.action == 'get':
        version = config.get_current_version()
        print(f"Current version: {version}")
        
    elif args.action == 'bump':
        new_version = config.bump_version(args.bump_type)
        print(f"Version bumped to: {new_version}")
        
    elif args.action == 'validate':
        config.validate_version_consistency()


if __name__ == "__main__":
    main() 