import { Browser, Page } from "../common";

export class AccountEdit extends Page {
	constructor(browser: Browser) {
		super(browser);
	}

	fullNameField = "input#full_name.form-control";
	maleRadio = "input#gender_male.gender";
	femaleRadio = "input#gender_female.gender";
	passwordCheck = "#is_change_pass";
	passwordGroup = "div.password-group";
	oldPasswordField = "input#old_password.form-control";
	newPasswordField = "input#new_password.form-control";
	reNewPasswordField = "input#re_new_password.form-control";
	oldPasswordHelper =
		".password-group > .form-group:nth-child(1) > div > .help-block";
	newPasswordHelper =
		".password-group > .form-group:nth-child(2) > div > .help-block";
	reNewPasswordHelper =
		".password-group > .form-group:nth-child(3) > div > .help-block";
	updateBtn = "button.btn.btn-info.btn-block.btn-update";
	successAlert = "div.alert.alert-success";
	failAlert = "div.alert.alert-danger";

	async inputName(content: string) {
		await this.browser.type({ selector: this.fullNameField, content });
	}

	async selectGender(gender: string) {
		if (gender == "male") {
			await this.browser.click(this.maleRadio);
		} else {
			await this.browser.click(this.femaleRadio);
		}
	}

	async update() {
		await this.browser.click(this.updateBtn);
	}

	async getSuccessText() {
		return await this.browser.getText(this.successAlert);
	}

	async getFailText() {
		return await this.browser.getText(this.failAlert);
	}

	async getName() {
		return await this.browser.getAttributeValue({
			selector: this.fullNameField,
			attribute: "value"
		});
	}

	async getGender() {
		const male = await this.browser.getAttributeValue({
			selector: this.maleRadio,
			attribute: "checked"
		});
		const female = await this.browser.getAttributeValue({
			selector: this.femaleRadio,
			attribute: "checked"
		});
		if (male) return "male";
		if (female) return "female";
	}

	async enableChangePassword() {
		const check = await this.browser.waitVisible(this.passwordGroup, 1000);
		if (!check) await this.browser.click(this.passwordCheck);
	}

	async disableChangePassword() {
		const check = await this.browser.waitVisible(this.passwordGroup, 1000);
		if (check) await this.browser.click(this.passwordCheck);
	}

	async changePassword({
		newPassword,
		oldPassword,
		reNewPassword
	}: {
		newPassword: string;
		oldPassword: string;
		reNewPassword: string;
	}) {
		await this.browser.type({
			selector: this.oldPasswordField,
			content: oldPassword
		});
		await this.browser.type({
			selector: this.newPasswordField,
			content: newPassword
		});
		await this.browser.type({
			selector: this.reNewPasswordField,
			content: reNewPassword
		});
	}

	async getPasswordHelper() {
		return {
			old: await this.browser.getText(this.oldPasswordHelper),
			new: await this.browser.getText(this.newPasswordHelper),
			reNew: await this.browser.getText(this.reNewPasswordHelper)
		};
	}

	async resetInfo() {
		await this.inputName("Trần Nguyễn Hưng");
		await this.selectGender("male");
		await this.disableChangePassword();
		await this.update();
		if (
			(await this.getSuccessText()) !=
			"Thông tin tài khoản của bạn đã được cập nhật."
		) {
			console.log("Cannot reset info");
		}
	}
}
