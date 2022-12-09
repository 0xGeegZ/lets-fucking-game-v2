/* eslint-disable no-console */
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// For worker configuration for twitter Authr
// SEE : https://blog.cloudflare.com/oauth-2-0-authentication-server/
// Example for google auth : https://github.com/vonadz/newsletter-oauth-registration-cfw

// TODO IF NOT USING KV add Redis database
// SEE https://docs.upstash.com/redis/tutorials/cloudflare_workers_with_redis

// WORKER SIGN IN EXAMPLE :  https://github.com/vonadz/newsletter-oauth-registration-cfw
import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";

import { Router } from "itty-router";
import { error, json, missing } from "itty-router-extras";
import { handleCors, wrapCorsHeader, requireField } from "./helper";
import {
	getAllRetweets,
	getTweet,
	checkUserSignUp,
	signUp,
	drawWinners,
} from "./handler";

import { twitterAuth, twitterCallback } from "./twitter";

const router = Router();

const allowedOrigin =
	/[^\w](lfgames\.xyz)|(localhost:3000)|(127.0.0.1:3000)|(lfgames.finance)$/;

router.get("/tweets/:tweetId/retweets", async ({ params }) => {
	const isParamError = requireField("tweetId", params);
	if (isParamError) return isParamError;

	const { tweetId } = params;

	try {
		const result = await getAllRetweets(tweetId);
		return json(result);
	} catch (err) {
		return error(500, { error: { message: err.message } });
	}
});

router.get("/tweets/:tweetId", async ({ params }) => {
	const isParamError = requireField("tweetId", params);
	if (isParamError) return isParamError;

	const { tweetId } = params;

	try {
		return json(await getTweet(tweetId));
	} catch (err) {
		return error(500, { error: { message: err.message } });
	}
});

router.get(
	"/chains/:chainId/giveaways/:giveawayId/winners",
	async ({ params, query }) => {
		const isParamChainError = requireField("chainId", params);
		if (isParamChainError) return isParamChainError;

		const isParamGiveawayError = requireField("giveawayId", params);
		if (isParamGiveawayError) return isParamGiveawayError;

		const isQueryTweetIdError = requireField("tweetId", query);
		if (isQueryTweetIdError) return isQueryTweetIdError;

		const { giveawayId /*, chainId*/ } = params;

		// TODO : those data should be loaded via multicall and on chain request
		// eslint-disable-next-line prefer-const
		let { prizes, tweetId, retweetMaxCount } = query;

		const isQueryPrizesError = requireField("prizes", query);
		if (isQueryPrizesError) prizes = 1;

		const isQueryRetweetError = requireField("retweetMaxCount", query);
		if (isQueryRetweetError) retweetMaxCount = 0;

		try {
			const result = await drawWinners(
				giveawayId,
				tweetId,
				+retweetMaxCount,
				+prizes
			);
			const payload = ethers.utils.hexlify(
				ethers.utils.toUtf8Bytes(JSON.stringify(result))
			);

			return json({
				giveawayId: BigNumber.from(giveawayId),
				payload,
			});
		} catch (err) {
			return error(500, { error: { message: err.message } });
		}
	}
);

router.get(
	"/chains/:chainId/giveaways/:giveawayId/refresh",
	async ({ params, query }) => {
		const isParamChainError = requireField("chainId", params);
		if (isParamChainError) return isParamChainError;

		const isParamGiveawayError = requireField("giveawayId", params);
		if (isParamGiveawayError) return isParamGiveawayError;

		const isQueryTweetIdError = requireField("tweetId", query);
		if (isQueryTweetIdError) return isQueryTweetIdError;

		const { giveawayId, chainId } = params;
		// TODO : those data should be loaded via multicall and on chain request
		const { tweetId } = query;

		try {
			const refreshed = await getAllRetweets(tweetId);
			return json({
				giveawayId: BigNumber.from(giveawayId),
				retweetCount: refreshed.length,
			});
		} catch (err) {
			return error(500, { error: { message: err.message } });
		}
	}
);

router.get("/users/:userId", async ({ params }) => {
	const isParamError = requireField("userId", params);
	if (isParamError) return isParamError;

	const { userId } = params;

	try {
		const hasSignedUp = await checkUserSignUp(userId);
		return json({
			userId: BigNumber.from(userId),
			hasSignedUp,
		});
	} catch (err) {
		return error(500, { error: { message: err.message } });
	}
});

router.post("/users", async ({ query }) => {
	const isQueryUserIdError = requireField("userId", query);
	if (isQueryUserIdError) return isQueryUserIdError;

	const isQueryAddressError = requireField("userAddress", query);
	if (isQueryAddressError) return isQueryAddressError;

	const isQueryTokenError = requireField("accessToken", query);
	if (isQueryTokenError) return isQueryTokenError;

	const { userId, userAddress, accessToken } = query;

	try {
		return json(await signUp(userId, userAddress, accessToken));
	} catch (err) {
		return error(500, { error: { message: err.message } });
	}
});

router.get("/auth/twitter", async () => {
	try {
		const redirectUrl = await twitterAuth();
		console.log("🚀  ~ redirectUrl", redirectUrl);
		return Response.redirect(redirectUrl, 302);
	} catch (err) {
		return error(500, { error: { message: err.message } });
	}
});

router.get("/callback", async ({ query }) => {
	try {
		const isQueryCodeError = requireField("code", query);
		if (isQueryCodeError)
			return error(500, { error: { message: "Code return is missing" } });

		const isQueryStateError = requireField("state", query);
		if (isQueryStateError)
			return error(500, { error: { message: "State return is missing" } });

		const { code, state } = query;

		return json(await twitterCallback(code, state));
	} catch (err) {
		return error(500, { error: { message: err.message } });
	}
});

router.get("/", async () => {
	return json({ status: "OK" });
});

router.all("*", () => missing("Not found"));

router.options("*", handleCors(allowedOrigin));

addEventListener("fetch", (event) =>
	event.respondWith(
		router
			.handle(event.request, event)
			.then((res) => wrapCorsHeader(event.request, res, { allowedOrigin }))
	)
);
