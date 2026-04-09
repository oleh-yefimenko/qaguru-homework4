import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Homework } from '../src/pages/homework.page';

let user = {
	login: faker.person.firstName(),
	email: faker.internet.email(),
	pass: faker.internet.password(),
};

let articleContent = {
	title: faker.lorem.word(),
	about: faker.lorem.words({ min: 5, max: 7 }),
	text: faker.lorem.paragraph({ min: 1, max: 3 }),
	tag: faker.lorem.word({ length: { min: 5, max: 7 } }),
};

test('Регистрация пользователя', async ({ page }) => {
	const homework = new Homework(page);

	console.log(homework.urlHome);
	console.log(user.login);
	console.log(user.email);
	console.log(user.pass);

	await homework.openPage();
	await homework.registerUser(user.login, user.email, user.pass);
});

test('Проверка отображения имени пользователя', async ({ page }) => {
	const homework = new Homework(page);

	await homework.openPage();
	await homework.registerUser(user.login, user.email, user.pass);
	await expect(homework.loginText).toHaveText(user.login);
});

test('Выход с аккаунта', async ({ page }) => {
	const homework = new Homework(page);

	await homework.openPage();
	await homework.registerUser(user.login, user.email, user.pass);
	await homework.logout();
});

test('Проверка входа созданным аккаунтом', async ({ page }) => {
	const homework = new Homework(page);

	await homework.openPage();
	await homework.registerUser(user.login, user.email, user.pass);
	await homework.logout();
	await homework.registerUser(user.login, user.email, user.pass);
});

test('Переход на главную по клику на логотип со страницы авторизации', async ({ page }) => {
	const homework = new Homework(page);

	await homework.openPage();
	await homework.openHome();
});

test('Проверка ссылки перехода на github', async ({ page }) => {
	const homework = new Homework(page);

	await homework.openPage();
	await homework.openGithub();
});

test('Проверка тегов', async ({ page }) => {
	const homework = new Homework(page);

	await homework.openPage();
	await homework.registerUser(user.login, user.email, user.pass);
	await homework.checkTags();
});

test('добавление поста', async ({ page }) => {
	const homework = new Homework(page);

	await homework.openPage();
	await homework.registerUser(user.login, user.email, user.pass);
	await homework.createArticle(articleContent.title, articleContent.about, articleContent.text, articleContent.tag);

	console.log('Заголовок: ' + articleContent.title);
	console.log('Описание: ' + articleContent.about);
	console.log('Текст: ' + articleContent.text);
	console.log('Тег: ' + articleContent.tag);
	console.log('Сайт: ' + page.url());
});

test('Удаление поста', async ({ page }) => {
	const homework = new Homework(page);

	await homework.openPage();
	await homework.registerUser(user.login, user.email, user.pass);
	await homework.createArticle(articleContent.title, articleContent.about, articleContent.text, articleContent.tag);
	await homework.deletePost();
});
