# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?=
SPHINXBUILD   ?= /usr/bin/python3 -m sphinx
SOURCEDIR     = .
BUILDDIR      = _build

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

# Custom targets for Django Revolution documentation

install-deps:
	/usr/bin/python3 -m pip install sphinx==7.4.7 docutils==0.21.2 sphinx-rtd-theme myst-parser

clean:
	rm -rf $(BUILDDIR)
	rm -rf _static
	rm -rf _templates

html: install-deps
	$(SPHINXBUILD) -b html $(SPHINXOPTS) $(SOURCEDIR) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

serve: html
	/usr/bin/python3 -m http.server 8000 --directory $(BUILDDIR)/html

pdf: install-deps
	$(SPHINXBUILD) -b latex $(SPHINXOPTS) $(SOURCEDIR) $(BUILDDIR)/latex
	@echo "Running LaTeX files through pdflatex..."
	$(MAKE) -C $(BUILDDIR)/latex all-pdf
	@echo "pdflatex finished; the PDF files are in $(BUILDDIR)/latex."

epub: install-deps
	$(SPHINXBUILD) -b epub $(SPHINXOPTS) $(SOURCEDIR) $(BUILDDIR)/epub
	@echo
	@echo "Build finished. The epub file is in $(BUILDDIR)/epub."

linkcheck: install-deps
	$(SPHINXBUILD) -b linkcheck $(SPHINXOPTS) $(SOURCEDIR) $(BUILDDIR)/linkcheck
	@echo
	@echo "Link check finished; look for any errors in the above output " \
	      "or in $(BUILDDIR)/linkcheck/output.txt."

spelling: install-deps
	$(SPHINXBUILD) -b spelling $(SPHINXOPTS) $(SOURCEDIR) $(BUILDDIR)/spelling
	@echo
	@echo "Spell check finished; look for any errors in the above output " \
	      "or in $(BUILDDIR)/spelling/output.txt."

# Development targets
dev: install-deps
	$(SPHINXBUILD) -b html $(SPHINXOPTS) $(SOURCEDIR) $(BUILDDIR)/html
	@echo "Development build finished. Open $(BUILDDIR)/html/index.html in your browser."

watch:
	@echo "Watching for changes in documentation..."
	@while true; do \
		make dev > /dev/null 2>&1; \
		sleep 2; \
	done

# ReadTheDocs specific
rtd: install-deps
	$(SPHINXBUILD) -b html $(SPHINXOPTS) $(SOURCEDIR) $(BUILDDIR)/html
	@echo "ReadTheDocs build finished. The HTML pages are in $(BUILDDIR)/html." 