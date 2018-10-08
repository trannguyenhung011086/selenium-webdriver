import webdriver from 'selenium-webdriver'
import env from '../common/env'
import Helper from '../common/helper'
import Login from '../page_objects/login.object'
let driver, helper, login;

describe('Log in with invalid credentials', () => {
    beforeAll(async () => {
        driver = await new webdriver.Builder()
            .withCapabilities(env.caps)
            // .usingServer(env.hub)
            .build()
        helper = new Helper(webdriver, driver)
        login = new Login(webdriver, driver)
        await driver.get(env.baseUrl + '/auth/sign-in')
        await helper.set_ema_popup_cookie()
        await driver.navigate().refresh()
    })

    test('Log in with non-existing email', async () => {
        await login.login_via_email('testinvalid@invalid.com', 'testinvalid')
        var error = await login.get_error_text()
        expect(error).toEqual('Email hoặc mật khẩu không đúng. Vui lòng thử lại')
    })

    test('Log in with wrong password', async () => {
        await login.login_via_email('test1234@test.com', '12345678910')
        var error = await login.get_error_text()
        expect(error).toEqual('Email hoặc mật khẩu không đúng. Vui lòng thử lại')
    })

    afterAll(async () => {
        await driver.quit()
    })
})

describe('Log in with valid credentials', () => {
    beforeAll(async () => {
        driver = await new webdriver.Builder()
            .withCapabilities(env.caps)
            // .usingServer(env.hub)
            .build()
        helper = new Helper(webdriver, driver)
        login = new Login(webdriver, driver)
        await driver.get(env.baseUrl + '/auth/sign-in')
        await helper.set_ema_popup_cookie()
        await driver.navigate().refresh()
    })

    test('Log in with existing email', async () => {
        await login.login_via_email('test1234@test.com', '123456789')
        var success = await login.get_success_text()
        expect(success).toMatch(/Chào mừng .+ quay trở lại!/)
    })

    afterAll(async () => {
        await driver.quit()
    })
})