import {
	Builder,
	ThenableWebDriver,
	By,
	until,
	WebElement,
	IWebDriverCookie
} from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { Options as FirefoxOptions } from "selenium-webdriver/firefox";
import { config } from "./config";

export class Browser {
	private driver: ThenableWebDriver;
	constructor(
		private browserName: string,
		private device: string = "desktop"
	) {
		let chromeOptions = new ChromeOptions();
		chromeOptions.addArguments("--disable-notifications");
		// chromeOptions.headless()
		let firefoxOptions = new FirefoxOptions();

		if (device == "desktop") {
			this.driver = new Builder()
				.withCapabilities({
					browserName: browserName,
					enableVNC: false
				})
				.setChromeOptions(chromeOptions)
				.setFirefoxOptions(firefoxOptions)
				// .usingServer(config.remote)
				.build();
		} else {
			this.driver = new Builder()
				.withCapabilities({
					browserName: browserName,
					enableVNC: false
				})
				.setChromeOptions(
					chromeOptions.setMobileEmulation({ deviceName: device })
				)
				// .usingServer(config.remote)
				.build();
		}
	}

	async navigate(url: string) {
		url = url != config.baseUrl ? config.baseUrl + url : config.baseUrl;
		await this.driver.get(url);
	}

	async close() {
		await this.driver.quit();
	}

	async wait(time: number) {
		await this.driver.sleep(time);
	}

	async findElement(selector: string) {
		var el: WebElement = await this.driver.wait(
			until.elementLocated(By.css(selector)),
			10000
		);
		return el;
	}

	async findElements(selector: string) {
		var els: WebElement[] = await this.driver.wait(
			until.elementsLocated(By.css(selector)),
			10000
		);
		return els;
	}

	async isVisible(selector: string) {
		try {
			await this.findElement(selector);
			return true;
		} catch (e) {
			return false;
		}
	}

	async getText(selector: string) {
		var el = await this.findElement(selector);
		return await el.getText();
	}

	async getAttributeValue({
		selector,
		attribute
	}: {
		selector: string;
		attribute: string;
	}) {
		var el = await this.findElement(selector);
		return await el.getAttribute(attribute);
	}

	async scrollTo(selector: string) {
		var el = await this.findElement(selector);
		await this.driver.executeScript(
			"arguments[0].scrollIntoView(true);",
			el
		);
		await this.driver.wait(until.elementIsVisible(el), 1000);
	}

	async click(selector: string) {
		var el = await this.findElement(selector);
		await el.click();
	}

	async scrollClick(selector: string) {
		await this.scrollTo(selector);
		await this.click(selector);
	}

	async type({ selector, content }: { selector: string; content: string }) {
		var el = await this.findElement(selector);
		await el.clear();
		await el.sendKeys(content);
	}

	async convertCookie(cookie: string) {
		var result: Object = cookie.split("; ").reduce((result, value) => {
			result[value.split("=")[0]] = value.split("=")[1];
			return result;
		}, {});
		return result;
	}

	async setCokie(cookies: string[]) {
		cookies.forEach(async cookie => {
			var cookieToSet = await this.convertCookie(cookie);
			var data: IWebDriverCookie = {
				name: Object.keys(cookieToSet)[0],
				value: cookieToSet[Object.keys(cookieToSet)[0]],
				domain: cookieToSet["domain"],
				path: cookieToSet["path"],
				expiry: new Date(cookieToSet["expires"]).getTime(),
				httpOnly: true,
				secure: true
			};
			await this.driver.manage().addCookie(data);
		});
		await this.driver.navigate().refresh();
	}

	async closeAlert() {
		await this.driver
			.switchTo()
			.alert()
			.dismiss();
	}
}
