import { test, expect } from '@playwright/test';

export class Edit {
    constructor( page ) {
        this.page = page;
        this.title = 'Testowy Sklep – Strona główna';
        this.inputLogin = page.locator('#login-username')
        this.inputPassword = page.locator('#login-password')
        this.welcomButton = page.locator('#welcome')
        this.urlBase = 'https://mad-qa.pl/'
        this.loginButton = page.locator('#login-button')
    }
    async navigate() {
        await this.page.goto(this.urlBase);
    }
    async loginPanel(login, password) {
        await this.inputLogin.fill(login);
        await this.inputPassword.fill(password);
        await this.loginButton.click()
    }
}

module.exports = { Edit };