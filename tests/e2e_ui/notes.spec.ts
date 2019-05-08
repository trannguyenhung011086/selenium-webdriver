import { Browser } from "../../common";
import config from "../../config/config";
import { AllPages } from "../../page_objects";
let browser: Browser;
let pages: AllPages;

describe("Verify add notes on " + config.browser, () => {
    beforeAll(async () => {
        browser = new Browser(config.browser);
        pages = new AllPages(browser);
        await browser.navigate(config.baseUrl);

        await pages.login.submitWithEmail(
            config.testAccount.email,
            config.testAccount.password
        );
        var title = await pages.notes.getTitle();
        expect(title).toEqual("My Notes");
    });

    test("Add empty note", async () => {
        await pages.notes.addNote("", "");
        var error = await pages.notes.getError();
        expect(error).toEqual("Title should not be empty");
    });

    test("Add valid note", async () => {
        const title = "testing tile";
        const desc = "testing description";
        await pages.notes.addNote(title, desc);
        var els = await pages.notes.getNotes();
        expect(els).toContain(title);
        expect(els).toContain(desc);
    });

    afterAll(async () => {
        await browser.close();
    });
});
