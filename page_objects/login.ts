import { Browser, Page } from "../common";

export default class Login extends Page {
    constructor(browser: Browser) {
        super(browser);
    }
    public loginBtn = ".button-login";
    public cancelBtn = ".button-cancel";
    public userNameField = 'input[name="login.username"]';
    public passwordField = 'input[name="login.password"]';
    public errorMsg = "#login-error-message";

    public async submitWithEmail(email: string, password: string) {
        await this.browser.click(this.loginBtn);
        await this.browser.type(this.userNameField, email);
        await this.browser.type(this.passwordField, password);
        await this.browser.click(this.loginBtn);
    }

    async getErrorText() {
        return this.browser.getText(this.errorMsg);
    }
}
