<script setup>
import { store } from '../stores/datos.js'
import BookItem from './BookItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const eliminar = (book) => {
    const mod = store.getModuleByCode(book.moduleCode)
    const nombreModulo = mod ? mod.cliteral : 'Desconocido'

    if (confirm(`¿Va a borrar el libro con ID: ${book.id} del módulo: ${nombreModulo}?`)) {
        store.deleteBook(book.id)
    }
}

const editar = (id) => {
    router.push({ name: 'edit-book', params: { id } })
}
</script>

<template>
    <div class="books-grid-container">
        <BookItem v-for="book in store.books" :key="book.id" :book="book">
            <div class="actions">
                <button class="btn-icon" disabled title="Próximamente">
                    <span class="material-icons">add_shopping_cart</span>
                </button>
                <button class="btn-icon" @click="editar(book.id)" title="Editar">
                    <span class="material-icons">edit</span>
                </button>
                <button class="btn-icon btn-delete" @click="eliminar(book)" title="Eliminar">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        </BookItem>
    </div>
</template>

<style scoped>
.books-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
}

/* Botones */
.actions {
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
.btn-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%; /* Redondos */
    border: 1px solid #e0e0e0;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    transition: all 0.2s ease;
}
.btn-icon:hover:not(:disabled) {
    background: #eef2ff;
    color: #4f46e5;
    border-color: #4f46e5;
}
.btn-delete:hover {
    background: #fff5f5;
    color: #e53e3e;
    border-color: #e53e3e;
}
button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}
</style>