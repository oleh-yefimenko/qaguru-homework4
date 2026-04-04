import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { mainPage } from '../src/pages/main.spec';
import { headerNav } from '../src/pages/header.spec';

let user = {
	login: faker.person.firstName(),
	email: faker.internet.email(),
	pass: faker.internet.password(),
};

test('Регистрация пользователя', async ({ page }) => {
	const main = new mainPage(page);
	const header = new headerNav(page);

	console.log(main.url);
	console.log(user.login);
	console.log(user.email);
	console.log(user.pass);

	await main.openPage();
	await header.registerUser(user.login, user.email, user.pass);
});

test('Проверка отображения имени пользователя', async ({ page }) => {
	const main = new mainPage(page);
	const header = new headerNav(page);

	await main.openPage();
	await header.registerUser(user.login, user.email, user.pass);
	await expect(header.loginText).toHaveText(user.login);
});

test('Выход с аккаунта', async ({ page }) => {
	const main = new mainPage(page);
	const header = new headerNav(page);

	await main.openPage();
	await header.registerUser(user.login, user.email, user.pass);
	await header.logout();
});

test('Проверка входа созданным аккаунтом', async ({ page }) => {
	const main = new mainPage(page);
	const header = new headerNav(page);

	await main.openPage();
	await header.registerUser(user.login, user.email, user.pass);
	await header.logout();
	await header.registerUser(user.login, user.email, user.pass);
});

test('Переход на главную по клику на логотип со страницы авторизации', async ({ page }) => {
	const main = new mainPage(page);
	const header = new headerNav(page);

	await main.openPage();
	await header.loginLink.click();
	await header.logoLink.click();
});

test('Проверка ссылки перехода на github', async ({ page }) => {
	const main = new mainPage(page);
	const header = new headerNav(page);

	await main.openPage();
	await header.githubLink.click();
});

test('Проверка тегов', async ({ page }) => {
	const main = new mainPage(page);
	const header = new headerNav(page);

	await main.openPage();
	await header.registerUser(user.login, user.email, user.pass);
	await main.checkTags();
});
