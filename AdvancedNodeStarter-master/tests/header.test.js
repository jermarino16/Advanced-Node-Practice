const puppeteer = require ("puppeteer");

// test("Adds two numbers", () => {
// 	const sum = 1 + 2;

// 	expect(sum).toEqual(3);
// });

let browser, page; // define globals

beforeEach(async () =>{
	jest.setTimeout(30000);
	browser = await puppeteer.launch({
		headless: false
	});
	page = await browser.newPage();
	await page.goto("localhost:3000");
});

afterEach(async () => {
	// await browser.close();
});

test("Check the header says blogster", async () => {
	const text = await page.$eval("a.brand-logo", el => el.innerHTML);

	expect(text).toEqual("Blogster");
});

test("Check the header has Login with Google", async () => {
	const text = await page.$eval(".right a", el => el.innerHTML);

	expect(text).toEqual("Login With Google");
});
test("Clicking Login starts oauth flow", async () => {
	await page.click(".right a");
	const url = await page.url();

	// expect(url).toContain("accounts.google.com"); //either one works
	expect(url).toMatch("/accounts\.google\.com/");
});

test.only("When signed in, shows logout button", async () => {
	//take an existing user ID and generate a session object with it
	const id = "5e483e683c01114068c094b6"; //id of user in mongodb atlas

	const Buffer = require("safe-buffer").Buffer;
	const sessionObject = {
		passport: {
			user: id
		}
	};
	const sessionString = Buffer.from(
		JSON.stringify(sessionObject)).toString("base64");

	const Keygrip = require("keygrip");
	const keys = require("../config/keys");
	const keygrip = new Keygrip([keys.cookieKey]);
	const sig = keygrip.sign("session=" + sessionString);
	// console.log(sessionString, sig);

	await page.setCookie({ name: "session", value: sessionString });
	await page.setCookie({ name: "session.sig", value: sig});
	await page.goto("localhost:3000");
});


