const puppeteer 		= require ("puppeteer");
const sessionFactory 	= require("./factories/sessionFactory");
const userFactory 		= require("./factories/userFactory");

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
	await browser.close();
});

test("Check the header says blogster", async () => {
	const text = await page.$eval("a.brand-logo", el => el.innerHTML);

	expect(text).toEqual("Blogster");
});

test("Check the header has Login with Google", async () => {
	await page.waitFor(".right a");
	const text = await page.$eval(".right a", el => el.innerHTML);

	expect(text).toEqual("Login With Google");
});

test("Clicking Login starts oauth flow", async () => {
	await page.waitFor(".right a");
	await page.click(".right a");
	const url = await page.url();

	// expect(url).toContain("accounts.google.com"); //either one works
	expect(url).toMatch("/accounts\.google\.com/");
});

test.only("When signed in, shows logout button", async () => {
	//generate a user and simulate login
	const user = await userFactory();
	const { session, sig } = sessionFactory(user);

	await page.setCookie({ name: "session", value: session });
	await page.setCookie({ name: "session.sig", value: sig});
	await page.goto("localhost:3000");
	await page.waitFor("a[href='/auth/logout']");

	const text = await page.$eval("a[href='/auth/logout']", el => el.innerHTML);

	expect(text).toEqual("Logout");

});


