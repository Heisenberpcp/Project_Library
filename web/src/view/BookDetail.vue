<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import BookPoster from '../assets/BookPoster.jpg'

interface Book {
  title: string
  subtitle: string
  author: string

  genres: string[]

  description: string
  details: {
    publisher: string
    publishedDate: string
    pages: number
    language: string
    isbn: string
    format: string
  }
}

const book = ref<Book>({
  title: 'Where will your book take you?',
  subtitle: 'Secrets of the Forgotten Realm',
  author: 'Sokha Chan',
  genres: ['Fantasy', 'Mystery', 'Adventure'],
  
  description:
    'When a young archivist discovers an uncataloged manuscript hidden beneath the old library, every page begins rewriting itself to match her own memories. To save her city from vanishing into myth, she must uncover the author before the final chapter closes.',
  details: {
    publisher: 'Mekong Press',
    publishedDate: 'October 12, 2026',
    pages: 348,
    language: 'English',
    isbn: '978-9924-55-019-2',
    format: 'Paperback / eBook',
  },
})
</script>

<template>
  <AppHeader />

  <main class="book-detail-container">
    <!-- Top Section: Poster + Core Info -->
    <section class="hero-section">
      <div class="poster-wrapper">
        <img :src="BookPoster" :alt="book.title" class="book-poster" />
      </div>

      <div class="info-wrapper">
        <div class="genres">
          <span v-for="genre in book.genres" :key="genre" class="genre-badge">
            {{ genre }}
          </span>
        </div>

        <h1 class="book-title">{{ book.title }}</h1>
        <p v-if="book.subtitle" class="book-subtitle">{{ book.subtitle }}</p>
        <p class="book-author">
          By <strong>{{ book.author }}</strong>
        </p>

        <div class="action-buttons">
          <button class="btn-primary">Borrow</button>
        </div>

        <div class="synopsis">
          <h2>Description</h2>
          <p>{{ book.description }}</p>
        </div>
      </div>
    </section>

    <!-- Bottom Section: Book Metadata -->
    <section class="metadata-section">
      <h2>Book Details</h2>
      <div class="metadata-grid">
        <div class="meta-item">
          <span class="meta-label">Publisher</span>
          <span class="meta-value">{{ book.details.publisher }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Publication Date</span>
          <span class="meta-value">{{ book.details.publishedDate }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Pages</span>
          <span class="meta-value">{{ book.details.pages }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Language</span>
          <span class="meta-value">{{ book.details.language }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">ISBN</span>
          <span class="meta-value">{{ book.details.isbn }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Format</span>
          <span class="meta-value">{{ book.details.format }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.book-detail-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: #1f2937;
}

.hero-section {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  align-items: start;
}

.book-poster {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  object-fit: cover;
}

.genres {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.genre-badge {
  background: #eef2ff;
  color: #4f46e5;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
}

.book-title {
  font-size: 2rem;
  margin: 0;
  line-height: 1.2;
}

.book-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0.35rem 0 0.75rem;
}

.book-author {
  margin: 0 0 0.75rem;
  font-size: 1rem;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stars {
  color: #f59e0b;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 0.95rem;
}

.btn-primary {
  background: #4f46e5;
  color: white;
}

.btn-primary:hover {
  background: #4338ca;
}

.btn-secondary {
  background: #f3f4f6;
  color: #1f2937;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.synopsis h2,
.metadata-section h2 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.synopsis p {
  line-height: 1.6;
  color: #374151;
}

.metadata-section {
  margin-top: 3rem;
}

.metadata-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-top: 1rem;
}

.meta-item {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.8rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.meta-value {
  font-weight: 600;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
  }

  .poster-wrapper {
    max-width: 240px;
    margin: 0 auto;
  }
}
</style>
