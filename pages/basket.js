class Basket {
    constructor(page) {
        this.page = page;
        this.oppeBaseket = page.locator('#cart-button');
        this.byItems = page.locator('#cart-buy');
        this.succes = page.locator('.toast-container .toast-success');
    }
    async clickBasket() {
        await this.oppeBaseket.click();
    }
}

module.exports = { Basket };