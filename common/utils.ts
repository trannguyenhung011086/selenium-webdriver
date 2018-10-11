import config from '../config'
import axios, { AxiosRequestConfig } from 'axios'

export class Utils {

    public async getLogInCookie() {
        const settings: AxiosRequestConfig = {
            baseURL: config.baseUrl,
            withCredentials: true,
            headers: {
                'Content-type': 'application/json'
            },
            validateStatus: (status) => {
                return true
            }
        }
        const data: Object = {
            email: 'test1234@test.com',
            password: '123456789'
        }
        const cookie: string = await axios.post('/api/v2/account/signin', data, settings)
            .then(response => {
                return response.headers['set-cookie'][0]
            })
        return cookie
    }

    public async makePost(api: string, data: Object, cookie: string=null) {
        let headers: Object = {
            'Content-type': 'application/json'
        }
        if (cookie) {
            headers['Cookie'] = cookie
        }
        const settings: AxiosRequestConfig = {
            baseURL: config.baseUrl,
            withCredentials: true,
            headers: headers,
            validateStatus: (status) => {
                return true
            }
        }
        return await axios.post(api, data, settings)
            .then(response => {
                return response
            })
    }

    public async makeGet(api: string, cookie: string=null) {
        let headers: Object = {
            'Content-type': 'application/json'
        }
        if (cookie) {
            headers['Cookie'] = cookie
        }
        const settings: AxiosRequestConfig = {
            baseURL: config.baseUrl,
            withCredentials: true,
            headers: headers,
            validateStatus: (status) => {
                return true
            }
        }
        return await axios.get(api, settings)
            .then(response => {
                return response
            })
    }
}