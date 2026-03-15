import { computed, ref } from 'vue'
import { createArticle, deleteArticle, listArticles, updateArticle } from '../lib/api'
import { parseTags } from '../lib/tags'
import type { Article } from '../types/kb'

export function useKnowledgeBase(token: string) {
  const articles = ref<Article[]>([])
  const query = ref('')
  const selectedTag = ref('')
  const editing = ref<Article | null>(null)
  const loading = ref(false)
  const error = ref('')

  const allTags = computed(() => [...new Set(articles.value.flatMap((item) => item.tags))].sort())

  async function load() {
    loading.value = true
    error.value = ''
    try {
      articles.value = await listArticles(query.value, selectedTag.value)
    } catch {
      articles.value = []
      error.value = 'Unable to load articles. Ensure API is running on localhost:3000.'
    } finally {
      loading.value = false
    }
  }

  async function save(payload: { title: string; content: string; tagsInput: string }) {
    const body = {
      title: payload.title,
      content: payload.content,
      tags: parseTags(payload.tagsInput),
    }

    error.value = ''
    try {
      if (!editing.value) {
        await createArticle(token, body)
      } else {
        await updateArticle(token, editing.value.id, body)
        editing.value = null
      }
      await load()
    } catch {
      error.value = 'Save failed. Check API availability and authentication.'
    }
  }

  async function remove(id: string) {
    error.value = ''
    try {
      await deleteArticle(token, id)
      await load()
    } catch {
      error.value = 'Delete failed. Check API availability and authentication.'
    }
  }

  return {
    articles,
    query,
    selectedTag,
    editing,
    loading,
    error,
    allTags,
    load,
    save,
    remove,
  }
}
