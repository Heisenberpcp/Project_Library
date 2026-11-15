<script setup lang="ts">
import BookCard from '../components/BookCard.vue'
import AppHeader from '../components/AppHeader.vue'
</script>
<template>
  <AppHeader />
  <main>
    <div class="book-card-container">
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
    </div>
  </main>
</template>

<style scoped>
.book-card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}
</style>
