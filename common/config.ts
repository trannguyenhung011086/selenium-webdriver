const { BASEURL, SELENIUM_HUB, BROWSER, DEVICE } = process.env;

const config = {
	baseUrl: BASEURL || "https://tiki.vn",
	page: {
		accountEdit: "/customer/account/edit"
	},
	api: {
		logIn: "/api/v2/tokens"
	},
	testAccount: {
		email: "trannguyenhung011086@outlook.com",
		password: "0944226282"
	},
	remote: SELENIUM_HUB || "http://localhost:4444/wd/hub",
	browser: BROWSER || "chrome",
	device: DEVICE || "iPhone 6"
};

export { config };
