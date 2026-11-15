<!-- src/components/SearchBar.vue -->
<script setup lang="ts">
import { ref } from 'vue'

export type SearchField = 'title' | 'author' | 'year'
export type SortOption = 'title' | 'new' | 'old'

const searchQuery = ref('')
const searchBy = ref<SearchField>('title')
const sortBy = ref<SortOption>('title') // Added missing ref

const emit = defineEmits<{
  (e: 'search', payload: { query: string; field: SearchField; sort: SortOption }): void
}>()

function handleSearch() {
  emit('search', {
    query: searchQuery.value,
    field: searchBy.value,
    sort: sortBy.value,
  })
}
</script>

<template>
  <div class="search-container">
    <form class="search-bar" @submit.prevent="handleSearch">
      <input
        v-model="searchQuery"
        type="search"
        class="search-input"
        :placeholder="`Search by ${searchBy}...`"
        @input="handleSearch"
      />

      <button type="submit" class="search-btn">Search</button>
      <select v-model="searchBy" class="search-select" @change="handleSearch">
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="year">Year</option>
      </select>
    </form>

    <div class="results-toolbar">
      <div class="sort-control">
        <label for="sort-select" class="sort-label">Sort by:</label>
        <select id="sort-select" v-model="sortBy" class="sort-select" @change="handleSearch">
          <option value="title">A-Z</option>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>
        <h1 class="results-title">
          Results<span v-if="searchQuery">: "6"</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
  max-width: 800px;
  margin: 1rem auto;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.search-select,
.search-input,
.search-btn {
  padding: 10px 14px;
  font-size: 0.95rem;
  border-radius: 6px;
}

.search-select {
  border: 1px solid #d1d5db;
  background-color: #f9fafb;
  color: #1f2937;
  cursor: pointer;
}

.search-input {
  flex: 1; /* Takes remaining width without squishing neighbors */
  border: 1px solid #d1d5db;
  outline: none;
}

.search-input:focus {
  border-color: #42b883;
}

.search-btn {
  background-color: #42b883;
  color: white;
  font-weight: 500;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.search-btn:hover {
  background-color: #369f70;
}

.results-toolbar {
  display: flex;
  justify-content: space-between; /* Places title on left, sort on right */
  align-items: center;
  margin-top: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.sort-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.sort-select {
  padding: 0.45rem 0.75rem;
  font-size: 0.875rem;
  color: #1f2937;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
}

.results-title {
  font-size: 1.25rem;
  font-weight: 400;
  color: #4b5563;
  margin: 0;
}
</style>
