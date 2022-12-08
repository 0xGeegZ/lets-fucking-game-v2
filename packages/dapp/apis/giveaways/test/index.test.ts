describe("Giveaway worker testing", () => {
	const fetchParams = {
		mode: "cors",
		credentials: "include",
		headers: {
			"Access-Control-Allow-Origin": "*",
			Origin: "localhost:3000",
		},
	};
	const workerUri = "http://127.0.0.1:8787";
	// const workerUri = WORKER_BASE_URL;

	const tweetId = "1598053432232796160";
	const userId = "3779781136";

	describe("Tweeter endpoints", () => {
		it("Should return tweet data", async () => {
			return fetch(`${workerUri}/tweets/${tweetId}`, fetchParams)
				.then((res) => res.json())
				.then((json: any) => {
					expect(json).toBeDefined();
				});
		});

		it("Should return retweet data for tweet id", async () => {
			return fetch(`${workerUri}/tweets/${tweetId}/retweets`, fetchParams)
				.then((res) => res.json())
				.then((json: any) => {
					expect(json).toBeDefined();
				});
		});
	});

	describe("Giveaway endpoints", () => {
		it("Should draw 1 winners for not already drawn giveaway", async () => {
			return fetch(
				`${workerUri}/chains/1/giveaways/1/winners?tweetId=${tweetId}&prizes=1`,
				fetchParams
			)
				.then((res) => res.json())
				.then((json: any) => {
					expect(json).toBeDefined();
					expect(json.winners).toBeDefined();
					expect(json.positions).toBeDefined();
					expect(json.winners.length).toEqual(1);
					expect(json.winners.length).toEqual(json.positions.length);
				});
		});

		it("Should draw 2 winners for not already drawn giveaway", async () => {
			return fetch(
				`${workerUri}/chains/1/giveaways/1/winners?tweetId=${tweetId}&prizes=2`,
				fetchParams
			)
				.then((res) => res.json())
				.then((json: any) => {
					expect(json).toBeDefined();
					expect(json.winners).toBeDefined();
					expect(json.positions).toBeDefined();
					expect(json.winners.length).toEqual(2);
					expect(json.winners.length).toEqual(json.positions.length);
				});
		});

		it("Should draw winner for not already drawn giveaway", async () => {
			return fetch(
				`${workerUri}/chains/1/giveaways/1/refresh?tweetId=${tweetId}`,
				fetchParams
			)
				.then((res) => res.json())
				.then((json: any) => {
					expect(json).toBeDefined();
					expect(json.retweetCount).toBeDefined();
				});
		});
	});

	describe("User endpoints", () => {
		it("Should check if user has signed up", async () => {
			return fetch(`${workerUri}/users/${userId}`, fetchParams)
				.then((res) => res.json())
				.then((json: any) => {
					expect(json).toBeDefined();
					expect(json.isValidate).toBeDefined();
					expect(json.isValidate).toBe(false);
				});
		});
	});
});

export {};
