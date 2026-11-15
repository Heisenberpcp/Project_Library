<script setup lang="ts">
import BookCard from '../components/BookCard.vue'
import Search from '../components/SearchBar.vue'
import AppHeader from '../components/AppHeader.vue'
</script>
<template>
  <AppHeader />
  <main>
    
    <section>
      <Search />
    </section>
    <div class="book-card-container">
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
    </div>
  </main>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: full;
}
.book-card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}
</style>
