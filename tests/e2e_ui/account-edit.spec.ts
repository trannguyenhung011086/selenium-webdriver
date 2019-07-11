import { Browser, Utils } from "../../common";
import { config } from "../../common/config";
import * as Pages from "../../page_objects";

const browser = new Browser(config.browser);
const page = new Pages.AccountEdit(browser);

import test from "ava";

test.before(async t => {
	const cookie = await new Utils().getLogInCookie();
	await browser.navigate(config.baseUrl);
	await browser.setCokie(cookie);
	await browser.navigate(config.page.accountEdit);
});

test.after.always(async t => {
	await page.resetInfo();
	await browser.close();
});

test("Update full name on " + config.browser, async t => {
	const testName = "Trần Nguyễn Hưng Test";

	await page.inputName(testName);
	await page.update();

	const success = await page.getSuccessText();
	const name = await page.getName();

	t.deepEqual(success, "Thông tin tài khoản của bạn đã được cập nhật.");
	t.deepEqual(name, testName);
});
