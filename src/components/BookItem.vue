<script setup>
import { defineProps } from 'vue'
import { store, getModuleImage } from '../stores/datos.js'

defineProps(['book'])

const getModuleLiteral = (code) => {
    const m = store.getModuleByCode(code)
    return m ? m.cliteral : code
}

const resolveImage = (book) => {
    return book.photo || getModuleImage(book.moduleCode);
}
</script>

<template>
    <div class="book-card">
        <div class="image-wrapper">
             <img 
                :src="`/img/${resolveImage(book)}`" 
                :alt="book.title" 
                @error="$event.target.src='/img/logoBatoi.png'"
            />
        </div>

        <div class="info">
            <span class="badge">{{ getModuleLiteral(book.moduleCode) }}</span>
            
            <h3>{{ book.title || 'Libro #' + book.id }}</h3>
            
            <div class="details">
                <p><strong>Editorial:</strong> {{ book.publisher }}</p>
                <p><strong>Páginas:</strong> {{ book.pages }} | <strong>Estado:</strong> {{ book.status }}</p>
                
                <p class="sales-status" :class="book.soldDate ? 'status-sold' : 'status-available'">
                    <strong>Venta:</strong> 
                    {{ book.soldDate ? `Vendido el ${book.soldDate}` : 'Disponible' }}
                </p>

                <p v-if="book.comments" class="comments">
                    <strong>Comentarios:</strong> {{ book.comments }}
                </p>
            </div>

            <div class="price">{{ book.price }} €</div>
        </div>
        
        <slot></slot>
    </div>
</template>

<style scoped>
.book-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    transition: transform 0.2s, box-shadow 0.2s;
}

.book-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.image-wrapper {
    height: 220px;
    background-color: #f9fafb;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border-bottom: 1px solid #f3f4f6;
}

.image-wrapper img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 3px rgba(0,0,0,0.07));
}

.info {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.badge {
    background-color: #e0e7ff;
    color: #4338ca;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    align-self: flex-start;
    margin-bottom: 10px;
}

h3 {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
    color: #111827;
    line-height: 1.4;
}

.details p {
    margin: 6px 0; 
    font-size: 0.9rem;
    color: #4b5563;
}

.sales-status {
    padding: 2px 0;
}
.status-available {
    color: #059669; 
}
.status-sold {
    color: #d97706; 
    font-weight: 500;
}

.comments {
    color: #6b7280;
    margin-top: 8px;
    font-size: 0.9rem;
    background: #f9fafb;
    padding: 8px;
    border-radius: 4px;
    border-left: 3px solid #e5e7eb;
}

.price {
    margin-top: auto;
    padding-top: 15px;
    text-align: right;
    font-size: 1.5rem;
    font-weight: 800;
    color: #111827;
}
</style>