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

	const endpointURL = `${baseUri}/${tweetId}/retweeted_by`;

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

	const endpointURL = `${baseUri}/${tweetId}`;

	const res = await fetch(endpointURL, getRequestParams());
	if (res.ok) return await res.json();

	throw new Error("Unsuccessful request");
};

export const signUp = async (userId: string, userAddress: string) => {
	if (!giveawayId) throw new Error("user id is needed");
	if (!userAddress) throw new Error("user address is needed");

	console.log("🚀 ~ signUp userId", userId, "userAddress", userAddress);
	const userData = {
		userAddress,
	};
	UserKV.saveUser(userId, userData);
	return {
		user: {
			userId,
			...userData,
		},
	};
};

export const checkUserSignUp = async (userId: string) => {
	const user = await UserKV.getUser(userId);
	return !!user;
};

export const drawWinners = async (
	giveawayId: string,
	tweetId: string,
	prizes: string
) => {
	if (!giveawayId) throw new Error("giveaway id is needed");
	if (!tweetId) throw new Error("tweet id is needed");
	if (!prizes) throw new Error("prizes id is needed");

	const retweets = await getAllRetweets(tweetId);

	const winners = [];
	const randoms = [];
	const positions = [];
	for (let i = 0; i < +prizes - 1; i++) {
		const random = randomNewNumber(0, retweets.length, randoms);
		winners.push(retweets[random].id);
		positions.push(i);
		randoms.push(random);
	}

	console.log("🚀 ~ winners", winners);
	console.log("🚀 ~ positions", positions);
	console.log("🚀 ~ randoms", randoms);

	return {
		winners,
		positions,
	};
	// const winnersRange = [...range(0, +prizes - 1)];
	// const winners = winnersRange.map((index) => {
	// 	const random = randomNewNumber(0, retweets.length, []);
	// 	return {
	// 		position: index,
	// 		random,
	// 		winner: retweets[random],
	// 	};
	// });
	// return winners;
};
