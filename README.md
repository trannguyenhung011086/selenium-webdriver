## E2E UI testing
Use selenium-webdriver (typescript) and jest framework to test web app

Structure:
- common: store common class and methods
- page_objects: prepare page object with common library to use in Selenium test cases
- tests/e2e_ui: Selenium test cases run with Chrome then Firefox in sequence

## E2E API testing
Use axios http request libray and jest framework to test APIs

Structure:
- common/utils: store GET/POST/PUT/DELETE class
- e2e_api: API test cases

## Reporter
Use jest-junit reporter to export test result to report folder
*Note*: to use with CI, run `jest --ci --reporters=default --reporters=jest-junit`