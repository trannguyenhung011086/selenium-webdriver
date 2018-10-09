const config = {
    baseUrl: process.env.BASE_URL || 'https://www.testing.leflair.io',
    domain: '.testing.leflair.io',
    signin: '/auth/signin',
    register: '/auth/register',
    cookieEma: [
        '_v1EmaticSolutions=%5B%224b959189-cade-11e8-b5ef-0242ac160003%22%2C1538991673639%5D; Domain=.testing.leflair.io; Path=/; Expires=2020-09-15T03:10:32.000Z',
        '_v1EmaticSolutionsBye=%7B%2215586%22%3A%7B%2216326%22%3A%7B%22dont_show_till%22%3A%222018-10-08%22%2C%22loop%22%3A0%7D%7D%2C%2215589%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-15%22%2C%22loop%22%3A0%7D%7D%2C%2215590%22%3A%7B%2216349%22%3A%7B%22dont_show_till%22%3A%222018-10-08%22%2C%22loop%22%3A0%7D%7D%7D; Domain=.testing.leflair.io; Path=/; Expires=2020-09-15T03:10:32.000Z',
        '_v1EmaticSolutionsEI=%7B%22c_15586_1%22%3A%5B0%2C1538991673650%2C0%5D%2C%22c_15589_2%22%3A%5B1%2C1538991676673%2C0%5D%2C%22c_15590_3%22%3A%5B0%2C1538991673667%2C0%5D%7D; Domain=.testing.leflair.io; Path=/; Expires=2020-09-15T03:10:32.000Z'
    ],
    hub: 'http://localhost:4444/wd/hub',
    browser: 'chrome'
}

export default config