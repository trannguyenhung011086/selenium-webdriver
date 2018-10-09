import { Browser, Page } from '../common'

export default class Header extends Page {
    constructor(browser: Browser) {
        super(browser)
    }

    public switchLanguage = '.dropdown-button.switch-language'
    public switchVN = `${this.switchLanguage} > .content > .dropdown-item:nth-child(1)`
    public switchEN = `${this.switchLanguage} > .content > .dropdown-item:nth-child(2)`
    public accountMenu = '.dropdown-button:nth-child(3)'
    public accountSetting = `${this.accountMenu} > .content > div > a:nth-child(1)`
    public orderManage = `${this.accountMenu} > .content > div > a:nth-child(2)`
    public addressManage = `${this.accountMenu} > .content > div > a:nth-child(3)`
    public cardManage = `${this.accountMenu} > .content > div > a:nth-child(4)`
    public logOutBtn = `${this.accountMenu} > .content > div > div`
    public logInBtn = '.nav-bar-link:nth-child(2)'
    public registerBtn = '.nav-bar-link:nth-child(3)'

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

    public async logOut() {
        await this.browser.click(this.accountMenu)
        await this.browser.click(this.logOutBtn)
    }
}