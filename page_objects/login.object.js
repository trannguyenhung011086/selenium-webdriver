import Helper from '../common/helper'

export default class Login extends Helper {
    constructor(webdriver, driver) {
        super(webdriver, driver)
        this.webdriver = webdriver
        this.driver = driver
        this.emailField = '#email'
        this.passwordField = '#password'
        this.submitBtn = 'button[type="submit"]'
        this.errorMsg = '.alert-danger'
        this.accountMenu = 'div[data-dd-menu-trigger="true"]'
        this.successNotify = '.jsx-509117281.welcome-back-notify'
    }

    async login_via_email(email, password) {
        var el = await super.find_element_by_css(this.emailField)
        await el.clear()
        await el.sendKeys(email)

        el = await super.find_element_by_css(this.passwordField)
        await el.clear()
        await el.sendKeys(password)

        el = await super.find_element_by_css(this.submitBtn)
        await el.click()
    }

    async get_error_text() {
        return super.get_text(this.errorMsg)
    }

    async get_success_text() {
        return super.get_text(this.successNotify)
    }
}