let baseUrl: string;

const config = {
    baseUrl: baseUrl || "http://testapp.galenframework.com",
    testAccount: {
        email: "testuser@example.com",
        password: "test123"
    },
    remote: process.env.SELENIUM_REMOTE_URL || "http://localhost:4444/wd/hub",
    browser: process.env.SELENIUM_BROWSER || "chrome",
    device: process.env.DEVICE || "iPhone 6"
};

export default config;
