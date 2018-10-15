import { Builder, ThenableWebDriver, By, until, WebElement, IWebDriverCookie } from 'selenium-webdriver'
import config from '../config/config'
import { Options as ChromeOptions } from 'selenium-webdriver/chrome'
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox'

export class Browser {

    private driver: ThenableWebDriver;
    public constructor(private browserName: string) {
        this.driver = new Builder()
            .withCapabilities({
                "browserName": browserName,
                "enableVNC": true
            })
            // .setChromeOptions(new ChromeOptions().setMobileEmulation({ deviceName: 'iPhone 6' }))
            // .setChromeOptions(new ChromeOptions().headless())
            // .setFirefoxOptions(new FirefoxOptions().headless())
            .usingServer(config.hub)
            .build()
    }

    public async navigate(url: string) {
        await this.driver.get(url)
    }

    public async close() {
        await this.driver.quit()
    }

    public async findElement(selector: string) {
        var el: WebElement
        try {
            el = await this.driver.wait(until.elementLocated(By.css(selector)))
            return el
        } catch {
            try {
                el = await this.driver.wait(until.elementLocated(By.xpath(selector)))
                return el
            }
            catch (error) {
                throw error
            }
        }
    }

    public async findElements(selector: string) {
        var els: WebElement[]
        try {
            els = await this.driver.wait(until.elementsLocated(By.css(selector)))
            return els
        } catch {
            try {
                els = await this.driver.wait(until.elementsLocated(By.xpath(selector)))
                return els
            }
            catch (error) {
                throw error
            }
        }
    }

    public async isVisible(selector: string) {
        var el = await this.findElement(selector)
        return await this.driver.wait(until.elementIsVisible(el)).isDisplayed()
    }

    public async getText(selector: string) {
        var el = await this.findElement(selector)
        return await el.getText()
    }

    public async getAttribute(selector: string, attribute: string) {
        var el = await this.findElement(selector)
        return await el.getAttribute(attribute)
    }

    public async scrollTo(selector: string) {
        var el = await this.findElement(selector)
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", el)
    }

    public async click(selector: string) {
        var el = await this.findElement(selector)
        await el.click()
    }

    public async type(selector: string, content: string) {
        var el = await this.findElement(selector)
        await el.clear()
        await el.sendKeys(content)
    }

    public async convertCookie(cookie: string) {
        var result: Object = cookie.split('; ').reduce((result, value) => {
            result[value.split('=')[0]] = value.split('=')[1]
            return result
        }, {})
        return result
    }

    public async setCokie(cookies: string[]) {
        cookies.forEach(async (cookie) => {
            var cookieToSet = await this.convertCookie(cookie)
            var data: IWebDriverCookie = {
                name: Object.keys(cookieToSet)[0],
                value: cookieToSet[Object.keys(cookieToSet)[0]],
                domain: cookieToSet['Domain'],
                path: cookieToSet['Path'],
                expiry: new Date(cookieToSet['Expires']).getTime(),
                httpOnly: true,
                secure: true
            }
            await this.driver.manage().addCookie(data)
        })
        await this.driver.navigate().refresh()
    }
}