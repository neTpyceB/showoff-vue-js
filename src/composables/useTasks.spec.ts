import { describe, expect, it } from 'vitest'
import { useTasks } from './useTasks'

function createStorage(): Storage {
  let store: Record<string, string> = {}

  return {
    get length() {
      return Object.keys(store).length
    },
    clear() {
      store = {}
    },
    getItem(key) {
      return store[key] ?? null
    },
    key(index) {
      return Object.keys(store)[index] ?? null
    },
    removeItem(key) {
      delete store[key]
    },
    setItem(key, value) {
      store[key] = value
    },
  }
}

describe('useTasks', () => {
  it('creates and toggles tasks', () => {
    const storage = createStorage()
    const api = useTasks(storage)

    api.createTask('Ship feature')
    expect(api.tasks.value).toHaveLength(1)

    const task = api.tasks.value[0]
    expect(task).toBeDefined()
    if (!task) return

    api.toggleTask(task.id)
    expect(api.tasks.value[0]?.done).toBe(true)
  })

  it('removes tasks', () => {
    const api = useTasks(createStorage())

    api.createTask('A')
    const task = api.tasks.value[0]
    expect(task).toBeDefined()
    if (!task) return

    api.removeTask(task.id)

    expect(api.tasks.value).toHaveLength(0)
  })
})
