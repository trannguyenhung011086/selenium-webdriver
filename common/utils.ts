import { config } from "./config";
import axios, { AxiosRequestConfig } from "axios";

export class Utils {
	async getLogInCookie() {
		const settings: AxiosRequestConfig = {
			baseURL: config.baseUrl,
			withCredentials: true,
			headers: {
				"Content-type": "application/json"
			},
			validateStatus: status => {
				return true;
			}
		};
		const data: Object = {
			grant_type: "password",
			email: config.testAccount.email,
			password: config.testAccount.password
		};

		const cookie: string[] = await axios
			.post(config.api.logIn, data, settings)
			.then(response => response.headers["set-cookie"]);

		return cookie;
	}
}
