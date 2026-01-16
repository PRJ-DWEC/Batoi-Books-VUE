<script setup>
import { onMounted } from 'vue'
import { store } from './stores/datos.js'
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'
// Eliminamos la importación de AppAbout porque ya no va en el footer
// import AppAbout from './components/AppAbout.vue' 
import logo from '/logoBatoi.png' 

onMounted(() => {
    store.fetchBooks()
    store.fetchModules()
})
</script>

<template>
  <div id="app-wrapper">
    <header class="main-header">
       <div class="header-content">
          <div class="brand">
             <img :src="logo" alt="BatoiBooks" width="40"/>
             <h1>BatoiBooks</h1>
          </div>
          <AppMenu />
       </div>
    </header>
    
    <AppMessages />

    <div class="main-container">
        <main class="content-area">
            <router-view></router-view>
        </main>
    </div>

    <footer>
        <p>BatoiBooks Vue - Desarrollado por <strong>Joan Brotons</strong></p>
    </footer>
  </div>
</template>

<style>
body {
    margin: 0;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    background-color: #f8f9fa; /* Fondo gris muy claro elegante */
    color: #333;
    line-height: 1.6;
}
* {
    box-sizing: border-box;
}
</style>

<style scoped>
#app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Header */
.main-header {
    background: white;
    border-bottom: 1px solid #e0e0e0;
    padding: 0.8rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}
.header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.brand {
    display: flex;
    align-items: center;
    gap: 12px;
}
.brand h1 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
}

/* Contenedor Principal */
.main-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 20px;
    width: 100%;
    flex: 1; /* Empuja el footer abajo */
}

.content-area {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

/* Totales */
.totales-bar {
    background-color: #2c3e50;
    color: white;
    padding: 1.5rem 2rem;
    text-align: right;
    font-size: 1.1rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    display: flex;
    justify-content: flex-end;
    gap: 30px;
}

/* Footer */
footer {
    text-align: center;
    padding: 2rem;
    color: #888;
    background: white;
    border-top: 1px solid #eee;
    margin-top: auto;
}
</style>