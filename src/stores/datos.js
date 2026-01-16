import { reactive } from 'vue'
import * as api from '../services/api.js'

export const store = reactive({
    books: [],
    modules: [],
    cart: [],
    messages: [],

    // --- ACCIONES ---

    async fetchBooks() {
        try {
            this.books = await api.getDBBooks();
            // Nuevo: Mensaje de éxito al cargar los datos
            this.addMessage("Datos de libros actualizados", "success");
        } catch (error) {
            this.addMessage(error.message, 'error');
        }
    },

    async fetchModules() {
        try {
            this.modules = await api.getDBModules();
            // Opcional: También podemos avisar de que los módulos han cargado
            // this.addMessage("Módulos cargados", "success");
        } catch (error) {
            this.addMessage(error.message, 'error');
        }
    },

    async addBook(book) {
        try {
            if (!book.photo) {
                book.photo = getModuleImage(book.moduleCode);
            }
            await api.addDBBook({ ...book });
            await this.fetchBooks(); // Esto ahora mostrará también "Datos de libros actualizados"
            this.addMessage("Libro añadido correctamente", "success");
        } catch (error) {
            this.addMessage(error.message, "error");
        }
    },

    async updateBook(book) {
        try {
            await api.changeDBBook(book);
            await this.fetchBooks();
            this.addMessage("Libro modificado correctamente", "success");
        } catch (error) {
            this.addMessage(error.message, "error");
        }
    },

    async deleteBook(id) {
        try {
            await api.removeDBBook(id);
            await this.fetchBooks();
            this.cart = this.cart.filter(b => b.id !== id);
            this.addMessage("Libro eliminado correctamente", "success");
        } catch (error) {
            this.addMessage(error.message, "error");
        }
    },

    // --- GESTIÓN DE MENSAJES ---

    addMessage(text, type = 'success') {
        const msgObj = { text, type };
        this.messages.push(msgObj);
        setTimeout(() => {
            const idx = this.messages.indexOf(msgObj);
            if (idx > -1) this.messages.splice(idx, 1);
        }, 5000);
    },

    removeMessage(index) {
        this.messages.splice(index, 1);
    },

    // --- GETTERS ---

    getModuleByCode(code) {
        return this.modules.find(m => m.code === code) || {};
    },

    get totalLibros() {
        return this.books.length;
    },

    get importeTotal() {
        return this.books.reduce((acc, book) => acc + Number(book.price), 0).toFixed(2);
    }
});

// --- MAPEO DE IMÁGENES ---
export function getModuleImage(moduleCode) {
    const map = {
        '0021': '9788448635015.jpg',
        '0374': '9788448626648.jpg', 
        '0375': '9788448626655.jpg',
        '0376': '9788448626662.jpg',
        '0378': '9788448626686.jpg',
        '0612': '9788448632663.jpg',
        '1371': '9788448638719_1.jpg',
        '1349': '9788448638900.jpg',
        '1353': '9788448638986.jpg'
    };
    return map[moduleCode] || '../../public/logoBatoi.png'; 
}