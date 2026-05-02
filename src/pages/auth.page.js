export class AuthPage {
	constructor(page) {
		this.page = page;
		this.loginButton = page.locator('.auth-page').locator('.btn.btn-lg.btn-primary.pull-xs-right');
		// Окно регистрации
		this.usernameInput = page.getByRole('textbox', { name: 'Your Name' });
		this.emailInput = page.getByRole('textbox', { name: 'Email' });
		this.passInput = page.getByRole('textbox', { name: 'Password' });
		this.submitButton = page.getByRole('button', { name: 'Sign up' });
	}

	async singUpUser(username, email, pass) {
		await this.usernameInput.fill(username);
		await this.emailInput.fill(email);
		await this.passInput.fill(pass);
		await this.submitButton.click();
	}

	async loginUser(email, pass) {
		await this.emailInput.fill(email);
		await this.passInput.fill(pass);
		await this.loginButton.click();
	}
}
