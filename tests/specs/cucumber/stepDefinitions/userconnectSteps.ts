import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/custom-world";


const url = 'https://252.preprod.rpstage.com/fr/console';
const partnersUrl = 'https://252.preprod.rpstage.com/fr/console/admin/partners/list';
const username = 'puppeteer@elibadmin';
const password = 'Gp!qo-8glq#';

Given('I am connected as an admin to the backoffice', async function (this: CustomWorld) {
    await this.page.goto(url);
    const loginTitle = await this.page.innerText('.login .login-title');
    expect(loginTitle).toBe('Vous avez déjà un compte');
    await this.page.fill('input[id="username"]', username);
    await this.page.fill('input[id="password"]', password);
    await this.page.click('text=Se connecter');
    const dashboardTitle = await this.page.innerText('.box-header .box-title h1');
    expect(dashboardTitle).toBe('Dashboard');
})

Given('I am on the page who list the partners', async function (this: CustomWorld) {
    await this.page.goto(partnersUrl);
})

When('I click on the link on the ID of the first partner of the list', async function (this: CustomWorld) {
    await this.page.click('.table > tbody > tr:nth-child(1) > .sonata-ba-list-field > .sonata-link-identifier');
})

When("I click on the link 'Users' in the navbar", async function (this: CustomWorld) {
    await this.page.click('.navbar-collapse > .navbar-left > .nav > li:nth-child(3) > a');
})

When('I click on the orange icon to connect as a user for the first user of the list', async function (this: CustomWorld) {
    const [newPage] = await Promise.all([
        this.context.waitForEvent('page'),
        this.page.click('tr:nth-child(1) > .td-nowrap > .btn-group > #connectUser > .fa') // Opens a new tab
    ]);

    await newPage.waitForLoadState();
})

Then('I should have a new tab open on the Dashboard of this user', async function (this: CustomWorld) {
    let pages = await this.context.pages();
    const homepageTitle = await pages[1].innerText('.contentMenuBurger h1');
    expect(homepageTitle).toBe('Tableau de bord');
})
