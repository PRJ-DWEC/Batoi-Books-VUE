<script setup>
import { store } from '../stores/datos.js'
</script>

<template>
    <div class="cart-panel">
        <h3>Carrito de Compra</h3>
        <div v-if="store.cart.length === 0" class="empty">
            <p>El carrito está vacío</p>
        </div>
        <ul v-else class="cart-list">
            <li v-for="(item, index) in store.cart" :key="index">
                {{ item.title || 'Libro ' + item.id }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.cart-panel {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    border: 1px solid #eee;
    position: sticky;
    top: 20px;
}
h3 { margin-top: 0; color: #2c3e50; border-bottom: 2px solid #f4f4f4; padding-bottom: 10px; }
.empty { color: #999; font-style: italic; }
.cart-list { list-style: none; padding: 0; margin: 0; }
.cart-list li { padding: 8px 0; border-bottom: 1px solid #f9f9f9; font-size: 0.95rem; }
</style>