import { Browser, Utils } from '../../common'
import config from '../../config'
import { AllPages } from '../../page_objects'
let browser: Browser
let pages: AllPages

describe.each(config.browser)('Load product list', (browserName: string) => {
    describe('Run on ' + browserName, () => {
        beforeAll(async () => {
            browser = new Browser(browserName)
            pages = new AllPages(browser)
            await browser.navigate(config.baseUrl + '/vn/subcategories/giay-dep-nam-5b56d3448f0dd7c0480acd25')
            // add cookie
            await browser.setCokie(config.cookieEma)
        })

        test('Lazy load new items', async () => {
            const numOfItems = await pages.productList.getNumItems()
            const filterNum = await pages.productList.getFilterNum()
            expect(numOfItems).toEqual(filterNum)
            const numLazyLoadItems = await pages.productList.getNumLazyLoadItems()
            expect(numLazyLoadItems).toEqual(90)
        })

        afterAll(async () => {
            await browser.close()
        })
    })
})