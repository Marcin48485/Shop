export class Api {
    constructor(page) {
        this.page = page;
        this.urlGetProducts = '/api/index.php?endpoint=products'
        this.getProductsID = '/api/index.php?endpoint=products&id=3'
        this.sendToDataBase = '/api/index.php?endpoint=products'
        this.putChangeProducts = '/api/index.php?endpoint=products&id=3'
        this.patchChangeProductPrice = '/api/index.php?endpoint=products&id=3'
        this.patchChangeProducts = '/api/index.php?endpoint=products&id=3'
    }

}

module.exports = { Api }