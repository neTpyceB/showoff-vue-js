import { describe, expect, it } from 'vitest'
import { getRegisteredModuleKeys } from './module-registry'

describe('module registry', () => {
  it('contains the plugin modules exposed by backend manifests', () => {
    expect(getRegisteredModuleKeys()).toEqual(['analytics', 'billing', 'crm', 'settings'])
  })
})
