import config from '../../config'
import { Utils } from '../../common'
let request = new Utils()

describe('Login API', () => {

    test('GET / product list', async () => {

    })

    test('GET / product info', async () => {
        let response = await request.makeGet(config.api.product + '5b0fd3bf1e73c50001f6fced')
        expect(response.status).toEqual(200)
        expect(response.data.id).toEqual('5b0fd3bf1e73c50001f6fced')
        console.log(response.data)
    })
})