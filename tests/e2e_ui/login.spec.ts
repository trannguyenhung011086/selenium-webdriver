import { Browser } from "../../common";
import config from "../../config/config";
import { AllPages } from "../../page_objects";
let browser: Browser;
let pages: AllPages;
import * as faker from "faker";

describe("Verify log in on " + config.browser, () => {
    beforeAll(async () => {
        browser = new Browser(config.browser);
        pages = new AllPages(browser);
        await browser.navigate(config.baseUrl);
    });

    test("Use empty email and password", async () => {
        await pages.login.submitWithEmail("", "");
        var error = await pages.login.getErrorText();
        expect(error).toEqual("The username or password are incorrect");
    });

    test.each([
        [faker.internet.email(), faker.internet.password()],
        [config.testAccount.email, faker.internet.password()]
    ])(
        "Use invalid credentials: %s %s",
        async (email: string, password: string) => {
            await pages.login.submitWithEmail(email, password);
            var error = await pages.login.getErrorText();
            expect(error).toEqual("The username or password are incorrect");
        }
    );

    test("Use valid email and password", async () => {
        await pages.login.submitWithEmail(
            config.testAccount.email,
            config.testAccount.password
        );
        var title = await pages.notes.getTitle();
        expect(title).toEqual("My Notes");
    });

    afterAll(async () => {
        await browser.close();
    });
});
