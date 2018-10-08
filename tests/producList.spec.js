import webdriver from 'selenium-webdriver'
import env from '../common/env'
import Helper from '../common/helper'
import ProductList from '../page_objects/productList.object'
let driver, helper, productList;

describe('Load product list', () => {
    beforeAll(async () => {
        driver = await new webdriver.Builder()
            .withCapabilities(env.caps)
            // .usingServer(env.hub)
            .build()
        helper = new Helper(webdriver, driver)
        productList = new ProductList(webdriver, driver)
        await driver.get(env.baseUrl + '/vn/subcategories/giay-dep-nam-5b56d3448f0dd7c0480acd25')
        await helper.set_ema_popup_cookie()
        await driver.navigate().refresh()
    })

    test('Lazy load new items', async () => {
        const numOfItems = await productList.get_num_of_items()
        const filterNum = await productList.get_filter_num()
        expect(numOfItems).toEqual(filterNum)
        const numWithLazyLoadedItems = await productList.get_num_lazy_loaded_items()
        expect(numWithLazyLoadedItems).toEqual(90)
    })

    afterAll(async () => {
        await driver.quit()
    })
})