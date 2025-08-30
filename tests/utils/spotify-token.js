import { request } from "@playwright/test";

export async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const apiRequestContext = await request.newContext();
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await apiRequestContext.post("https://accounts.spotify.com/api/token", {
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
      grant_type: "client_credentials"
    }
  });
  const body = await response.json();
  await apiRequestContext.dispose();
  return body.access_token;
}
