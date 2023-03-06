import { UserKV } from "./kv";
import { Client, auth } from "twitter-api-sdk";

// https://github.com/twitterdev/twitter-api-typescript-sdk/blob/main/examples/oauth2-callback.ts
const baseUri = WORKER_BASE_URL;
const STATE = `${TWITTER_APP_ID}`;

const authClient = new auth.OAuth2User({
	client_id: TWITTER_CLIENT_ID as string,
	client_secret: TWITTER_CLIENT_SECRET as string,
	callback: `${baseUri}/callback`,
	scopes: ["tweet.read", "users.read", "offline.access"],
});

export const twitterAuth = async () => {
	const authUrl = authClient.generateAuthURL({
		state: STATE,
		code_challenge_method: "plain",
		code_challenge: "challenge",
	});
	return authUrl;
};

export const twitterCallback = async (code, state) => {
	if (state !== STATE)
		return new Response("State isn't matching", {
			status: 500,
		});

	const token = await authClient.requestAccessToken(code as string);

	const client = new Client(token.token.access_token as string);
	const { data } = await client.users.findMyUser();

	const userId = data.id;
	const userData = {
		userAddress: "",
		accessToken: token.token.access_token,
		refreshToken: token.token.refresh_token,
		username: data.username,
		isTwitterLogged: true,
		isRegistered: false,
	};
	await UserKV.saveUser(userId, userData);
	return {
		userId,
		...userData,
	};
};
