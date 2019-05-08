# Use Selenium JS for testing web app

**Structure**

-   `common` folder: contain shared methods and config to use in test script
-   `page_objects` folder: contain page object models to use in test script
-   `tests/e2e_ui` folder: contain test script to run with Jest runner

**Instruction**

-   install latest node and yarn or npm
-   run `yarn install` or `npm install` to install required packaged defined at package.json
-   run `yarn run test_ui_chrome` to run all tests at `tests/e2e_ui/` on Chrome
-   run `yarn run test_ui_firefox` to run all tests at `tests/e2e_ui/` on Firefox
