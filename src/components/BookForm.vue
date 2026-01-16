<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { store } from '../stores/datos.js'
import { useRoute, useRouter } from 'vue-router'
import * as api from '../services/api.js'

const route = useRoute()
const router = useRouter()

// Estructura inicial del libro
const emptyBook = { 
    id: '', 
    moduleCode: '', 
    publisher: '', 
    price: 0, 
    pages: 0, 
    status: 'good', 
    comments: '',
    soldDate: '' 
}

const book = ref({ ...emptyBook })

// Detectamos si estamos editando mirando si hay parámetros en la ruta
const isEditing = computed(() => !!route.params.id)

const loadBook = async () => {
    if (isEditing.value) {
        const bookId = route.params.id
        let found = store.books.find(b => b.id == bookId)
        
        if (!found) {
            try {
                found = await api.getDBBook(bookId)
            } catch (e) {
                store.addMessage("Error cargando libro: " + e.message, "error")
                router.push('/')
                return
            }
        }
        book.value = { ...found }
        book.value.id = bookId 
    } else {
        book.value = { ...emptyBook }
    }
}

watch(() => route.params.id, loadBook)

onMounted(() => {
    loadBook()
})

const procesar = async () => {
    // Si añadimos, quitamos el ID para que la API lo genere
    const bookToSend = { ...book.value }
    if (!isEditing.value) delete bookToSend.id;

    if (isEditing.value) {
        await store.updateBook(bookToSend)
    } else {
        await store.addBook(bookToSend)
    }
    router.push('/')
}

const resetForm = () => {
    if (isEditing.value) {
        loadBook() // Restaurar datos originales
    } else {
        book.value = { ...emptyBook } // Limpiar formulario
    }
}
</script>

<template>
    <div class="form-container">
        <h3>{{ isEditing ? 'Estás editando el libro ' + route.params.id : 'Añadir Nuevo Libro' }}</h3>
        
        <form @submit.prevent="procesar">
            <div class="grid-form">
                
                <div class="form-group" v-if="isEditing">
                    <label>ID del Libro</label>
                    <input type="text" v-model="book.id" disabled class="input-disabled"/>
                </div>

                <div class="form-group full-width" v-else></div>

                <div class="form-group full-width">
                    <label>Módulo</label>
                    <select v-model="book.moduleCode" required>
                        <option value="" disabled>- Seleccionar -</option>
                        <option v-for="mod in store.modules" :key="mod.code" :value="mod.code">{{ mod.cliteral }}</option>
                    </select>
                </div>
                
                <div class="form-group full-width">
                    <label>Editorial</label>
                    <input type="text" v-model="book.publisher" required placeholder="Ej: McGraw Hill"/>
                </div>

                <div class="form-group">
                    <label>Precio (€)</label>
                    <input type="number" step="0.01" v-model="book.price" required min="0"/>
                </div>

                <div class="form-group">
                    <label>Páginas</label>
                    <input type="number" v-model="book.pages" required min="1"/>
                </div>

                <div class="form-group full-width">
                    <label>Estado</label>
                    <div class="radios">
                        <label class="radio-label"><input type="radio" value="good" v-model="book.status"> Bueno</label>
                        <label class="radio-label"><input type="radio" value="new" v-model="book.status"> Nuevo</label>
                        <label class="radio-label"><input type="radio" value="bad" v-model="book.status"> Malo</label>
                    </div>
                </div>

                <div class="form-group full-width">
                    <label>Fecha de venta</label>
                    <div class="date-container">
                        <input type="date" v-model="book.soldDate" class="date-input">
                        <span class="sold-message" :class="{ 'vendido': book.soldDate, 'no-vendido': !book.soldDate }">
                            {{ book.soldDate ? `Libro vendido el ${book.soldDate}` : 'Aún no se ha vendido' }}
                        </span>
                    </div>
                </div>

                <div class="form-group full-width">
                    <label>Comentarios</label>
                    <textarea v-model="book.comments" rows="3" placeholder="Opcional..."></textarea>
                </div>
            </div>

            <div class="buttons-group">
                <button type="submit" class="btn-submit">
                    {{ isEditing ? 'Modificar' : 'Guardar Libro' }}
                </button>
                <button type="button" class="btn-reset" @click="resetForm">
                    {{ isEditing ? 'Restaurar Original' : 'Limpiar Formulario' }}
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.form-container {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    border-top: 5px solid #4f46e5;
}

h3 { margin-top: 0; margin-bottom: 20px; color: #111827; }

.grid-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.full-width { grid-column: 1 / -1; }

.form-group label {
    display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem; color: #374151;
}

input, select, textarea {
    width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; color: #111827; background: #fff;
}
input:focus, select:focus, textarea:focus {
    outline: none; border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.input-disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
}

.radios { display: flex; gap: 20px; padding: 5px 0; }
.radio-label { display: flex; align-items: center; gap: 5px; cursor: pointer; font-weight: 400; }

.date-container {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
}
.date-input { max-width: 200px; }
.sold-message {
    font-weight: 600;
    font-size: 0.95rem;
    padding: 6px 12px;
    border-radius: 4px;
}
.sold-message.vendido {
    color: #047857;
    background-color: #d1fae5;
    border: 1px solid #a7f3d0;
}
.sold-message.no-vendido {
    color: #b45309;
    background-color: #fffbeb;
    border: 1px solid #fcd34d;
}

.buttons-group {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}
.btn-submit {
    flex: 2;
    background: #4f46e5;
    color: white; border: none; padding: 12px; font-size: 1rem; font-weight: 600; border-radius: 6px; cursor: pointer; transition: background 0.2s;
}
.btn-submit:hover { background: #4338ca; }

.btn-reset {
    flex: 1;
    background: #e5e7eb;
    color: #374151;
    border: none; padding: 12px; font-size: 1rem; font-weight: 600; border-radius: 6px; cursor: pointer;
}
.btn-reset:hover { background: #d1d5db; }
</style>