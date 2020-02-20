const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

describe('When logged in', async () => {
  beforeEach(async () => {
    await page.login();
    await page.click('a.btn-floating');
  });

  test('can see blog create form', async () => {
    const label = await page.getContentsOf('form label');

    expect(label).toEqual('Blog Title');
  });

  describe("and using invalid inputs", async () => {
  	beforeEach(async () => {
  		await page.click("form button");
  	});
  	test("the form shows an error message", async () =>{
  		const titleError = await page.getContentsOf('.title .red-text');
  		const contentError = await page.getContentsOf('.content .red-text');

  		expect(titleError).toEqual('You must provide a value');
  		expect(contentError).toEqual('You must provide a value');
  	});
  });
  describe("and using valid inputs", async () => {
  	beforeEach(async () => {
  		await page.click("form button");
  	});
  	test("submitting takes user to a review screen", async () =>{
  		await page.type(".title input", "My title");
  		await page.type(".content input", "My Content");
  		await page.click("form button");

  		const text = await page.getContentsOf('h5');

  		expect(text).toEqual('Please confirm your entries');
  	});
  	test("submitting then savings takes user to blog screen", async () =>{
  		const titleError = await page.getContentsOf('.title .red-text');
  		const contentError = await page.getContentsOf('.content .red-text');

  		expect(titleError).toEqual('You must provide a value');
  		expect(contentError).toEqual('You must provide a value');
  	});
  });

});
