import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { NavHeader } from '../src/pages/nav.page';
import { AuthPage } from '../src/pages/auth.page';
import { YourFeed } from '../src/pages/feed.page';
import { PopularTags } from '../src/pages/tags.page';

let main;
let auth;
let nav;
let feed;
let tags;
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
	tags = new PopularTags(page);
});

test('Проверка тегов', async ({ page }) => {
	await main.openPage();
	await nav.clickSingUp();
	await auth.singUpUser(user.username, user.email, user.password);
	await expect(main.mainPage).toContainText('Your Feed');

	await tags.clickAd();
	await expect(tags.feedTag).toHaveText('реклама');

	await tags.clickAutus();
	await expect(tags.feedTag).toHaveText('autus');

	await tags.clickIste();
	await expect(tags.feedTag).toHaveText('iste');
});
