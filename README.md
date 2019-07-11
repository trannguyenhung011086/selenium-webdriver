# Use Selenium JS for testing web app with AVA framework

**Structure**

-   `common` folder: contain shared methods and config to use in test script
-   `page_objects` folder: contain page object models to use in test script
-   `tests/e2e_ui` folder: contain test script to run with Ava runner

**Instruction**

-   install latest node and npm
-   run `npm install -g chromedriver geckodriver` to add driver to PATH
-   run `npm install -g ava` to add Ava runner to PATH
-   run `npm install` to install required packaged defined at package.json
-   run `npm run test_ui_chrome` to run all tests at `tests/e2e_ui/` on Chrome
-   run `npm run test_ui_firefox` to run all tests at `tests/e2e_ui/` on Firefox
