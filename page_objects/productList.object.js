import Helper from '../common/helper'

export default class ProductList extends Helper {
    constructor(webdriver, driver) {
        super(webdriver, driver)
        this.webdriver = webdriver
        this.driver = driver
        this.productList = '.jsx-3127949077.row'
        this.productNum = 'span[class="jsx-3069017056"]'
    }

    async get_filter_num() {
        var text = await super.get_text(this.productNum)
        return parseInt(text.split(' ')[0])
    }

    async get_num_of_items() {
        var els = await super.find_elements_by_css(`${this.productList} > *`)
        return els.length
    }

    async get_num_lazy_loaded_items() {
        await super.scroll_to_element('#footer')
        await super.find_element_by_css(`${this.productList} > div:nth-child(90)`)
        return await this.get_filter_num()
    }

    async get_product_info(index) {
        await super.find_element_by_css(`${this.productList}`)
        let url = super.get_attribute_value(`${this.productList} > div:nth-child(${index}) > a`, 'href')
        let brand = super.get_text(`${this.productList} > div:nth-child(${index}) > * .brand`)
        let title = super.get_text(`${this.productList} > div:nth-child(${index}) > * .title`)
        let retailPrice = super.get_text(`${this.productList} > div:nth-child(${index}) > * .retailPrice`)
        retailPrice = parseInt(retailPrice.replace(/\.|₫/g, ''))
        let salePrice = super.get_text(`${this.productList} > div:nth-child(${index}) > * .salePrice`)
        salePrice = parseInt(salePrice.replace(/\.|₫/g, ''))
        return {
            url: url,
            brand: brand,
            title: title,
            retailPrice: retailPrice,
            salePrice: salePrice
        }
    }
}