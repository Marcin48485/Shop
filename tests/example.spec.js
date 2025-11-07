// @ts-check
import {test, expect} from '@playwright/test';
import {Edit} from '../pages/edit';
import {EditProducts} from '../pages/editProducts';
import {Basket} from '../pages/basket';
import {Api} from '../pages/api';
import dotenv from 'dotenv';


test.beforeEach(async ({page}) => {
    const edit = new Edit(page);
    await edit.navigate()
})

test('has title', async ({page}) => {
    const edit = new Edit(page)
    await expect(page).toHaveTitle(edit.title);
});

test('login in the page', async ({page}) => {
    const edit = new Edit(page)

    const login = process.env.USER_LOGIN
    const password = process.env.USER_PASSWORD

    await edit.loginPanel(login, password)
    await expect(edit.welcomButton).toBeVisible()
})

test('login in the page second of type', async ({page}) => {
    const edit = new Edit(page)

    const login = process.env.USER_LOGIN2
    const password = process.env.USER_PASSWORD2

    await edit.loginPanel(login, password)
    await expect(edit.welcomButton).toBeVisible()
})


test('select item in the page and checked name new page', async ({page}) => {
    const edit = new Edit(page);
    const editProducts = new EditProducts(page)

    await edit.selectItem()
    await expect(page).toHaveTitle(editProducts.title)
})

test('add items to basket', async ({page}) => {
    const editProducts = new EditProducts(page);
    await editProducts.navigationProducts();
    await editProducts.selectItemInThePage()
})

test('checked is open basek ', async ({page}) => {
    const basket = new Basket(page);
    await basket.clickBasket()

    await expect(basket.oppeBaseket).toHaveAttribute('aria-expanded', 'true');
})

test('buy item and check is success', async ({page}) => {
    const basket = new Basket(page);
    await basket.clickBasket()
    await basket.byItems.waitFor({state: 'visible'});
    await basket.byItems.click()

    await expect(basket.succes).toBeVisible();
    await expect(basket.succes).toHaveText('sukces');
})

test('test api get all products', async ({request, page}) => {
    const api = new Api(page);
    const response = await request.get(api.urlGetProducts);
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(data)
})

test('test api get id product', async ({request, page}) => {
    const api = new Api(page);
    const response = await request.get(api.getProductsID);
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(data)

    expect(data.id).toBe(3);
    expect(data.name).toBe('Peleryna Maskująca');
    expect(data.price).toBe(349);
    expect(data.currency).toBe('PLN');
})

test(' POST send new product to data base', async ({request, page}) => {
    const api = new Api(page);
    const response = await request.post(api.sendToDataBase, {
        data: {
            name: 'Testowy produkt',
            price: 123.45,
            currency: 'PLN',
        }
    });
    expect(response.status()).toBe(201);

    const data = await response.json();
    console.log(data)

    expect(data).toEqual({
        message: 'created (mock)',
        product: {
            name: 'Testowy produkt',
            price: 123.45,
            currency: 'PLN',
            id: expect.any(Number), // bo ID jest losowe
        },
    });

})

test('method PUT change name and price products', async ({request, page}) => {
    const api = new Api(page);
    const response = await request.put(api.putChangeProducts, {
        data: {
            name: "Zmieniony",
            price: 111.11,
        }
    });
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(data)

    expect(data).toEqual({
        message: "replaced (mock)",
        product: {
            id: expect.any(Number),
            name: "Zmieniony",
            price: 111.11
        },
        note: "No persistence. This is a mock response."
    });
});

test('method PATCH change the price products ', async ({request, page}) => {
    const api = new Api(page)
    const response = await request.patch(api.patchChangeProductPrice, {
        data: {
            price: 222.22,
        }
    })

    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data)

    expect(data).toEqual({
        message: 'updated (mock)',
        changes: { price: 222.22 },
        product: { id: 3, price: 222.22 },
        note: 'No persistence. This is a mock response.'
    })
})

test('delete product', async ({ request, page }) =>{
    const api = new Api(page);
    const response = await request.delete(api.patchChangeProducts)

    expect(response.status()).toBe(204)
})




dotenv.config();

