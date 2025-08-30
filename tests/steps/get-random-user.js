const { Given, When, Then, After } = require("@cucumber/cucumber");
const { request, expect } = require('@playwright/test');

// Contexto global para reutilização
let apiRequestContext;

Given("I send a GET request to the randomuser endpoint:", async function () {
    // Cria contexto se não existir
    if (!apiRequestContext) {
        apiRequestContext = await request.newContext({
            baseURL: 'https://randomuser.me',
        });
    }
    
    // Envia requisição GET
    this.res = await apiRequestContext.get("/api/", {
        headers: { "Content-Type": "application/json" }
    });
});

When("the response status code should be 200", async function () {
    const status = this.res.status();

    expect(status).toBe(200);  // Validação robusta com expect
});

Then('the response body should contain gender {string}', async function (gender) {
    const body = await this.res.json();
    console.log('Response body:', body);  // Log para debugging
    
    // Validação mais específica: verifica se o campo gender existe e é igual ao parâmetro
    expect(body.results[0].gender).toBe(gender);
});

// Cleanup após todos os cenários
After(async function () {
    if (apiRequestContext) {
        await apiRequestContext.dispose();
        apiRequestContext = null;
    }
});
