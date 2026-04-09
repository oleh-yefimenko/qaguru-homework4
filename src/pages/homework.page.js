import { expect } from '@playwright/test';

export class Homework {
	constructor(page) {
		this.page = page;
		// Header навигация
		this.urlHome = 'https://realworld.qa.guru';
		this.urlHomeComeBack = 'https://realworld.qa.guru/#/';
		this.logoLink = page.getByRole('banner').getByRole('link', { name: 'conduit' });
		this.githubLink = page.getByRole('navigation').getByRole('link', { name: ' Source code' });
		this.urlGithub = 'https://github.com/TonyMckes/conduit-realworld-example-app';
		this.homeLink = page.getByRole('link', { name: ' Home' });
		this.loginLink = page.getByRole('link', { name: ' Login' });
		this.signupLink = page.getByRole('link', { name: 'Sign up' });
		this.loginText = page.getByRole('navigation').locator('.nav-link.dropdown-toggle.cursor-pointer');
		// Page регистрации
		this.login = page.getByRole('textbox', { name: 'Your Name' });
		this.email = page.getByRole('textbox', { name: 'Email' });
		this.pass = page.getByRole('textbox', { name: 'Password' });
		this.submitButton = page.getByRole('button', { name: 'Sign up' });
		this.logoutButton = page.getByRole('link', { name: ' Logout' });
		// Article
		this.adTag = page.getByRole('button', { name: 'реклама' });
		this.spernoTag = page.getByRole('button', { name: 'sperno' });
		this.tegrumTag = page.getByRole('button', { name: 'tergum' });
		this.newArticleButton = page.getByRole('link', { name: ' New Article' });
		this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
		this.articleAbout = page.getByRole('textbox', { name: "What's this article about?" });
		this.articleText = page.getByRole('textbox', { name: 'Write your article (in' });
		this.articleTag = page.getByRole('textbox', { name: 'Enter tags' });
		this.articleSubmit = page.getByRole('button', { name: 'Publish Article' });
		this.articleDeleteButton1 = page.getByRole('button', { name: ' Delete Article' }).first();
		this.articleDeleteButton2 = page.getByRole('button', { name: ' Delete Article' }).nth(1);
	}

	async openPage() {
		await this.page.goto(this.urlHome);
	}

	async registerUser(name, email, pass) {
		await this.signupLink.click();
		await this.login.fill(name);
		await this.email.fill(email);
		await this.pass.fill(pass);
		await this.submitButton.click();
	}

	async logout() {
		await this.loginText.click();
		await this.logoutButton.click();
	}

	async openHome() {
		await this.loginLink.click();
		await this.logoLink.click();
		await expect(this.page).toHaveURL(this.urlHomeComeBack);
	}

	async openGithub() {
		await this.githubLink.click();
		await expect(this.page).toHaveURL(this.urlGithub);
	}

	async checkTags() {
		await this.adTag.click();
		await this.spernoTag.click();
		await this.tegrumTag.click();
	}

	async createArticle(title, about, text, tag) {
		await this.newArticleButton.click();
		await this.articleTitle.fill(title);
		await this.articleAbout.fill(about);
		await this.articleText.fill(text);
		await this.articleTag.fill(tag);
		await this.articleSubmit.click();
		await expect(this.page).toHaveURL(new RegExp(title));
	}

	async deletePost() {
		this.page.once('dialog', (dialog) => dialog.accept());

		await this.articleDeleteButton1.click();
	}
}
