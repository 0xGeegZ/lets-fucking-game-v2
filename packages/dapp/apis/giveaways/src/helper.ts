import { Obj } from "itty-router";
import { error } from "itty-router-extras";
import { UserKV } from "./kv";

export const requireField = (field: string, params: Obj | undefined) => {
	if (!params) {
		return error(400, "Invalid params");
	}
	const value = params[field];
	if (!value) {
		return error(400, "Invalid field", field);
	}
	return null;
};

function isString(s: any): s is string {
	return typeof s === "string" || s instanceof String;
}

export const isOriginAllowed = (origin: string | null, allowedOrigin: any) => {
	if (Array.isArray(allowedOrigin)) {
		for (let i = 0; i < allowedOrigin.length; ++i) {
			if (isOriginAllowed(origin, allowedOrigin[i])) {
				return true;
			}
		}
		return false;
	}
	if (isString(allowedOrigin)) {
		return origin === allowedOrigin;
	}
	if (origin && allowedOrigin instanceof RegExp) {
		return allowedOrigin.test(origin);
	}
	return !!allowedOrigin;
};

export const handleCors = (allowedOrigin: any) => (request: Request) => {
	const reqOrigin = request.headers.get("origin");
	const isAllowed = isOriginAllowed(reqOrigin, allowedOrigin);
	const methods = `GET, HEAD, OPTIONS`;
	const headers = `referer, origin, content-type`;
	if (isAllowed && reqOrigin) {
		const corsHeaders = {
			"Access-Control-Allow-Origin": reqOrigin,
			"Access-Control-Allow-Methods": methods,
			"Access-Control-Allow-Headers": headers,
		};
		// Handle CORS pre-flight request.
		return new Response(null, {
			status: 204,
			headers: corsHeaders,
		});
	}
	console.info("Origin not allowed from Cors", reqOrigin);
	// Handle standard OPTIONS request.
	return new Response(null, {
		headers: {
			Allow: methods,
		},
	});
};

export const wrapCorsHeader = (
	request: Request,
	response: Response,
	options: any = {}
) => {
	const { allowedOrigin = "*" } = options;
	const reqOrigin = request.headers.get("origin");
	const isAllowed = isOriginAllowed(reqOrigin, allowedOrigin);
	if (isAllowed && reqOrigin) {
		response.headers.set("Access-Control-Allow-Origin", reqOrigin);
	}
	console.info("Origin not allowed", reqOrigin);

	return response;
};

export const getAppBearerToken = () => {
	const token = TWITTER_BEARER_TOKEN;

	// generate new BEARER TOKEN if needed
	// const cached = KV_CACHE && (await UserKV.getBearerToken());
	// if (
	// 	!cached ||
	// 	Date.now() - new Date(cached.updatedAt).getTime() > 2 * 1000 * 60
	// ) {
	// 	if (KV_CACHE) {
	// 		console.info("no cached found!");
	// 	}
	// 	console.info("refreshing bearer token");
	// }

	return token;
};

export const getRequestParams = () => {
	return {
		headers: {
			"User-Agent": "LFGames",
			authorization: `Bearer ${getAppBearerToken()}`,
		},
	};
};
