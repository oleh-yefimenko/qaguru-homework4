import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/main.page';
import { NavHeader } from '../src/pages/nav.page';

let main;
let nav;

test.beforeEach(async ({ page }) => {
	main = new MainPage(page);
	nav = new NavHeader(page);
});

test('Возвращение на главную страницу по клику на лого', async ({ page }) => {
	await main.openPage();
	await nav.clickLogin();
	await nav.clickConduit();
	await expect(page).toHaveURL(main.urlHomeBack);
});

test('Проверка ссылки перехода на github', async ({ page }) => {
	await main.openPage();
	await nav.openGithub();
	await expect(page).toHaveURL(main.urlSourceCode);
});
