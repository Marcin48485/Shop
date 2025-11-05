// @ts-check
import { test, expect } from '@playwright/test';
import { Edit } from '../pages/edit';
import dotenv from 'dotenv';
dotenv.config();

test.beforeEach(async ({ page }) => {
    const edit = new Edit(page);
    await edit.navigate()

})

test('has title', async ({ page }) => {
    const edit = new Edit(page)

    await expect(page).toHaveTitle(edit.title);
});

test('login in the page', async ({ page }) => {
    const edit = new Edit(page)

    const login = process.env.USER_LOGIN
    const password = process.env.USER_PASSWORD

    await edit.loginPanel(login, password)

    await expect(edit.welcomButton).toBeVisible()
})