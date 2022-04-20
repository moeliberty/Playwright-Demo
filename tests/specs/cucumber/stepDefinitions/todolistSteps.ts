const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const url = 'https://example.cypress.io/todo';

Given('I open ToDo list page', async function () {
    await page.goto(url)
})

When('I type a new element', async function () {
    await page.fill('.new-todo' , 'Buy Milk')
})

When('I press enter', async function () {
    await page.keyboard.press('Enter');
});

Then('I should see the new element at the end of the list', async function () {
    // get text of the item that is visible in the UI 
    const text = await page.innerText('.todo-list li >> nth=-1')
    // assert that its name is similar to what we provided
    expect(text).toBe('Buy Milk')
})
