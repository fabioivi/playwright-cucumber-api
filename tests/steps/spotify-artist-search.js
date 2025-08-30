import dotenv from "dotenv";
dotenv.config();

import { Given, When, Then, After } from "@cucumber/cucumber";
import { request, expect } from "@playwright/test";

let apiRequestContext;
let response;
let accessToken;

Given("I have a valid Spotify access token", async function () {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  apiRequestContext = await request.newContext();

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenResponse = await apiRequestContext.post("https://accounts.spotify.com/api/token", {
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
      grant_type: "client_credentials"
    }
  });
  const body = await tokenResponse.json();
  accessToken = body.access_token;
});

When("I search for artist {string}", async function (artistName) {
  response = await apiRequestContext.get(`https://api.spotify.com/v1/search`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    params: {
      q: artistName,
      type: "artist"
    }
  });
    this.response = response;
  });

Then("the response body should contain artist {string}", async function (artistName) {
  const body = await response.json();
  const found = body.artists.items.some(item => item.name.toLowerCase() === artistName.toLowerCase());
  expect(found).toBe(true);
});

Then("the response body should not contain any artists", async function () {
  const body = await response.json();
  expect(body.artists.items).toBe(0);
});

After(async function () {
  if (apiRequestContext) {
    await apiRequestContext.dispose();
    apiRequestContext = null;
  }
});
