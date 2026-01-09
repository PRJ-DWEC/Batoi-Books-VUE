<script setup>
import { computed } from 'vue'
import { useDataStore } from '../stores/datos.js'
import BookItem from './BookItem.vue'

const store = useDataStore()

// Variables computed para totales (pedidas en el enunciado)
const totalLibros = computed(() => store.books.length)
const importeTotal = computed(() => {
    return store.books.reduce((acc, book) => acc + Number(book.price), 0).toFixed(2)
})

const eliminar = (book) => {
    const mod = store.getModuleByCode(book.moduleCode)
    const nombreModulo = mod ? mod.cliteral : 'Desconocido'

    // Confirmación estricta: ID y nombre del módulo
    if (confirm(`¿Va a borrar el libro con ID: ${book.id} del módulo: ${nombreModulo}?`)) {
        store.deleteBook(book.id)
        store.addMessage(`Libro eliminado correctamente`)
    }
}
</script>

<template>
    <div class="books-list">
        <h2>Listado de Libros</h2>
        
        <div id="list">
            <BookItem v-for="book in store.books" :key="book.id" :book="book">
                <div class="card-buttons">
                    <button class="btn-cart" disabled><span class="material-icons">add_shopping_cart</span></button>
                    <button class="btn-edit" disabled><span class="material-icons">edit</span></button>
                    <button class="btn-delete" @click="eliminar(book)">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            </BookItem>
        </div>

        <div class="totales">
            <h3>Total de libros listados: {{ totalLibros }}</h3>
            <h3>Importe total: {{ importeTotal }} €</h3>
        </div>
    </div>
</template>