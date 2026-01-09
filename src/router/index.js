import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../components/BooksList.vue'
import BookForm from '../components/BookForm.vue'
import BooksCart from '../components/BooksCart.vue'
import AppAbout from '../components/AppAbout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: BooksList },
    { path: '/add-book', component: BookForm },
    { path: '/cart', component: BooksCart },
    { path: '/about', component: AppAbout }
  ]
})

export default router