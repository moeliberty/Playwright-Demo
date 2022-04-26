import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/custom-world";

const url = 'https://example.cypress.io/todo';

Given('I open ToDo list page', async function (this: CustomWorld) {
    await this.page.goto(url)
})

When('I type a new element', async function (this: CustomWorld) {
    await this.page.fill('.new-todo' , 'Buy Milk')
})

When('I press enter', async function (this: CustomWorld) {
    await this.page.keyboard.press('Enter');
});

Then('I should see the new element at the end of the list', async function (this: CustomWorld) {
    // get text of the item that is visible in the UI 
    const text = await this.page.innerText('.todo-list li >> nth=-1')
    // assert that its name is similar to what we provided
    expect(text).toBe('Buy Milk')
})
