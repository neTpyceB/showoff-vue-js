<script setup lang="ts">
import { onMounted } from 'vue'
import ArticleList from '../components/kb/ArticleList.vue'
import MarkdownEditor from '../components/kb/MarkdownEditor.vue'
import { useAuth } from '../composables/useAuth'
import { useKnowledgeBase } from '../composables/useKnowledgeBase'

const { token } = useAuth()
const kb = useKnowledgeBase(token.value)
const articles = kb.articles
const query = kb.query
const selectedTag = kb.selectedTag
const editing = kb.editing
const allTags = kb.allTags
const loading = kb.loading
const error = kb.error

onMounted(() => {
  void kb.load()
})

async function selectTag(tag: string) {
  kb.selectedTag.value = tag
  await kb.load()
}

async function onQuery(value: string) {
  kb.query.value = value
}
</script>

<template>
  <section class="kb-grid">
    <MarkdownEditor :editing="editing" @cancel="editing = null" @save="kb.save" />
    <ArticleList
      :all-tags="allTags"
      :articles="articles"
      :query="query"
      :selected-tag="selectedTag"
      @edit="editing = $event"
      @query="onQuery"
      @refresh="kb.load"
      @remove="kb.remove"
      @select-tag="selectTag"
    />
  </section>
  <p v-if="loading">Loading...</p>
  <p v-if="error">{{ error }}</p>
</template>

<style scoped>
.kb-grid {
  display: grid;
  gap: 1rem;
}
@media (min-width: 980px) {
  .kb-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
