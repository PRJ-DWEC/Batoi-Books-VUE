// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../components/BooksList.vue'
import BookForm from '../components/BookForm.vue'
import BooksCart from '../components/BooksCart.vue'
import AboutView from '../views/AboutView.vue'
import AppAbout from '@/components/AppAbout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BooksList
    },
    {
      path: '/add-book',
      name: 'add-book',
      component: BookForm
    },
    {
      path: '/edit-book/:id',
      name: 'edit-book',
      component: BookForm,
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: BooksCart
    },
    {
      path: '/about',
      name: 'about',
      component: AppAbout
    }
  ]
})

export default router