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

test.serial("Update full name", async t => {
	const testName = "Trần Nguyễn Hưng Test";

	await page.inputName(testName);
	await page.update();

	const success = await page.getSuccessText();
	const name = await page.getName();

	t.deepEqual(success, "Thông tin tài khoản của bạn đã được cập nhật.");
	t.deepEqual(name, testName);
});

test.serial("Update gender", async t => {
	const testGender = "female";

	await page.selectGender(testGender);
	await page.update();

	const success = await page.getSuccessText();
	const gender = await page.getGender();

	t.deepEqual(success, "Thông tin tài khoản của bạn đã được cập nhật.");
	t.deepEqual(gender, testGender);
});

test.serial("Update new password", async t => {
	await page.enableChangePassword();

	await page.changePassword({
		newPassword: "0944226282",
		oldPassword: "0944226282",
		reNewPassword: "0944226282"
	});
	await page.update();

	const success = await page.getSuccessText();
	t.deepEqual(success, "Thông tin tài khoản của bạn đã được cập nhật.");
});

test.serial("Cannot update new password with wrong old password", async t => {
	await page.enableChangePassword();

	await page.changePassword({
		newPassword: "123456789",
		oldPassword: "12345678",
		reNewPassword: "123456789"
	});
	await page.update();

	const fail = await page.getFailText();
	const passwordHelper = await page.getPasswordHelper();

	t.deepEqual(fail, "Cập nhật tài khoản không thành công");
	t.deepEqual(passwordHelper.old, "Mật khẩu không chính xác");
});

test.serial(
	"Cannot update new password when not match confirmation",
	async t => {
		await page.enableChangePassword();

		await page.changePassword({
			newPassword: "123456789",
			oldPassword: "0944226282",
			reNewPassword: "12345678"
		});
		await page.update();

		const fail = await page.getFailText();
		const passwordHelper = await page.getPasswordHelper();

		t.deepEqual(fail, "Cập nhật tài khoản không thành công");
		t.deepEqual(passwordHelper.reNew, "Mật khẩu không trùng khớp");
	}
);
