<script setup>
import { onMounted } from 'vue'
import { useDataStore } from './stores/datos.js'
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'
import BookForm from './components/BookForm.vue' 
import BooksList from './components/BooksList.vue'
import BooksCart from './components/BooksCart.vue' 
import AppAbout from './components/AppAbout.vue' 

import logo from '../public/logoBatoi.png' 

const store = useDataStore()

onMounted(() => {
    store.fetchBooks()
    store.fetchModules()
})
</script>

<template>
  <div class="container">
    <header>
       <div class="header-brand">
          <img :src="logo" alt="Logo Batoi" class="logo" width="50" style="margin-right: 1rem;"/>
          <h1>BatoiBooks</h1>
       </div>
       <AppMenu />
    </header>
    
    <AppMessages />

    <main>
      <section>
          <BooksList />
       </section>
       <section style="margin-bottom: 2rem;">
          <BookForm />
       </section>

       
       

       <section style="margin-top: 3rem;">
          <AppAbout />
       </section>
    </main>

    <footer>Joan Brotons</footer>
  </div>
</template>

<style>
/* Importamos tus estilos globales */
@import './assets/style.css';
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>