export class mainPage {
	constructor(page) {
		this.page = page;
		this.url = 'https://realworld.qa.guru';
		// Main элементы страницы
		this.adTag = page.getByRole('button', { name: 'реклама' });
		this.spernoTag = page.getByRole('button', { name: 'sperno' });
		this.tegrumTag = page.getByRole('button', { name: 'tergum' });
	}

	async openPage() {
		await this.page.goto(this.url);
	}

	async checkTags() {
		await this.adTag.click();
		await this.spernoTag.click();
		await this.tegrumTag.click();
	}
}
