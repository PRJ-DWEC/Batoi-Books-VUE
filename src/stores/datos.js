import { defineStore } from 'pinia'
import api from '../services/api.js'

export const useDataStore = defineStore('datos', {
    state: () => ({
        books: [],
        modules: [],
        messages: [],
        cart: [] 
    }),
    getters: {
        getModuleByCode: (state) => (code) => {
            return state.modules.find(m => m.code === code) || {}
        },
        totalLibros: (state) => state.books.length,
        importeTotalLibros: (state) => {
            return state.books.reduce((acc, book) => acc + Number(book.price), 0).toFixed(2);
        }
    },
    actions: {
        async fetchBooks() {
            try {
                const response = await api.getBooks();
                this.books = response.data;
            } catch (error) {
                this.messages.push("Error al cargar libros: " + error.message);
            }
        },
        async fetchModules() {
            try {
                const response = await api.getModules();
                this.modules = response.data;
            } catch (error) {
                this.messages.push("Error al cargar módulos: " + error.message);
            }
        },
        async addBook(book) {
            try {
                await api.addBook(book);
                await this.fetchBooks();
            } catch (error) {
                this.messages.push("Error al añadir: " + error.message);
            }
        },
        async deleteBook(id) {
            try {
                await api.deleteBook(id);
                await this.fetchBooks();
            } catch (error) {
                this.messages.push("Error al eliminar: " + error.message);
            }
        },
        removeMessage(index) {
            this.messages.splice(index, 1);
        }
    }
})