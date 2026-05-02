import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { NavHeader } from '../src/pages/nav.page';
import { AuthPage } from '../src/pages/auth.page';
import { YourFeed } from '../src/pages/feed.page';

let main;
let auth;
let nav;
let feed;
let user = {
	username: faker.person.firstName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
};

test.beforeEach(async ({ page }) => {
	main = new MainPage(page);
	nav = new NavHeader(page);
	auth = new AuthPage(page);
	feed = new YourFeed(page);

	// console.log('Сайт: ' + URL);
	// console.log('Имя: ' + user.username);
	// console.log('Email: ' + user.email);
	// console.log('Пароль: ' + user.password);
});

/*
test('Пример теста без ---> test.beforeEach', async ({ page }) => {
	const main = new MainPage(page);
	const auth = new authPage(page);
	const feed = new YourFeed(page);

	console.log('Сайт: ' + URL);
	console.log('Имя: ' + user.username);
	console.log('Email: ' + user.email);
	console.log('Пароль: ' + user.password);

	await main.openPage();
	await auth.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await feed.checkYourFeed();
});
*/

test('Регистрация пользователя', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');
});

test('Проверка никнейма пользователя', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');
	await expect(nav.profileName).toHaveText(user.username);
});

test('Выход из аккаунта', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');
	await nav.clickName();
	await expect(nav.logoutButton).toBeVisible();
	await nav.logoutUser();
	await expect(page).toHaveURL(main.urlHomeBack);
});

test('Проверка входа созданным аккаунтом', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');

	await nav.clickName();
	await expect(nav.logoutButton).toBeVisible();
	await nav.logoutUser();
	await expect(page).toHaveURL(main.urlHomeBack);

	await main.openPage();
	await nav.clickLogin();
	await auth.loginUser(user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');
});
