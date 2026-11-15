<script setup lang="ts">
import BookPoster from '../assets/BookPoster.jpg'
import { ref } from 'vue'
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
  <main>
    <RouterLink to="/BookDetail" class="book-card-link">
      <div class="BookCard">
        <div class="BookPoster">
          <img :src="BookPoster" alt="Book Poster" />
        </div>

        <div class="BookDetails">
          <div class="header">
            <h2>{{ book.title }}</h2>
            <span class="status-badge">Available</span>
          </div>

          <p class="description">
            {{ book.description }}
          </p>

          <div class="meta-grid">
            <p><strong>Author: </strong>{{ book.author }}</p>
            <p><strong>Year:</strong> {{ book.details.publishedDate }}</p>
            <p><strong>Page:</strong> {{ book.details.pages }}</p>
          </div>
        </div>
      </div>
    </RouterLink>
  </main>
</template>

<style scoped>
.book-card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.BookCard {
  display: flex;
  align-items: stretch;
  gap: 24px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  text-decoration: none;
}

.BookCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.BookPoster {
  flex: 0 0 150px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  text-decoration: none;
}

.BookPoster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  text-decoration: none;
}

.BookDetails {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  text-decoration: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  text-decoration: none;
}

.status-badge {
  background-color: #dcfce7;
  color: #166534;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  white-space: nowrap;
  text-decoration: none;
}

.description {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #475569;
}

.meta-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 28px;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
  text-decoration: none;
}

.meta-grid p {
  margin: 0;
  font-size: 14px;
  color: #334155;
  text-decoration: none;
}

.meta-grid strong {
  color: #64748b;
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 600px) {
  .BookCard {
    flex-direction: column;
  }

  .BookPoster {
    flex: none;
    height: 220px;
    text-decoration: none;
  }
}
</style>
