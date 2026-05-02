export class PopularTags {
	constructor(page) {
		this.page = page;
		this.ad = page.getByRole('button', { name: 'реклама' });
		this.autus = page.getByRole('button', { name: 'autus' });
		this.iste = page.getByRole('button', { name: 'iste' });
		this.feedTag = page.locator('.feed-toggle .nav-link.active');
	}

	async clickAd() {
		await this.ad.click();
	}

	async clickAutus() {
		await this.autus.click();
	}

	async clickIste() {
		await this.iste.click();
	}
}
