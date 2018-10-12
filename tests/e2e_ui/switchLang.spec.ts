import { Browser } from '../../common'
import config from '../../config'
import { AllPages } from '../../page_objects'
let browser: Browser
let pages: AllPages

describe.each(config.browser)('Switch language', (browserName: string) => {
    describe('Run on ' + browserName, () => {
        beforeAll(async () => {
            browser = new Browser(browserName)
            pages = new AllPages(browser)
            await browser.navigate(config.baseUrl)
            await browser.setCokie(config.cookieEma)
        })
    
        test('Switch to English', async() => {
            await pages.header.switchToEn()
            var active = await pages.header.getLangActive()
            expect(active).toEqual('En')
        })
    
        test('Switch to Vietnamese', async() => {
            await pages.header.switchToVn()
            var active = await pages.header.getLangActive()
            expect(active).toEqual('Vn')
        })
    
        afterAll(async () => {
            await browser.close()
        })
    })
})