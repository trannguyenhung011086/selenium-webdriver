import { Browser } from '../../common'
import config from '../../config'
import { AllPages } from '../../page_objects'
let browser: Browser
let pages: AllPages
import * as faker from 'faker'

describe.each(config.browser)('Log in failed', (browserName: string) => {
    describe('Run on ' + browserName, () => {
        beforeAll(async () => {
            browser = new Browser(browserName)
            pages = new AllPages(browser)
            await browser.navigate(config.baseUrl + config.signin)
            // add cookie
            await browser.setCokie(config.cookieEma)
        })

        test.each([[faker.internet.email(), faker.internet.password()],
        ['test1234@mail.com', faker.internet.password()],
        ['trannguyenhung011086@gmail.com', faker.internet.password()]])
            ('Use invalid credentials: %s %s', async (email: string, password: string) => {
                await pages.login.submitWithEmail(email, password)
                var error = await pages.login.getErrorText()
                expect(error).toEqual('Email hoặc mật khẩu không đúng. Vui lòng thử lại')
            })

        test('Use empty email and password', async () => {
            await pages.login.submitWithEmail('', '')
            var error = await pages.login.getEmailError()
            expect(error).toEqual('Vui lòng nhập email.')
            error = await pages.login.getPasswordError()
            expect(error).toEqual('Vui lòng nhập password.')
        })

        afterAll(async () => {
            await browser.close()
        })
    })
})

describe.each(config.browser)('Log in successfully', (browserName: string) => {
    describe('Run on ' + browserName, () => {
        beforeAll(async () => {
            browser = new Browser(browserName)
            pages = new AllPages(browser)
            await browser.navigate(config.baseUrl + config.signin)
            // add cookie
            await browser.setCokie(config.cookieEma)
        })

        test('Log in with existing email', async () => {
            await pages.login.submitWithEmail('test1234@mail.com', '123456789')
            var success = await pages.login.getSuccessText()
            expect(success).toMatch(/Chào mừng .+ quay trở lại!/)
        })

        test('Log out successfully', async () => {
            await pages.header.logOut()
            expect(await browser.isVisible(pages.header.registerBtn)).toBe(true)
        })

        afterAll(async () => {
            await browser.close()
        })
    })
})