let baseUrl: string
let cookieEma: string[]

if (process.env.NODE_ENV == 'testing') {
    baseUrl = 'https://www.testing.leflair.io'
    cookieEma = [
        '_v1EmaticSolutions=%5B%22368ce097-d288-11e8-b5ef-0242ac160003%22%2C1539834310803%5D; Domain=.testing.leflair.io; Path=/; Expires=2020-09-23T10:50:45.000Z',
        '_v1EmaticSolutionsBye=%7B%2215586%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-16%22%2C%22loop%22%3A0%7D%7D%2C%2215589%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-15%22%2C%22loop%22%3A0%7D%7D%2C%2215590%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-16%22%2C%22loop%22%3A0%7D%7D%7D; Domain=.testing.leflair.io; Path=/; Expires=2020-09-15T03:10:32.000Z',
        '_v1EmaticSolutionsEI=%7B%22c_15586_1%22%3A%5B1%2C1539073934509%2C0%5D%2C%22c_15589_2%22%3A%5B1%2C1538991676673%2C0%5D%2C%22c_15590_3%22%3A%5B1%2C1539051620006%2C0%5D%7D; Domain=.testing.leflair.io; Path=/; Expires=2020-09-15T03:10:32.000Z'
    ]
} else if (process.env.NODE_ENV == 'staging') {
    baseUrl = 'https://www.staging.leflair.io'
    cookieEma = [
        '_v1EmaticSolutions=%5B%22ebc6ba2d-cad9-11e8-b5ef-0242ac160003%22%2C1538991480919%2C%5B%22A%22%2C%22T%C3%A0i%20kho%E1%BA%A3n%22%2C1%5D%5D; Domain=.staging.leflair.io; Path=/; Expires=2020-09-23T10:50:45.000Z',
        '_v1EmaticSolutionsBye=%7B%2215586%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-15%22%2C%22loop%22%3A0%7D%7D%2C%2215589%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-15%22%2C%22loop%22%3A0%7D%7D%2C%2215590%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-15%22%2C%22loop%22%3A0%7D%7D%2C%2216371%22%3A%7B%2217262%22%3A%7B%22dont_show_till%22%3A%222018-10-19%22%2C%22loop%22%3A0%7D%7D%2C%2216376%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-26%22%2C%22loop%22%3A0%7D%7D%2C%2216377%22%3A%7B%2217268%22%3A%7B%22dont_show_till%22%3A%222018-10-19%22%2C%22loop%22%3A0%7D%7D%7D; Domain=.staging.leflair.io; Path=/; Expires=2020-09-15T03:10:32.000Z',
        '_v1EmaticSolutionsEI=%7B%22c_15586_1%22%3A%5B1%2C1538989900707%2C0%5D%2C%22c_15589_2%22%3A%5B1%2C1538989797970%2C0%5D%2C%22c_15590_3%22%3A%5B1%2C1538990011889%2C0%5D%2C%22c_16371_1%22%3A%5B0%2C1539923866798%2C0%5D%2C%22c_16376_2%22%3A%5B1%2C1539923871882%2C0%5D%2C%22c_16377_3%22%3A%5B0%2C1539923866880%2C0%5D%7D; Domain=.staging.leflair.io; Path=/; Expires=2020-09-15T03:10:32.000Z'
    ]
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = 'https://www.leflair.vn'
    cookieEma = [
        '_v1EmaticSolutions=%5B%22aa8e9d81-d27f-11e8-b5ef-0242ac160003%22%2C1539846708342%2C%5B%22A%22%2C%22International%22%2C12%2C%22International%22%5D%5D; Domain=.leflair.vn; Path=/; Expires=2020-09-23T10:50:45.000Z',
        '_v1EmaticSolutionsBye=%7B%2215586%22%3A%7B%2216326%22%3A%7B%22dont_show_till%22%3A%222018-10-18%22%2C%22loop%22%3A0%7D%7D%2C%2215589%22%3A%7B%2216348%22%3A%7B%22dont_show_till%22%3A%222018-10-18%22%2C%22loop%22%3A0%7D%7D%2C%2215590%22%3A%7B%2216349%22%3A%7B%22dont_show_till%22%3A%222018-10-18%22%2C%22loop%22%3A0%7D%7D%2C%2216371%22%3A%7B%2217262%22%3A%7B%22dont_show_till%22%3A%222018-10-18%22%2C%22loop%22%3A0%7D%7D%2C%2216376%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-25%22%2C%22loop%22%3A0%7D%7D%2C%2216377%22%3A%7B%2217268%22%3A%7B%22dont_show_till%22%3A%222018-10-18%22%2C%22loop%22%3A0%7D%7D%7D; Domain=.leflair.vn; Path=/; Expires=2020-09-15T03:10:32.000Z',
        '_v1EmaticSolutionsEI=%7B%22c_15586_1%22%3A%5B0%2C1539830640090%2C0%5D%2C%22c_15589_2%22%3A%5B0%2C1539830640146%2C0%5D%2C%22c_15590_3%22%3A%5B0%2C1539830640198%2C0%5D%2C%22c_16371_1%22%3A%5B0%2C1539920765860%2C0%5D%2C%22c_16376_2%22%3A%5B1%2C1539846119273%2C0%5D%2C%22c_16377_3%22%3A%5B0%2C1539920765893%2C0%5D%2C%22416050dba26511e796c00242ac110002-sg4_cartEmpty%22%3A0%7D; Domain=.leflair.vn; Path=/; Expires=2020-09-15T03:10:32.000Z'
    ]
}

const config = {
    baseUrl: baseUrl || 'https://www.testing.leflair.io',
    signin: '/auth/signin',
    register: '/auth/register',
    api: {
        register: '/api/v2/account/signup',
        login: '/api/v2/account/signin',
        logout: '/api/v2/account/signout',
        forgot: '/api/v2/account/forgot',
        password: '/api/v2/account/password',
        account: '/api/v2/account',
        product: '/api/v2/product/'
    },
    testAccount: {
        email: 'test1234@test.com',
        password: '123456789',
        facebook: 'trannguyenhung011086@protonmail.com'
    },
    cookieEma: cookieEma || [
        '_v1EmaticSolutions=%5B%22368ce097-d288-11e8-b5ef-0242ac160003%22%2C1539834310803%5D; Domain=.testing.leflair.io; Path=/; Expires=2020-09-23T10:50:45.000Z',
        '_v1EmaticSolutionsBye=%7B%2215586%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-16%22%2C%22loop%22%3A0%7D%7D%2C%2215589%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-15%22%2C%22loop%22%3A0%7D%7D%2C%2215590%22%3A%7B%22-1%22%3A%7B%22dont_show_till%22%3A%222018-10-16%22%2C%22loop%22%3A0%7D%7D%7D; Domain=.testing.leflair.io; Path=/; Expires=2020-09-15T03:10:32.000Z',
        '_v1EmaticSolutionsEI=%7B%22c_15586_1%22%3A%5B1%2C1539073934509%2C0%5D%2C%22c_15589_2%22%3A%5B1%2C1538991676673%2C0%5D%2C%22c_15590_3%22%3A%5B1%2C1539051620006%2C0%5D%7D; Domain=.testing.leflair.io; Path=/; Expires=2020-09-15T03:10:32.000Z'
    ],
    remote: process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444/wd/hub',
    browser: process.env.SELENIUM_BROWSER || 'chrome',
    device: process.env.DEVICE || 'iPhone 6'
}

export default config