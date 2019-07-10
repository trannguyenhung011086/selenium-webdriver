import { Browser, Page } from "../common";

export class Login extends Page {
	constructor(browser: Browser) {
		super(browser);
	}

	loginBtn = ".button-login";
	cancelBtn = ".button-cancel";
	userNameField = 'input[name="login.username"]';
	passwordField = 'input[name="login.password"]';
	errorMsg = "#login-error-message";

	async inputName() {
		await this.browser.type({ selector: "#full_name", content: "test123" });
	}

	async getErrorText() {
		return this.browser.getText(this.errorMsg);
	}
}
