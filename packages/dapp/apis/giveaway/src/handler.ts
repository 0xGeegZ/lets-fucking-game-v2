/* eslint-disable camelcase */
// import needle from 'needle'
// import { webcrypto } from 'crypto'

const token = process.env.TWITTER_BEARER_TOKEN
const baseUri = process.env.TWITTER_BASE_URL

export const getRetweets = async (tweetId: string, pagination_token = '') => {
  console.log('🚀 ~ getRetweets tweetId', tweetId)

  const endpointURL = `${baseUri}${tweetId}/retweeted_by`

  // These are the parameters for the API request
  // by default, only the Tweet ID and text are returned
  const params = {
    'user.fields': 'id,profile_image_url,username',
    max_results: 100,
  }

  if (pagination_token) params.pagination_token = pagination_token

  // this is the HTTP header that adds bearer token authentication
  const res = await fetch('get', endpointURL, params, {
    headers: {
      'User-Agent': 'v2RetweetedByUsersJS',
      authorization: `Bearer ${token}`,
    },
  })

  if (res.body) {
    return res.body
  }
  throw new Error('Unsuccessful request')
}

export const getTweet = async (tweetId: string) => {
  console.log('🚀 ~ getTweet tweetId', tweetId)

  const endpointURL = `${baseUri}${tweetId}`
  // These are the parameters for the API request
  // by default, only the Tweet ID and text are returned
  const params = {}

  // this is the HTTP header that adds bearer token authentication
  const res = await fetch('get', endpointURL, params, {
    headers: {
      'User-Agent': 'v2TweetJS',
      authorization: `Bearer ${token}`,
    },
  })

  if (res.body) {
    return res.body
  }
  throw new Error('Unsuccessful request')
}

export const signUp = async (userId: string, userAddress: string) => {
  console.log('🚀 ~ signUp userId', userId, 'userAddress', userAddress)

  // TODO : save on Redis user data if not already sign up
  throw new Error('Unsuccessful request')
}

export const checkUserSignUp = async (userId: string) => {
  console.log('🚀 ~ checkUserSignUp userId', userId)
  // TODO : check on Redis if we have data for userId and user address
  // If found, return true
  // If not found, return false
  throw new Error('Unsuccessful request')
}

export const drawWinners = async (
  giveawayId: string,
  tweetId: string,
  prizes: number
) => {
  console.log(
    '🚀 ~ drawWinners giveawayId',
    giveawayId,
    'tweetId',
    tweetId,
    'prizes',
    prizes
  )
  // TODO check in Redis if winners already created
  // If already created, throw error
  // If not, draw winners

  const retweets = getRetweets(tweetId)
  console.log('🚀 ~ file: handler.ts:80 ~ drawWinners ~ retweets', retweets)
  // const crypto = webcrypto as unknown as Crypto
  // const random = crypto.getRandomValues(new Uint32Array(1))
  // console.log('🚀 ~ file: handler.ts:75 ~ drawWinners ~ random', random)

  throw new Error('Unsuccessful request')
}
