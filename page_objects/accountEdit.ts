import { Browser, Page } from "../common";

export class AccountEdit extends Page {
	constructor(browser: Browser) {
		super(browser);
	}

	fullNameField = "input#full_name.form-control";
	updateBtn = "button.btn.btn-info.btn-block.btn-update";
	successAlert = "div.alert.alert-success";

	async inputName(content: string) {
		await this.browser.type({ selector: this.fullNameField, content });
	}

	async update() {
		await this.browser.click(this.updateBtn);
	}

	async getSuccessText() {
		return await this.browser.getText(this.successAlert);
	}

	async getName() {
		return await this.browser.getAttributeValue({
			selector: this.fullNameField,
			attribute: "value"
		});
	}

	async resetInfo() {
		await this.inputName("Trần Nguyễn Hưng");
		await this.update();
		if (
			(await this.getSuccessText()) !=
			"Thông tin tài khoản của bạn đã được cập nhật."
		) {
			console.log("Cannot reset info");
		}
	}
}
