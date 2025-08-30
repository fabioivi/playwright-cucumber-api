import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

// Validação genérica de status code
Then("the response status code should be {int}", async function (statusCode) {
  expect(this.response.status()).toBe(statusCode);
});

// Validação genérica de campo no corpo da resposta
Then("the response body should contain property {string}", async function (property) {
  const body = await this.response.json();
  expect(body).toHaveProperty(property);
});

// Validação genérica de valor em campo específico
Then("the response body property {string} should be {string}", async function (property, value) {
  const body = await this.response.json();
  expect(body[property]).toBe(value);
});
