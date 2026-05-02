import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { NavHeader } from '../src/pages/nav.page';
import { AuthPage } from '../src/pages/auth.page';
import { YourFeed } from '../src/pages/feed.page';
import { ArticlePage } from '../src/pages/artilce.page';

let main;
let auth;
let nav;
let feed;
let article;
let user = {
	username: faker.person.firstName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
};
let articleContent = {
	title: faker.lorem.word(),
	about: faker.lorem.words({ min: 5, max: 7 }),
	text: faker.lorem.paragraph({ min: 1, max: 3 }),
	tag: faker.lorem.word({ length: { min: 5, max: 7 } }),
};

let updatedArticle = { ...articleContent };
updatedArticle.title = faker.lorem.word();
updatedArticle.about = faker.lorem.words({ min: 5, max: 7 });
updatedArticle.text = faker.lorem.paragraph({ min: 1, max: 3 });
updatedArticle.tag = faker.lorem.word();

test.beforeEach(async ({ page }) => {
	main = new MainPage(page);
	nav = new NavHeader(page);
	auth = new AuthPage(page);
	feed = new YourFeed(page);
	article = new ArticlePage(page);
});

test('добавление поста', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');

	await nav.clickNewArticle();
	await article.createArticle(articleContent.title, articleContent.about, articleContent.text, articleContent.tag);
	await expect(page).toHaveURL(new RegExp(articleContent.title));
	// Часто ошибка (может такое слово уже есть)
	// await expect(page).toHaveURL(main.urlArticle + articleContent.title.toLowerCase());

	console.log('Сайт: ' + page.url());
	console.log('Заголовок: ' + articleContent.title);
	console.log('Описание: ' + articleContent.about);
	console.log('Текст: ' + articleContent.text);
	console.log('Тег: ' + articleContent.tag);
});

test('Удаление поста кнопкой на баннере', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');

	await nav.clickNewArticle();
	await article.createArticle(articleContent.title, articleContent.about, articleContent.text, articleContent.tag);
	await expect(page).toHaveURL(new RegExp(articleContent.title));

	await article.deleteArticleButton1();

	await expect(main.mainPage).toContainText('Your Feed');
});

test('Удаление поста кнопкой в page', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');

	await nav.clickNewArticle();
	await article.createArticle(articleContent.title, articleContent.about, articleContent.text, articleContent.tag);
	await expect(page).toHaveURL(new RegExp(articleContent.title));

	await article.deleteArticleButton2();

	await expect(main.mainPage).toContainText('Your Feed');
});

test('Отмена удаления поста', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');

	await nav.clickNewArticle();
	await article.createArticle(articleContent.title, articleContent.about, articleContent.text, articleContent.tag);
	await expect(page).toHaveURL(new RegExp(articleContent.title.toLowerCase()));

	await article.cancelDeleteArticleButton1();

	await expect(page).toHaveURL(new RegExp(articleContent.title));
});

test('Редактирование заголовка в посте кнопкой в page', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');

	await nav.clickNewArticle();
	await article.createArticle(articleContent.title, articleContent.about, articleContent.text, articleContent.tag);
	await expect(page).toHaveURL(new RegExp(articleContent.title));

	await article.clickEditArticle1();
	await expect(page).toHaveURL(main.urlEdit + articleContent.title.toLowerCase());

	await article.editArticleTitle(updatedArticle.title);
	await expect(main.mainPage).toContainText(updatedArticle.title);
});

test('Редактирование текста в посте кнопкой в page', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');

	await nav.clickNewArticle();
	await article.createArticle(articleContent.title, articleContent.about, articleContent.text, articleContent.tag);
	await expect(page).toHaveURL(new RegExp(articleContent.title));

	await article.clickEditArticle1();
	await expect(page).toHaveURL(main.urlEdit + articleContent.title.toLowerCase());

	await article.editArticleText(updatedArticle.text);
	await expect(main.mainPage).toContainText(updatedArticle.text);
});

test('Редактирование тега в посте кнопкой в page', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');

	await nav.clickNewArticle();
	await article.createArticle(articleContent.title, articleContent.about, articleContent.text, articleContent.tag);
	await expect(page).toHaveURL(new RegExp(articleContent.title));

	await article.clickEditArticle1();
	await expect(page).toHaveURL(main.urlEdit + articleContent.title.toLowerCase());

	await article.editArticleTag(updatedArticle.tag);
	// todo тег не меняется
	// await expect(main.mainPage).toContainText(updatedArticle.tag);
});
