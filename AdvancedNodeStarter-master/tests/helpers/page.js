const puppeteer = require("puppeteer");

class CustomPage {
	static async build() {
		const browser = await puppeteer.launch({
			headless: false
		});

		const page = await browser.newPage();
		const customPage = new customPage(page);

		return new Proxy(customPage, {
			get: function(target, property){
				return customPage[property] || browser[property] || page[property];
			}
		});
	}

	constructor() {
		this.page = page;
	}

}

module.exports = CustomPage;