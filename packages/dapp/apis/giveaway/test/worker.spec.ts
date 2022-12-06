/* eslint-disable camelcase */
// import assert from 'assert'

import { unstable_dev } from 'wrangler'
import type { UnstableDevWorker } from 'wrangler'

const workerUri = process.env.TWITTER_BASE_URL

describe('multi-worker testing', () => {
  let worker: UnstableDevWorker
  beforeAll(async () => {
    worker = await unstable_dev(
      'src/child-worker.js',
      { config: 'src/wrangler.toml' },
      { disableExperimentalWarning: true }
    )
  })
  afterAll(async () => {
    await worker.stop()
  })
  it('childWorker should return Hello World itself', async () => {
    const resp = await worker.fetch()
    if (resp) {
      const text = await resp.text()
      expect(text).toEqual(`"Hello World!"`)
      // expect(text).toMatchInlineSnapshot(`"Hello World!"`)
    }
  })
})
