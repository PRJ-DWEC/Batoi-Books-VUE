<script setup>
import { onMounted, computed, watch } from 'vue'
import { useDatosStore } from '../stores/datos.js'
import { useRoute, useRouter } from 'vue-router'
import * as api from '../services/api.js'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const route = useRoute()
const router = useRouter()
const store = useDatosStore()


const validationSchema = yup.object({
    id: yup.string().nullable(),
    
  
    moduleCode: yup.string()
        .required('El módulo es obligatorio')
        .test('is-unique', 'No puedes tener dos libros del mismo módulo', function (value) {
        
            if (!value) return true;

            const existingBook = store.books.find(book => book.moduleCode === value);

            if (!existingBook) return true;

            
            if (route.params.id && String(existingBook.id) === String(route.params.id)) {
                return true; // Es el mismo libro, permitimos guardar
            }

   
            return false;
        }),

    publisher: yup.string().required('La editorial es obligatoria'),
    

    price: yup.number()
        .typeError('Debe ser un número')
        .required('El precio es obligatorio')
        .min(0, 'El precio debe ser mayor o igual a 0'),

    pages: yup.number()
        .typeError('Debe ser un número')
        .required('Las páginas son obligatorias')
        .min(0, 'Debe ser mayor o igual a 0')
        .integer('Debe ser un número entero'),

    status: yup.string().required('El estado es obligatorio'),
    soldDate: yup.string().nullable(),
    comments: yup.string().nullable()
})


const emptyBook = { 
    id: '', 
    moduleCode: '', 
    publisher: '', 
    price: null, 
    pages: null, 
    status: 'good', 
    comments: '',
    soldDate: '' 
}


const { handleSubmit, errors, defineField, setValues, resetForm: resetVeeForm } = useForm({
    validationSchema,
    initialValues: emptyBook
})


const [id] = defineField('id')
const [moduleCode] = defineField('moduleCode')
const [publisher] = defineField('publisher')
const [price] = defineField('price')
const [pages] = defineField('pages')
const [status] = defineField('status')
const [comments] = defineField('comments')
const [soldDate] = defineField('soldDate')

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
        setValues({ ...found, id: bookId }) 
    } else {
        resetVeeForm({ values: emptyBook })
    }
}

watch(() => route.params.id, (newVal) => {
    loadBook()
})

onMounted(async () => {

    await store.fetchBooks()
    await store.fetchModules()
    loadBook()
})


const procesar = handleSubmit(async (values) => {
    const bookToSend = { ...values }
    
    
    if (!isEditing.value) delete bookToSend.id;

    if (isEditing.value) {
        await store.updateBook(bookToSend)
    } else {
        await store.addBook(bookToSend)
    }
    router.push('/')
})

const resetForm = () => {
    loadBook()
}
</script>

<template>
    <div class="form-container">
        <h3>{{ isEditing ? 'Estás editando el libro ' + route.params.id : 'Añadir Nuevo Libro' }}</h3>
        
        <form @submit.prevent="procesar">
            <div class="grid-form">
                
                <div class="form-group" v-if="isEditing">
                    <label>ID del Libro</label>
                    <input type="text" v-model="id" disabled class="input-disabled"/>
                </div>

                <div class="form-group full-width" v-else></div>

                <div class="form-group full-width">
                    <label>Módulo</label>
                    <select v-model="moduleCode" :class="{ 'input-error': errors.moduleCode }">
                        <option value="" disabled>- Seleccionar -</option>
                        <option v-for="mod in store.modules" :key="mod.code" :value="mod.code">
                            {{ mod.cliteral }}
                        </option>
                    </select>
                    <span class="error-msg" v-if="errors.moduleCode">{{ errors.moduleCode }}</span>
                </div>
                
                <div class="form-group full-width">
                    <label>Editorial</label>
                    <input type="text" v-model="publisher" placeholder="Ej: McGraw Hill" :class="{ 'input-error': errors.publisher }"/>
                    <span class="error-msg" v-if="errors.publisher">{{ errors.publisher }}</span>
                </div>

                <div class="form-group">
                    <label>Precio (€)</label>
                    <input type="number" step="0.01" v-model="price" :class="{ 'input-error': errors.price }"/>
                    <span class="error-msg" v-if="errors.price">{{ errors.price }}</span>
                </div>

                <div class="form-group">
                    <label>Páginas</label>
                    <input type="number" v-model="pages" :class="{ 'input-error': errors.pages }"/>
                    <span class="error-msg" v-if="errors.pages">{{ errors.pages }}</span>
                </div>

                <div class="form-group full-width">
                    <label>Estado</label>
                    <div class="radios">
                        <label class="radio-label"><input type="radio" value="good" v-model="status"> Bueno</label>
                        <label class="radio-label"><input type="radio" value="new" v-model="status"> Nuevo</label>
                        <label class="radio-label"><input type="radio" value="bad" v-model="status"> Malo</label>
                    </div>
                    <span class="error-msg" v-if="errors.status">{{ errors.status }}</span>
                </div>

                <div class="form-group full-width">
                    <label>Fecha de venta</label>
                    <div class="date-container">
                        <input type="date" v-model="soldDate" class="date-input">
                        <span class="sold-message" :class="{ 'vendido': soldDate, 'no-vendido': !soldDate }">
                            {{ soldDate ? `Libro vendido el ${soldDate}` : 'Aún no se ha vendido' }}
                        </span>
                    </div>
                </div>

                <div class="form-group full-width">
                    <label>Comentarios</label>
                    <textarea v-model="comments" rows="3" placeholder="Opcional..."></textarea>
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


.input-error {
    border-color: #ef4444;
}


.error-msg {
    color: #ef4444;
    font-size: 0.85rem;
    margin-top: 5px;
    display: block;
    font-weight: 500;
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