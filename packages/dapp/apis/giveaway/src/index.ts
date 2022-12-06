/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// TODO add Redis database
// SEE https://docs.upstash.com/redis/tutorials/cloudflare_workers_with_redis

// SEE config for bidings and twitter V1 config
// SEE github.com/ardasoyturk/cloudflare-worker-twitter/tree/master/src

// For worker configuration for twitter Authr
// SEE : https://blog.cloudflare.com/oauth-2-0-authentication-server/

import { Router } from 'itty-router'
import { error, json, missing } from 'itty-router-extras'
import {
  handleCors,
  wrapCorsHeader,
  requireTweetId,
  requireUserId,
  requireGiveawayId,
  requireUserAddress,
} from './helper'
import {
  getRetweets,
  getTweet,
  checkUserSignUp,
  signUp,
  drawWinners,
} from './handler'

const router = Router()

const allowedOrigin = /[^\w](lfgames\.xyz)|(localhost:3000)|(lfgames.finance)$/

router.get('/tweets/:tweetId/retweets', async ({ params }) => {
  const isParamError = requireTweetId(params)
  if (isParamError) return isParamError

  const { tweetId } = params!

  try {
    const result = await getRetweets(
      tweetId,
      null /* TODO add pagination token */
    )
    return json(result.map((r) => r))
  } catch (err) {
    return error(500, { err })
  }
})

router.get('/tweets/:tweetId', async ({ params }) => {
  const isParamError = requireTweetId(params)
  if (isParamError) return isParamError

  const { tweetId } = params!

  try {
    return json(await getTweet(tweetId))
  } catch (err) {
    return error(500, { err })
  }
})

router.get('/giveaway/:giveawayId/winners', async ({ params, query }) => {
  const isParamError = requireGiveawayId(params)
  if (isParamError) return isParamError

  const isQueryTweetIdError = requireTweetId(query)
  if (isQueryTweetIdError) return isQueryTweetIdError

  const isQueryPrizesError = requirePrizes(query)
  if (isQueryPrizesError) return isQueryPrizesError

  const { giveawayId } = params!
  // TODO : those data should be loaded via multicall and on chain request
  const { prizes, tweetId } = query!

  try {
    return json(await drawWinners(giveawayId, tweetId, prizes))
  } catch (err) {
    return error(500, { err })
  }
})

router.get('/users/:userId', async ({ params }) => {
  const isParamError = requireUserId(params)
  if (isParamError) return isParamError

  const { userId } = params!

  try {
    return json(await checkUserSignUp(userId))
  } catch (err) {
    return error(500, { err })
  }
})

router.post('/users', async ({ query }) => {
  const isQueryUserIdError = requireUserId(query)
  if (isQueryUserIdError) return isQueryUserIdError

  const isQueryAddressError = requireUserAddress(query)
  if (isQueryAddressError) return isQueryAddressError

  const { userId, userAddress } = query!

  try {
    return json(await signUp(userId, userAddress))
  } catch (err) {
    return error(500, { err })
  }
})

router.get('/', async () => {
  return json({ status: 'OK' })
})

router.all('*', () => missing('Not found'))

router.options('*', handleCors(allowedOrigin))

addEventListener('fetch', (event) =>
  event.respondWith(
    router
      .handle(event.request, event)
      .then((res) => wrapCorsHeader(event.request, res, { allowedOrigin }))
  )
)
