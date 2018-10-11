import config from '../../config'
import { Utils } from '../../common'
let request = new Utils()
import * as faker from 'faker'

describe('Login API', () => {

    test.each([[faker.internet.email(), faker.internet.password()],
    ['test1234@mail.com', faker.internet.password()],
    ['trannguyenhung011086@gmail.com', faker.internet.password()]])
        ('POST / invalid credentials: %s %s', async (email: string, password: string) => {
            let response = await request.makePost(config.api.login,
                {
                    "email": email, "password": password
                })
            expect(response.status).toEqual(401)
            expect(response.data.message).toEqual('EMAIL_PASSWORD_INCORRECT')
        })

    test('POST / Missing email field', async () => {
        let response = await request.makePost(config.api.login,
            {
                "password": faker.internet.password()
            })
        expect(response.status).toEqual(401)
        expect(response.data.message).toEqual('EMAIL_PASSWORD_INCORRECT')
    })

    test('POST / Missing password field', async () => {
        let response = await request.makePost(config.api.login,
            {
                "email": faker.internet.email()
            })
        expect(response.status).toEqual(401)
        expect(response.data.message).toEqual('EMAIL_PASSWORD_INCORRECT')
    })

    test('POST / empty email and password', async () => {
        let response = await request.makePost(config.api.login,
            {
                "email": "", "password": ""
            })
        expect(response.status).toEqual(401)
        expect(response.data.message).toEqual('EMAIL_PASSWORD_INCORRECT')
    })

    test('POST / correct email and password', async () => {
        let response = await request.makePost(config.api.login,
            {
                "email": "test1234@mail.com", "password": "123456789"
            })
        expect(response.status).toEqual(200)
        expect(response.data.email).toEqual('test1234@mail.com')
        expect(response.data.provider).toEqual('local')
        expect(response.data.state).toEqual('confirmed')
    })

    test('GET / log out', async () => {
        let cookie = await request.getLogInCookie()
        let response = await request.makeGet(config.api.logout, cookie)
        expect(response.status).toEqual(200)
        expect(response.data.message).toEqual('SIGNED_OUT_SUCCESSFUL')
    })
})