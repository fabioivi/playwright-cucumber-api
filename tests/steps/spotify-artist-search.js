
import { Given, When, Then, After } from "@cucumber/cucumber";
import { request, expect } from "@playwright/test";
import { getSpotifyToken } from "../utils/spotify-token.js";

let apiRequestContext;
let response;

Given("I have a valid Spotify access token", async function () {
  this.accessToken = await getSpotifyToken();
  apiRequestContext = await request.newContext();
});

When("I search for artist {string}", async function (artistName) {
  response = await apiRequestContext.get(`https://api.spotify.com/v1/search`, {
    headers: {
      "Authorization": `Bearer ${this.accessToken}`,
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
