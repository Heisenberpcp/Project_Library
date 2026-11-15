import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './view/MainPage.vue'
import LoanPage from './view/LoanPage.vue'
import PopularPage from './view/PopularPage.vue'
import BookDetail from './view/BookDetail.vue'
import LogIn from './view/LogIn.vue'
import RegiSter from './view/RegiSter.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/BookDetail',
      name: 'BookDetail',
      component: BookDetail,
    },
    {
      path: '/LoanPage',
      name: 'loan',
      component: LoanPage,
    },
    {
      path: '/PopularPage',
      name: 'popular',
      component: PopularPage,
    },
    {
      path: '/',
      name: 'login',
      component: LogIn,
    },
     {
      path: '/register',
      name: 'register',
      component: RegiSter,
    },
  ],
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
