import config from '../config'
require('es6-promise').polyfill()
let fetch = require('isomorphic-fetch')
export class Utils {

    public async loginRequest() {
        const settings: Object = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test1234@test.com',
                password: '123456789'
            })
        }
        const cookie: string = await fetch(config.baseUrl + '/api/v2/account/signin', settings)
            .then(response => {
                return response.headers.get('set-cookie')
            })
            .catch(e => {
                return e
            })
        return cookie
    }
}