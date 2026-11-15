<script setup lang="ts">
import avatar from '../assets/avatar.png'
</script>
<template>
  <header class="navbar">
   
    <div class="logo">Logo</div>

    <nav class="nav-links">
     <RouterLink to="/home"> <a href="#home">Home</a></RouterLink>
      <RouterLink to="/loanPage"> <a href="#loan">Loan</a></RouterLink>
      <RouterLink to="/popularPage"> <a href="#popular">Popular</a></RouterLink>
    </nav>

    <!-- Right: Circular User Profile at the End -->
    <div class="user-circle">
      <img :src="avatar" alt="User avatar" />
    </div>
  </header>
</template>

<style scoped>
.navbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

/* 1. Bigger Logo on the left */
.logo {
  justify-self: start;
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
}

/* 2. Three components centered in the middle */
.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #374151;
  font-size: 1rem;
  font-weight: 500;
}

.nav-links a:hover {
  color: #000000;
}

/* 3. Circular User element at the far right */
.user-circle {
  justify-self: end;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
