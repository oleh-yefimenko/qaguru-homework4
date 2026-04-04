export class headerNav {
	constructor(page) {
		this.page = page;
		// Header навигация
		this.logoLink = page.getByRole('banner').getByRole('link', { name: 'conduit' });
		this.githubLink = page.getByRole('navigation').getByRole('link', { name: ' Source code' });
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
}
