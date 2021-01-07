build-ServerlessFunction:

	npx babel --config-file ./babel.config.js --out-dir $(ARTIFACTS_DIR) --source-maps .