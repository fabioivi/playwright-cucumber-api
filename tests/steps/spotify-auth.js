import dotenv from "dotenv"; 
dotenv.config();

import { Given, When, Then, After } from "@cucumber/cucumber";
import { request, expect } from "@playwright/test";

let apiRequestContext;
let response;
let clientId, clientSecret;

Given("I have valid Spotify client credentials", async function () {
  clientId = process.env.SPOTIFY_CLIENT_ID;
  clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
//   console.log('Client ID:', clientId);  
//   console.log('Client Secret:', clientSecret);  
  apiRequestContext = await request.newContext();
});

Given("I have invalid Spotify client credentials", async function () {
  clientId = "INVALID_ID";
  clientSecret = "INVALID_SECRET";
  apiRequestContext = await request.newContext();
});

When("I request an access token from Spotify", async function () {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  response = await apiRequestContext.post("https://accounts.spotify.com/api/token", {
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
      grant_type: "client_credentials"
    }
  });
  this.response = response;
});

Then("the response body should contain an access token", async function () {
  const body = await response.json();
  expect(body).toHaveProperty("access_token");
});

Then("the response body should contain an error message", async function () {
  const body = await response.json();
  expect(body).toHaveProperty("error");
});

After(async function () {
  if (apiRequestContext) {
    await apiRequestContext.dispose();
    apiRequestContext = null;
  }
});