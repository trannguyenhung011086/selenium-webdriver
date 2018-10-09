import { Browser } from '../common'
import config from '../config'
import { AllPages } from '../page_objects'
let browser: Browser
let pages: AllPages

describe('Log in with invalid credentials', () => {
    beforeAll(async () => {
        browser = new Browser(config.browser)
        pages = new AllPages(browser)
        await browser.navigate(config.baseUrl + config.signin)
        // add cookie
        await browser.setCokie(config.cookieEma)
    })

    test('Log in with non-existing email', async () => {
        await pages.login.submitWithEmail('testinvalid@invalid.com', 'testinvalid')
        var error = await pages.login.getErrorText()
        expect(error).toEqual('Email hoặc mật khẩu không đúng. Vui lòng thử lại')
    })

    test('Log in with wrong password', async () => {
        await pages.login.submitWithEmail('test1234@test.com', '12345678910')
        var error = await pages.login.getErrorText()
        expect(error).toEqual('Email hoặc mật khẩu không đúng. Vui lòng thử lại')
    })

    afterAll(async () => {
        await browser.close()
    })
})

describe.only('Log in with valid credentials', () => {
    beforeAll(async () => {
        browser = new Browser(config.browser)
        pages = new AllPages(browser)
        await browser.navigate(config.baseUrl + config.signin)
        // add cookie
        await browser.setCokie(config.cookieEma)
    })

    test('Log in with existing email', async () => {
        await pages.login.submitWithEmail('test1234@test.com', '123456789')
        var success = await pages.login.getSuccessText()
        expect(success).toMatch(/Chào mừng .+ quay trở lại!/)
    })

    test('Log out successfully', async() => {
        await pages.header.logOut()
        expect(await browser.isVisible(pages.header.registerBtn)).toBe(true)
    })

    afterAll(async () => {
        await browser.close()
    })
})