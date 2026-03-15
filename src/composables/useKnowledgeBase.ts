import { computed, ref } from 'vue'
import { createArticle, deleteArticle, listArticles, updateArticle } from '../lib/api'
import { parseTags } from '../lib/tags'
import type { Article } from '../types/kb'

export function useKnowledgeBase(token: string) {
  const articles = ref<Article[]>([])
  const query = ref('')
  const selectedTag = ref('')
  const editing = ref<Article | null>(null)

  const allTags = computed(() => [...new Set(articles.value.flatMap((item) => item.tags))].sort())

  async function load() {
    articles.value = await listArticles(query.value, selectedTag.value)
  }

  async function save(payload: { title: string; content: string; tagsInput: string }) {
    const body = {
      title: payload.title,
      content: payload.content,
      tags: parseTags(payload.tagsInput),
    }

    if (!editing.value) {
      await createArticle(token, body)
    } else {
      await updateArticle(token, editing.value.id, body)
      editing.value = null
    }

    await load()
  }

  async function remove(id: string) {
    await deleteArticle(token, id)
    await load()
  }

  return {
    articles,
    query,
    selectedTag,
    editing,
    allTags,
    load,
    save,
    remove,
  }
}
