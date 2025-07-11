%%README.LLM id=django-revolution-troubleshooting%%

# Troubleshooting Guide

**Fix common Django Revolution issues quickly.**

## 🎯 Purpose

Quick solutions for common problems when using Django Revolution.

## ✅ Rules

- Check status first: `python manage.py revolution --status`
- Use verbose output for debugging: `--verbosity=3`
- Validate configuration before generating: `--validate`
- Clean and retry if needed: `--clean`

## 🚨 Common Issues

### 1. Sphinx 8.x Compatibility Issues

**Problem**: `ImportError: cannot import name 'roles' from 'docutils.parsers.rst'`

**Cause**: Sphinx 8.x has breaking changes with docutils compatibility.

**Solution**:

```bash
# Downgrade to Sphinx 7.x
pip install "sphinx<8.0" "docutils>=0.20,<0.22" --force-reinstall

# Or use the fixed requirements
pip install -r requirements.txt
```

### 2. Missing Dependencies

**Problem**: `ModuleNotFoundError` for sphinx packages

**Solution**:

```bash
# Install all dependencies
make install-deps

# Or install manually
pip install sphinx sphinx-rtd-theme myst-parser
```

### 3. Permission Issues

**Problem**: Permission denied when building

**Solution**:

```bash
# Check directory permissions
ls -la _build/

# Create directories if needed
mkdir -p _build/html
mkdir -p _static
```

### 4. Theme Issues

**Problem**: Theme not loading or styling broken

**Solution**:

```bash
# Reinstall theme
pip install --force-reinstall sphinx-rtd-theme

# Clear cache and rebuild
make clean
make html
```

### 5. Import Errors

**Problem**: Cannot import Django Revolution modules

**Solution**:

```bash
# Install package in development mode
cd ..
pip install -e ".[docs]"

# Or add to PYTHONPATH
export PYTHONPATH=$PYTHONPATH:$(pwd)/..
```

## 🔧 Build Commands

### Clean Build

```bash
make clean
make html
```

### Verbose Build

```bash
sphinx-build -b html . _build/html -v
```

### Debug Build

```bash
sphinx-build -b html . _build/html -W
```

## 🌍 Environment Issues

### Python Version Conflicts

**Problem**: Multiple Python versions causing conflicts

**Solution**:

```bash
# Use virtual environment
python -m venv docs_env
source docs_env/bin/activate  # On Windows: docs_env\Scripts\activate
pip install -r requirements.txt
```

### Conda Environment Issues

**Problem**: Conda environment conflicts

**Solution**:

```bash
# Create clean conda environment
conda create -n docs python=3.11
conda activate docs
pip install -r requirements.txt
```

## 📚 ReadTheDocs Specific Issues

### Build Failures on ReadTheDocs

**Problem**: Builds fail on ReadTheDocs but work locally

**Solution**:

1. Check `.readthedocs.yml` configuration
2. Verify all dependencies are in `pyproject.toml`
3. Test with ReadTheDocs Docker image locally

### Version Conflicts

**Problem**: Different versions between local and ReadTheDocs

**Solution**:

```bash
# Pin exact versions in requirements.txt
sphinx==7.4.7
sphinx-rtd-theme==3.0.2
myst-parser==3.0.1
docutils==0.21.2
```

## ⚡ Performance Issues

### Slow Builds

**Problem**: Documentation builds very slowly

**Solution**:

```bash
# Use parallel builds
sphinx-build -b html . _build/html -j auto

# Exclude unnecessary files
# Add to conf.py:
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'node_modules']
```

### Memory Issues

**Problem**: Out of memory during build

**Solution**:

```bash
# Reduce parallel jobs
sphinx-build -b html . _build/html -j 2

# Clean before building
make clean
make html
```

## 🛠️ Getting Help

### Check Logs

```bash
# Verbose output
make html 2>&1 | tee build.log

# Check specific errors
grep -i error build.log
```

### Common Commands

```bash
# Check Sphinx version
sphinx-build --version

# Check installed packages
pip list | grep sphinx

# Validate configuration
sphinx-build -b html . _build/html --dry-run
```

### Resources

- **Sphinx Documentation**: https://www.sphinx-doc.org/
- **ReadTheDocs Support**: https://readthedocs.org/support/
- **GitHub Issues**: https://github.com/markolofsen/django-revolution/issues

## 🔄 Quick Fixes

### Reset Everything

```bash
# Complete reset
make clean
pip uninstall sphinx sphinx-rtd-theme myst-parser -y
pip install -r requirements.txt
make html
```

### Force Reinstall

```bash
# Force reinstall all dependencies
pip install --force-reinstall -r requirements.txt
```

### Check System

```bash
# Check Python version
python --version

# Check pip version
pip --version

# Check installed packages
pip freeze | grep -E "(sphinx|docutils|myst)"
```

## 🎯 Django Revolution Specific Issues

### Command Not Found

**Problem**: `python manage.py revolution` not found

**Solution**:

```bash
# Check installation
pip list | grep django-revolution

# Reinstall if needed
pip install --force-reinstall django-revolution

# Check Django settings
python manage.py check
```

### Zone Configuration Errors

**Problem**: Zone validation fails

**Solution**:

```bash
# Validate configuration
python manage.py revolution --validate

# Check zone definitions
python manage.py revolution --list-zones

# Check if apps exist
python manage.py check
```

### Generation Fails

**Problem**: Client generation fails

**Solution**:

```bash
# Check status
python manage.py revolution --status

# Install dependencies
python manage.py revolution --install-deps

# Force regeneration
python manage.py revolution --force

# Clean and retry
python manage.py revolution --clean
python manage.py revolution
```

### Import Errors in Generated Clients

**Problem**: Can't import generated clients

**Solution**:

```bash
# Check if clients were generated
ls -la monorepo/packages/api/typescript/public/

# Regenerate clients
python manage.py revolution --force

# Check package.json dependencies
cat monorepo/packages/api/typescript/public/package.json
```

---

**💡 Tip**: Most issues can be resolved by using the exact versions specified in `requirements.txt` and ensuring a clean build environment.

%%END%%
