/* eslint-disable camelcase */

import crypto from "crypto";

import { UserKV } from "./kv";
import { range, randomNumber, randomNewNumber } from "./utils";
import { getRequestParams } from "./helper";

import { stringify } from "query-string";

const baseUri = TWITTER_BASE_URL;

export const getAllRetweets = async (tweetId: string) => {
	if (!tweetId) throw new Error("tweet id is needed");

	let result = [];
	let isNextResults = true;
	let pagination = "";

	while (isNextResults) {
		const paginateResults = await getRetweets(tweetId, pagination);
		result = result.concat(paginateResults?.data);
		isNextResults = !!paginateResults?.meta?.next_token;
		pagination = paginateResults?.meta?.next_token;
	}

	return result;
};

export const getRetweets = async (tweetId: string, pagination_token = "") => {
	if (!tweetId) throw new Error("tweet id is needed");

	const endpointURL = `${baseUri}/2/tweets/${tweetId}/retweeted_by`;

	const params = {
		"user.fields": "id,profile_image_url,username",
		max_results: 100,
	};

	if (pagination_token) params.pagination_token = pagination_token;

	const endpointWithParamsURL = `${endpointURL}?${stringify(params)}`;

	const res = await fetch(endpointWithParamsURL, getRequestParams());

	if (res.ok) return await res.json();

	throw new Error("Unsuccessful request");
};

export const getTweet = async (tweetId: string) => {
	if (!tweetId) throw new Error("tweet id is needed");

	const endpointURL = `${baseUri}/2/tweets/${tweetId}`;

	const res = await fetch(endpointURL, getRequestParams());
	if (res.ok) return await res.json();

	throw new Error("Unsuccessful request");
};

export const signUp = async (
	userId: string,
	userAddress: string,
	accessToken: string
) => {
	if (!userId) throw new Error("user id is needed");
	if (!userAddress) throw new Error("user address is needed");
	if (!accessToken) throw new Error("user access token is needed");

	const user = await UserKV.getUser(userId);
	if (!user) throw new Error("no user found");
	if (checkUserSignUp(userId)) throw new Error("user already sign up");
	if (user.accessToken !== accessToken) throw new Error("accessToken mismatch");

	const userData = {
		...user,
		isRegistered: true,
		userAddress,
	};

	UserKV.saveUser(userId, userData);
	return {
		userId,
		...userData,
	};
};

export const checkUserSignUp = async (userId: string) => {
	const user = await UserKV.getUser(userId);
	return user?.isRegistered || false;
};

export const drawWinners = async (
	giveawayId: string,
	tweetId: string,
	retweetMaxCount: number,
	prizes: number
) => {
	if (!giveawayId) throw new Error("giveaway id is needed");
	if (!tweetId) throw new Error("tweet id is needed");
	if (typeof retweetMaxCount === "undefined")
		throw new Error("retweetMaxCount id is needed");
	if (!prizes) throw new Error("prizes id is needed");

	const retweets = await getAllRetweets(tweetId);

	// TODO order retweets by date if needed ?

	const winners = [],
		randoms = [],
		positions = [];
	const retweetCountLimit =
		retweetMaxCount && retweets.length > retweetMaxCount
			? retweetMaxCount
			: retweets.length;

	for (let i = 0; i < +prizes; i++) {
		const random = randomNewNumber(0, retweetCountLimit, randoms);
		winners.push(retweets[random].id);
		positions.push(i);
		randoms.push(random);
	}

	return {
		winners,
		positions,
	};
};
