import { Browser, Utils } from "../../common";
import { config } from "../../common/config";
import * as Pages from "../../page_objects";

const browser = new Browser(config.browser);
const page = new Pages.Login(browser);

import test from "ava";

test.before(async t => {
	const cookie = await new Utils().getLogInCookie();
	await browser.navigate(config.baseUrl);
	await browser.setCokie(cookie);
	await browser.navigate(config.page.accountEdit);
});

test.after(async t => {
	await browser.close();
});

test("Test on " + config.browser, async t => {
	await page.inputName();
	await browser.wait(10000);
	await t.pass();
});
