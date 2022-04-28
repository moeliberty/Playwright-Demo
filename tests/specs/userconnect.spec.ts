import { test, expect, Page } from '@playwright/test';

const partnersUrl = 'https://252.preprod.rpstage.com/fr/console/admin/partners/list';
const username = 'puppeteer@elibadmin';
const password = 'Gp!qo-8glq#';

test.beforeEach(async ({ page }) => {
    await page.goto('https://252.preprod.rpstage.com/fr/console');
});

test.describe('Backoffice', () => {
    test('Connect as a partner user', async ({ page, context }) => {
        await test.step('I am connected as an admin to the backoffice', async () => {
            const loginTitle = await page.innerText('.login .login-title');
            expect(loginTitle).toBe('Vous avez déjà un compte');
            await page.fill('input[id="username"]', username);
            await page.fill('input[id="password"]', password);
            await page.click('text=Se connecter');
            const dashboardTitle = await page.innerText('.box-header .box-title h1');
            expect(dashboardTitle).toBe('Dashboard');
        });

        await test.step('I am on the page who list the partners', async () => {
            await page.goto(partnersUrl);
        });

        await test.step('I am on the page who list the partners', async () => {
            await page.goto(partnersUrl);
        });

        await test.step('I click on the link on the ID of the first partner of the list', async () => {
            await page.click('.table > tbody > tr:nth-child(1) > .sonata-ba-list-field > .sonata-link-identifier');
        });

        await test.step('I click on the link "Users" in the navbar', async () => {
            await page.click('.navbar-collapse > .navbar-left > .nav > li:nth-child(3) > a');
        });

        await test.step('I click on the orange icon to connect as a user for the first user of the list', async () => {
            test.slow();
            const [newPage] = await Promise.all([
                context.waitForEvent('page'),
                page.click('tr:nth-child(1) > .td-nowrap > .btn-group > #connectUser > .fa') // Opens a new tab
            ]);

            await newPage.waitForLoadState();
        });

        await test.step('I should have a new tab open on the Dashboard of this user', async () => {
            let pages = await context.pages();
            const homepageTitle = await pages[1].innerText('.contentMenuBurger h1');
            expect(homepageTitle).toBe('Tableau de bord');
        })
    });
});