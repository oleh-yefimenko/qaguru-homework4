export class NavHeader {
	constructor(page) {
		this.page = page;
		this.conduitLink = page.getByRole('banner').getByRole('link', { name: 'conduit' });
		this.githubLink = page.getByRole('navigation').getByRole('link', { name: ' Source code' });
		this.homeLink = page.getByRole('link', { name: ' Home' });
		this.loginLink = page.getByRole('link', { name: ' Login' });
		this.profileName = page.getByRole('navigation').locator('.nav-link.dropdown-toggle.cursor-pointer');
		this.userButton = page.locator('nav-item dropdown').locator('.nav-link.dropdown-toggle.cursor-pointer');
		this.signUpLink = page.getByRole('link', { name: 'Sign up' });
		this.logoutButton = page.getByRole('link', { name: ' Logout' });
		this.newArticleButton = page.getByRole('link', { name: ' New Article' });
	}

	async clickConduit() {
		await this.conduitLink.click();
	}

	async clickLogin() {
		await this.logoLink.click();
	}

	async clickSingUp() {
		await this.signUpLink.click();
	}

	async clickName() {
		await this.profileName.click();
	}

	async logoutUser() {
		await this.logoutButton.click();
	}

	async clickLogin() {
		await this.loginLink.click();
	}

	async openGithub() {
		await this.githubLink.click();
	}

	async clickNewArticle() {
		await this.newArticleButton.click();
	}
}
