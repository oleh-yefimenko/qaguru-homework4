export class ArticlePage {
	constructor(page) {
		this.page = page;
		// Article
		this.articlePage = page.locator('.article-page');
		this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
		this.articleAbout = page.getByRole('textbox', { name: "What's this article about?" });
		this.articleText = page.getByRole('textbox', { name: 'Write your article (in' });
		this.articleTag = page.getByRole('textbox', { name: 'Enter tags' });
		this.articleSubmit = page.getByRole('button', { name: 'Publish Article' });
		this.articleDeleteButton1 = page.locator('.banner .article-meta').getByRole('button', { name: ' Delete Article' });
		this.articleDeleteButton2 = page.locator('.page').locator('.article-meta').getByRole('button', { name: ' Delete Article' });
		this.articleEditButton1 = page.locator('.banner .article-meta').getByRole('link', { name: ' Edit Article' });
		this.articleEditButton2 = page.locator('.page').locator('.article-meta').getByRole('link', { name: ' Edit Article' });
		this.articleUpdateButton = page.getByRole('button', { name: 'Update Article' });
	}

	async createArticle(title, about, text, tag) {
		await this.articleTitle.fill(title);
		await this.articleAbout.fill(about);
		await this.articleText.fill(text);
		await this.articleTag.fill(tag);
		await this.articleSubmit.click();
	}

	async deleteArticleButton1() {
		await Promise.all([this.page.waitForEvent('dialog').then((dialog) => dialog.accept()), this.articleDeleteButton1.click()]);
	}

	async deleteArticleButton2() {
		await Promise.all([this.page.waitForEvent('dialog').then((dialog) => dialog.accept()), this.articleDeleteButton2.click()]);
	}

	async cancelDeleteArticleButton1() {
		await Promise.all([this.page.waitForEvent('dialog').then((dialog) => dialog.dismiss()), this.articleDeleteButton1.click()]);
	}

	async cancelDeleteArticleButton2() {
		await Promise.all([this.page.waitForEvent('dialog').then((dialog) => dialog.dismiss()), this.articleDeleteButton2.click()]);
	}

	async clickEditArticle1() {
		await this.articleEditButton1.click();
	}

	async editArticleTitle(title) {
		await this.articleTitle.fill(title);
		await this.articleUpdateButton.click();
	}

	async editArticleText(text) {
		await this.articleText.fill(text);
		await this.articleUpdateButton.click();
	}

	async editArticleTag(tag) {
		await this.articleTag.fill(tag);
		await this.articleTag.press('Enter');
		await this.articleUpdateButton.click();
	}
}
