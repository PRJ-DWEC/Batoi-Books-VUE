<script setup>
import { useDataStore } from '../stores/datos.js'
const store = useDataStore()
</script>

<template>
    <div id="cart">
        <h3>Carrito</h3>
        <p v-if="store.cart.length === 0">Carrito vacío.</p>
        <ul v-else>
            <li v-for="item in store.cart" :key="item.id">
                {{ item.title || 'Libro ' + item.id }}
            </li>
        </ul>
    </div>
</template>