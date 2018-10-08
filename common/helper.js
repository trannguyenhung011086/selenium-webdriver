require('es6-promise').polyfill()
require('isomorphic-fetch')
import env from '../common/env'

export default class Helper {
    constructor(webdriver, driver) {
        this.webdriver = webdriver
        this.driver = driver
        this.until = this.webdriver.until
        this.By = this.webdriver.By
    }

    async login_via_api() {
        const settings = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test1234@test.com',
                password: '123456789'
            })
        }
        const cookie = await fetch(env.baseUrl + '/api/v2/account/signin', settings)
            .then(response => {
                return response.headers.get('set-cookie')
            })
            .catch(e => {
                return e
            })
        return cookie
    }

    async convert_cookie(cookie) {
        return cookie.split('; ').reduce((result, value) => {
            result[value.split('=')[0]] = value.split('=')[1]
            return result
        }, {})
    }

    async set_cookie(cookie) {
        const setCookie = {
            name: 'connect.sid',
            value: cookie['connect.sid'],
            domain: cookie['Domain'],
            path: '/',
            exipry: new Date(cookie['Expires']).getTime(),
            httpOnly: true,
            secure: true
        }        
        await this.driver.manage().addCookie(setCookie)
    }

    async set_ema_popup_cookie() {
        const cookie1 = {
            name: '_v1EmaticSolutions',
            value: '%5B%22417d03f6-caa6-11e8-b5ef-0242ac160003%22%2C1538968232852%2C%5B%22BUTTON%22%2C%22%C4%90%C4%83ng%20nh%E1%BA%ADp%22%2C4%5D%5D',
            domain: env.domain,
            path: '/',
            exipry: new Date('2020-09-15T03:10:32.000Z').getTime(),
            httpOnly: false,
            secure: false
        }      
        const cookie2 = {
            name: '_v1EmaticSolutionsBye',
            value: '%7B%2215586%22%3A%7B%2216326%22%3A%7B%22dont_show_till%22%3A%222018-10-08%22%2C%22loop%22%3A0%7D%7D%2C%2215589%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-15%22%2C%22loop%22%3A0%7D%7D%2C%2215590%22%3A%7B%2216349%22%3A%7B%22dont_show_till%22%3A%222018-10-08%22%2C%22loop%22%3A0%7D%7D%7D',
            domain: env.domain,
            path: '/',
            exipry: new Date('2020-09-15T03:00:08.000Z').getTime(),
            httpOnly: false,
            secure: false
        }   
        const cookie3 = {
            name: '_v1EmaticSolutionsEI',
            value: '%7B%22c_15586_1%22%3A%5B0%2C1538967605509%2C0%5D%2C%22c_15589_2%22%3A%5B1%2C1538967608573%2C0%5D%2C%22c_15590_3%22%3A%5B0%2C1538967605571%2C0%5D%7D',
            domain: env.domain,
            path: '/',
            exipry: new Date('2020-09-15T03:00:08.000Z').getTime(),
            httpOnly: false,
            secure: false
        }     
        await this.driver.manage().addCookie(cookie1)
        await this.driver.manage().addCookie(cookie2)
        await this.driver.manage().addCookie(cookie3)
    }

    async find_element_by_css(selector) {
        var el = await this.driver.wait(this.until.elementLocated(this.By.css(selector)))
        return el
    }

    async find_elements_by_css(selector) {
        var els = await this.driver.wait(this.until.elementsLocated(this.By.css(selector)))
        return els
    }

    async get_text(selector) {
        var el = await this.find_element_by_css(selector)
        return await el.getText()
    }

    async get_attribute_value(selector, attribute) {
        var el = await this.find_element_by_css(selector)
        return await el.getAttribute(attribute)
    }

    async scroll_to_element(selector) {
        var el = await this.find_element_by_css(selector)
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", el)
    }
}