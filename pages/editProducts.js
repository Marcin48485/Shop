export class EditProducts {
    constructor(page) {
        this.page = page
        this.url = '/products/p1.html'
        this.title = 'Mysz Gamingowa – Testowy Sklep'
        this.addToBasekt = page.getByRole('button', { name: 'Dodaj do koszyka' })
        // this.baske = page.locator('#cart-count');
    }
    async navigationProducts() {
        await this.page.goto(this.url)
    }
    async selectItemInThePage() {
        await this.addToBasekt.click()
    }
}

module.exports = { EditProducts }