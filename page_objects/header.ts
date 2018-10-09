import { Browser, Page } from '../common'

export default class Header extends Page {
    constructor(browser: Browser) {
        super(browser)
    }

    public switchLanguage = '.dropdown-button.switch-language'
    public switchVN = `${this.switchLanguage} > .content > .dropdown-item:nth-child(1)`
    public switchEN = `${this.switchLanguage} > .content > .dropdown-item:nth-child(2)`

    public async getLangActive() {
        return await this.browser.getText(`${this.switchLanguage} > div`)
    }

    public async switchToVn() {
        await this.browser.click(this.switchLanguage)
        await this.browser.click(this.switchVN)
    }

    public async switchToEn() {
        await this.browser.click(this.switchLanguage)
        await this.browser.click(this.switchEN)
    }
}