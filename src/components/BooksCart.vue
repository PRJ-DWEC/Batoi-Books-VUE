<script setup>
import { useDatosStore } from '../stores/datos.js' // 1. Importamos el hook
import BookItem from './BookItem.vue'

const store = useDatosStore() // 2. Inicializamos el store

const removeFromCart = (id) => {
    store.removeFromCart(id);
}

const clearCart = () => {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        store.clearCart();
    }
}

const checkout = () => {
    store.checkout();
}
</script>

<template>
    <div class="cart-container">
        <h2>Carrito de Compra</h2>
        
        <div v-if="store.cart.length === 0" class="empty-msg">
            <p>El carrito está vacío</p>
        </div>

        <div v-else>
            <div class="cart-grid">
                <BookItem v-for="book in store.cart" :key="book.id" :book="book">
                    <div class="actions">
                        <button 
                            class="btn-icon btn-delete" 
                            @click="removeFromCart(book.id)" 
                            title="Eliminar del carrito"
                        >
                            <span class="material-icons">remove_shopping_cart</span>
                        </button>
                    </div>
                </BookItem>
            </div>

            <div class="cart-summary">
                <div class="totals">
                    <p>Total Libros: <strong>{{ store.cartTotalItems }}</strong></p>
                    <p>Importe Total: <strong class="price-highlight">{{ store.cartTotalAmount }} €</strong></p>
                </div>
                
                <div class="cart-actions">
                    <button class="btn btn-secondary" @click="clearCart">
                        Vaciar carrito
                    </button>
                    <button class="btn btn-primary" @click="checkout">
                        Realizar compra
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-container {
    padding: 20px;
}
.empty-msg {
    text-align: center;
    color: #666;
    font-size: 1.2rem;
    margin-top: 40px;
}
.cart-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
}

.actions {
    margin-top: auto;
    padding: 15px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
}
.btn-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #e0e0e0;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    transition: all 0.2s ease;
}
.btn-delete:hover {
    background: #fff5f5;
    color: #e53e3e;
    border-color: #e53e3e;
}

/* Resumen */
.cart-summary {
    background: white;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}
.totals p {
    margin: 5px 0;
    font-size: 1.1rem;
    color: #374151;
}
.price-highlight {
    color: #4f46e5;
    font-size: 1.5rem;
}
.cart-actions {
    display: flex;
    gap: 15px;
}
.btn {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: opacity 0.2s, transform 0.1s;
}
.btn:hover { opacity: 0.9; }
.btn:active { transform: scale(0.98); }

.btn-secondary {
    background-color: #ef4444;
    color: white;
}
.btn-primary {
    background-color: #4f46e5;
    color: white;
}
</style>