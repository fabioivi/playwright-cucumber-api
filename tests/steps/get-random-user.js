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
