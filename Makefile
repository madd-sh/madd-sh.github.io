HUGO ?= hugo
NODE ?= node

.PHONY: build test check preview install-hugo social

build:
	@test "$$($(HUGO) version | cut -d ' ' -f 2 | cut -d '+' -f 1 | cut -d '-' -f 1)" = "v$$(cat .hugo-version)" || { echo 'Use the Hugo version in .hugo-version (make install-hugo).'; exit 1; }
	$(HUGO) --gc --minify --cleanDestinationDir

test:
	$(NODE) test/site.mjs

check: build test

preview:
	$(HUGO) server --bind 127.0.0.1 --disableFastRender

install-hugo:
	bash scripts/install-hugo.sh

social:
	$(NODE) scripts/render-social.mjs
