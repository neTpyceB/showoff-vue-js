<script setup lang="ts">
import type { Article } from '../../types/kb'

defineProps<{
  articles: Article[]
  allTags: string[]
  selectedTag: string
  query: string
}>()

const emit = defineEmits<{
  edit: [article: Article]
  remove: [id: string]
  selectTag: [tag: string]
  query: [value: string]
  refresh: []
}>()
</script>

<template>
  <section class="list">
    <div class="filters">
      <input :value="query" aria-label="Search" placeholder="Search docs" @input="emit('query', ($event.target as HTMLInputElement).value)" />
      <button @click="emit('refresh')">Search</button>
    </div>

    <div class="tags">
      <button :class="{ active: !selectedTag }" @click="emit('selectTag', '')">all</button>
      <button v-for="tag in allTags" :key="tag" :class="{ active: selectedTag === tag }" @click="emit('selectTag', tag)">
        {{ tag }}
      </button>
    </div>

    <ul>
      <li v-for="article in articles" :key="article.id">
        <h3>{{ article.title }}</h3>
        <p>{{ article.content.slice(0, 120) }}</p>
        <small>{{ article.tags.join(', ') }}</small>
        <div class="actions">
          <button @click="emit('edit', article)">Edit</button>
          <button @click="emit('remove', article.id)">Delete</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.list {
  display: grid;
  gap: 1rem;
}
.filters {
  display: flex;
  gap: 0.5rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.active {
  font-weight: 700;
}
ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}
li {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.75rem;
}
.actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}
</style>
