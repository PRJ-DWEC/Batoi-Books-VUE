<script setup>
import { defineProps } from 'vue'
import { useDataStore } from '../stores/datos.js'

defineProps(['book'])
const store = useDataStore()

const getModuleLiteral = (code) => {
    const m = store.getModuleByCode(code)
    return m ? m.cliteral : code
}
</script>

<template>
    <div class="card">
        <div>
            <h3>{{ book.title || 'Libro #' + book.id }}</h3>
            
            <p><strong>Módulo:</strong> {{ getModuleLiteral(book.moduleCode) }}</p>
            <p><strong>Editorial:</strong> {{ book.publisher }}</p>
            <p><strong>Páginas:</strong> {{ book.pages }}</p>
            
            <p><strong>Estado:</strong> {{ book.status }}</p>
            
            <p v-if="book.comments" style="font-style: italic; color: #888;">
                "{{ book.comments }}"
            </p>

            <div class="price-tag">
                {{ book.price }} €
            </div>
        </div>
        
        <slot></slot>
    </div>
</template>