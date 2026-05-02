export class MainPage {
	constructor(page) {
		this.page = page;
		this.mainPage = page.getByRole('main');
		this.urlHome = 'https://realworld.qa.guru';
		this.urlHomeBack = 'https://realworld.qa.guru/#/';
		this.urlSourceCode = 'https://github.com/TonyMckes/conduit-realworld-example-app';
		this.urlArticle = 'https://realworld.qa.guru/#/article/';
		this.urlEdit = 'https://realworld.qa.guru/#/editor/';
		this.mainPage = page.getByRole('main');
	}

	async getMainPage() {
		return this.mainPage;
	}

	async openPage() {
		await this.page.goto(this.urlHome);
	}
}
