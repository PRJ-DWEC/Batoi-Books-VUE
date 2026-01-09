<script setup>
import { ref } from 'vue'
import { useDataStore } from '../stores/datos.js'

const store = useDataStore()

const book = ref({
    moduleCode: '',
    publisher: '',
    price: 0,
    pages: 0,
    status: 'good',
    comments: ''
})

const guardar = async () => {
    try {
        await store.addBook(book.value)
        store.addMessage('Libro añadido con éxito')

        book.value = { moduleCode: '', publisher: '', price: 0, pages: 0, status: 'good', comments: '' }
    } catch (e) {
        console.error(e)
    }
}
</script>

<template>
    <div id="form">
        <h3>Añadir Libro</h3>
        <form @submit.prevent="guardar">
            <div>
                <label>Módulo:</label>
                <select v-model="book.moduleCode" required>
                    <option value="" disabled>- Selecciona -</option>
                    <option v-for="mod in store.modules" :key="mod.code" :value="mod.code">
                        {{ mod.cliteral }}
                    </option>
                </select>
            </div>
            <div>
                <label>Editorial:</label>
                <input type="text" v-model="book.publisher" required />
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" step="0.01" v-model="book.price" required />
            </div>
            <div>
                <label>Páginas:</label>
                <input type="number" v-model="book.pages" required />
            </div>
            <div>
                <label>Estado:</label>
                <input type="radio" value="good" v-model="book.status"> Good
                <input type="radio" value="new" v-model="book.status"> New
                <input type="radio" value="bad" v-model="book.status"> Bad
            </div>
            <div>
                <label>Comentarios:</label>
                <textarea v-model="book.comments"></textarea>
            </div>
            <button type="submit">Añadir</button>
        </form>
    </div>
</template>