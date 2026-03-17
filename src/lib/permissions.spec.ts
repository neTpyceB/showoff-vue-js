import { describe, expect, it } from 'vitest'
import { canAccess } from './permissions'

describe('permission engine', () => {
  it('grants module manage access when explicit policy exists', () => {
    expect(canAccess(['billing:manage'], 'billing', 'manage')).toBe(true)
  })

  it('blocks manage access when only view policy exists', () => {
    expect(canAccess(['billing:view'], 'billing', 'manage')).toBe(false)
  })

  it('grants platform configure from platform policy', () => {
    expect(canAccess(['platform:configure'], 'settings', 'configure')).toBe(true)
  })
})
