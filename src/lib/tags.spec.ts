import { describe, expect, it } from 'vitest'
import { parseTags, toTagInput } from './tags'

describe('tags helpers', () => {
  it('parses tags with normalization and dedupe', () => {
    expect(parseTags(' Vue, api,vue,  testing ')).toEqual(['vue', 'api', 'testing'])
  })

  it('serializes tags', () => {
    expect(toTagInput(['vue', 'api'])).toBe('vue, api')
  })
})
