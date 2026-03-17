import { describe, expect, it } from 'vitest'
import { canEdit } from './permissions'

describe('permissions', () => {
  it('allows admin/editor to edit', () => {
    expect(canEdit('admin')).toBe(true)
    expect(canEdit('editor')).toBe(true)
  })

  it('denies viewer edits', () => {
    expect(canEdit('viewer')).toBe(false)
  })
})
