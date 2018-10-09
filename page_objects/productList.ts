import { Browser, Page } from '../common'

export default class ProductList extends Page {
    constructor(browser: Browser) {
        super(browser)
    }

    public productList = '.jsx-3127949077.row'
    public productNum = 'span[class="jsx-3069017056"]'

    public async getFilterNum() {
        var text = await this.browser.getText(this.productNum)
        return parseInt(text.split(' ')[0])
    }

    async getNumItems() {
        var els = await this.browser.findElements(`${this.productList} > *`)
        return els.length
    }

    async getNumLazyLoadItems() {
        await this.browser.scrollTo('#footer')
        await this.browser.findElement(`${this.productList} > div:nth-child(90)`)
        return await this.getFilterNum()
    }

    async getProductInfo(index) {
        await this.browser.findElement(this.productList)
        let url = await this.browser.getAttribute(`${this.productList} > div:nth-child(${index}) > a`, 'href')
        let brand = await this.browser.getText(`${this.productList} > div:nth-child(${index}) > * .brand`)
        let title = await this.browser.getText(`${this.productList} > div:nth-child(${index}) > * .title`)
        let retailPrice = await this.browser.getText(`${this.productList} > div:nth-child(${index}) > * .retailPrice`)
        let parsedRetailPrice = parseInt(retailPrice.replace(/\.|₫/g, ''))
        let salePrice = await this.browser.getText(`${this.productList} > div:nth-child(${index}) > * .salePrice`)
        let parsedSalePrice = parseInt(salePrice.replace(/\.|₫/g, ''))
        let info: Object = {
            url: url,
            brand: brand,
            title: title,
            retailPrice: parsedRetailPrice,
            salePrice: parsedSalePrice
        }
        return info
    }
}