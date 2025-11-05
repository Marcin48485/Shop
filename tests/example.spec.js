// @ts-check
import { test, expect } from '@playwright/test';
import { Edit } from '../pages/edit';
import { EditProducts } from '../pages/editProducts';
import { Basket } from '../pages/basket';
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

test('login in the page second of type', async ({ page }) => {
    const edit = new Edit(page)

    const login = process.env.USER_LOGIN2
    const password = process.env.USER_PASSWORD2
    await edit.loginPanel(login, password)

    await expect(edit.welcomButton).toBeVisible()
})


test('select item in the page and checked name new page', async ({ page }) => {
    const edit = new Edit(page);
    const editProducts = new EditProducts(page)

    await edit.selectItem()
    await expect(page).toHaveTitle(editProducts.title)
})

test('add items to basket', async ({ page }) => {
    const editProducts = new EditProducts(page);
    await editProducts.navigationProducts();
    await editProducts.selectItemInThePage()
})

test('checked is open basek ', async ({ page }) => {
    const basket = new Basket(page);
    await basket.clickBasket()

    await expect(basket.oppeBaseket).toHaveAttribute('aria-expanded', 'true');
})

test('buy item and check is success', async ({ page }) => {
    const basket = new Basket(page);
    await basket.clickBasket()
    await basket.byItems.waitFor({ state: 'visible' });
    await basket.byItems.click()

    await expect(basket.succes).toBeVisible();
    await expect(basket.succes).toHaveText('sukces');
})



