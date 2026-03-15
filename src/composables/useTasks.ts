import { computed, ref, watch } from 'vue'
import type { Task } from '../types.task'

const STORAGE_KEY = 'task-manager:v1'

export function useTasks(storage: Storage = window.localStorage) {
  const tasks = ref<Task[]>(load(storage))

  watch(
    tasks,
    (value) => {
      storage.setItem(STORAGE_KEY, JSON.stringify(value))
    },
    { deep: true },
  )

  const activeCount = computed(() => tasks.value.filter((task) => !task.done).length)

  function createTask(title: string) {
    const normalized = title.trim()
    if (!normalized) return

    const now = new Date().toISOString()
    tasks.value.unshift({
      id: crypto.randomUUID(),
      title: normalized,
      done: false,
      createdAt: now,
      updatedAt: now,
    })
  }

  function updateTask(id: string, title: string) {
    const normalized = title.trim()
    if (!normalized) return

    const task = tasks.value.find((item) => item.id === id)
    if (!task) return

    task.title = normalized
    task.updatedAt = new Date().toISOString()
  }

  function toggleTask(id: string) {
    const task = tasks.value.find((item) => item.id === id)
    if (!task) return

    task.done = !task.done
    task.updatedAt = new Date().toISOString()
  }

  function removeTask(id: string) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  return {
    tasks,
    activeCount,
    createTask,
    updateTask,
    toggleTask,
    removeTask,
  }
}

function load(storage: Storage): Task[] {
  const raw = storage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as Task[]
    return Array.isArray(parsed)
      ? parsed.filter((task) => task?.id && task?.title && typeof task.done === 'boolean')
      : []
  } catch {
    return []
  }
}
