# Playwright + Cucumber API Project

Este projeto integra Playwright e Cucumber para testes automatizados de APIs utilizando JavaScript.

## Tecnologias Utilizadas
- **Playwright**: Framework para automação de testes end-to-end.
- **Cucumber**: Framework BDD para escrita de cenários em Gherkin.
- **Node.js**: Ambiente de execução JavaScript.
- **cucumber-html-reporter**: Gera relatórios HTML dos testes Cucumber.

## Estrutura do Projeto
```
cucumber.json           # Configuração do Cucumber
package.json            # Dependências e scripts do projeto
playwright.config.js    # Configuração do Playwright
tests/
  features/
    get-random-user.feature       # Cenários de teste em Gherkin
  steps/
    get-random-user.js            # Implementação dos steps
```

## Como Instalar
1. Clone o repositório:
   ```powershell
   git clone <url-do-repositorio>
   cd playwright-cumcumber-api
   ```
2. Instale as dependências:
   ```powershell
   npm install
   ```

## Como Executar os Testes
- Para rodar os testes Cucumber:
  ```powershell
  npm test
  ```
  Ou:
  ```powershell
  npx cucumber-js
  ```

## Relatório HTML dos Testes
Sempre que os testes são executados, é gerado automaticamente o arquivo `cucumber_report.html` na raiz do projeto.

### O que contém o arquivo `cucumber_report.html`?
O relatório apresenta:
- Resumo dos cenários e features testados
- Status de sucesso ou falha de cada cenário
- Detalhes dos steps executados
- Mensagens de erro (caso existam)
- Visualização organizada por feature e cenário

Abra o arquivo no navegador para visualizar os resultados dos testes de forma clara e detalhada.

## Exemplo de Cenário (get-random-user.feature)
```gherkin
Feature: Get Random User

  Scenario: Get random user with gender female
  Given I send a GET request to the randomuser endpoint:
  When the response status code should be 200
  Then the response body should contain gender "female"
```

## Exemplo de Step (get-random-user.js)
```javascript
const { Given, When, Then } = require("@cucumber/cucumber");

Given("I send a GET request to the randomuser endpoint:", async function () {
  this.res = await fetch("https://randomuser.me/api/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
});

When("the response status code should be 200", async function () {
  const status = this.res.status;
  if (status !== 200) {
    throw new Error(`Expected status code 200 but got ${status}`);
  }
});

Then('the response body should contain gender "female"', async function () {
  const body = await this.res.json();
  console.log(body);
  if (!JSON.stringify(body).includes("female")) {
    throw new Error(`Response body does not contain 'female'`);
  }
});
```

## Configuração do Cucumber (cucumber.json)
```json
{
  "default": {
    "formatOptions": {
      "snippetInterface": "async-await"
    },
    "paths": ["tests/features/**/*.feature"],
    "publishQuiet": true,
    "dryRun": false,
    "require": ["tests/steps/*.js"]
  }
}
```

## Configuração do Playwright (playwright.config.js)
- O arquivo já está pronto para rodar testes E2E, mas neste projeto o foco está nos testes de API com Cucumber.

## Observações
- Certifique-se de estar usando Node.js 18 ou superior para usar `fetch` globalmente.
- Para adicionar novos cenários, crie arquivos `.feature` em `tests/features` e implemente os steps em `tests/steps`.

## Dúvidas ou problemas?
Abra uma issue ou peça ajuda!
