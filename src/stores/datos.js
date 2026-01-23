import { defineStore } from 'pinia'
import * as api from '../services/api.js'

export const useDatosStore = defineStore('datos', {
    state: () => ({
        books: [],
        modules: [],
        cart: [],
        messages: [],
    }),

    getters: {
        
        getModuleByCode: (state) => (code) => {
            return state.modules.find(m => m.code === code) || {}
        },
        
        totalLibros: (state) => state.books.length,
        
        importeTotal: (state) => {
            return state.books.reduce((acc, book) => acc + Number(book.price), 0).toFixed(2)
        },
        
        cartTotalAmount: (state) => {
            return state.cart.reduce((acc, book) => acc + Number(book.price), 0).toFixed(2)
        },

        cartTotalItems: (state) => state.cart.length
    },

    actions: {
        // --- ACCIONES DE DATOS ---
        async fetchBooks() {
            try {
                this.books = await api.getDBBooks()
            } catch (error) {
                this.addMessage(error.message, 'error')
            }
        },

        async fetchModules() {
            
            if (this.modules.length > 0) return; 

            try {
                this.modules = await api.getDBModules()
            } catch (error) {
                this.addMessage(error.message, 'error')
            }
        },

        async addBook(book) {
            try {
                if (!book.photo) {
                    book.photo = getModuleImage(book.moduleCode)
                }
                await api.addDBBook({ ...book })
                await this.fetchBooks()
                this.addMessage("Libro añadido correctamente", "success")
            } catch (error) {
                this.addMessage(error.message, "error")
            }
        },

        async updateBook(book) {
            try {
                await api.changeDBBook(book)
                await this.fetchBooks()
                this.addMessage("Libro modificado correctamente", "success")
            } catch (error) {
                this.addMessage(error.message, "error")
            }
        },

        async deleteBook(id) {
            try {
                await api.removeDBBook(id)
                await this.fetchBooks()
                // Actualizamos el carrito por si el libro borrado estaba ahí
                this.cart = this.cart.filter(b => b.id !== id)
                this.saveCart()
                this.addMessage("Libro eliminado correctamente", "success")
            } catch (error) {
                this.addMessage(error.message, "error")
            }
        },

        // --- GESTIÓN DEL CARRITO ---
        initialiseCart() {
             if (localStorage.getItem('batoi-cart')) {
                this.cart = JSON.parse(localStorage.getItem('batoi-cart'))
             }
        },

        saveCart() {
            localStorage.setItem('batoi-cart', JSON.stringify(this.cart))
        },

        addToCart(book) {
            
            if (!this.cart.find(b => b.id === book.id)) {
                this.cart.push(book)
                this.saveCart()
                this.addMessage(`Libro "${book.id}" añadido al carrito`, "success")
            }
        },

        removeFromCart(id) {
            const index = this.cart.findIndex(b => b.id === id)
            if (index !== -1) {
                this.cart.splice(index, 1)
                this.saveCart()
                this.addMessage("Libro eliminado del carrito", "success")
            }
        },

        clearCart() {
            this.cart = []
            this.saveCart()
        },

        async checkout() {
            try {
                const response = await api.processCheckout(this.cart)
                this.clearCart()
                this.addMessage(response, "success")
            } catch (error) {
                this.addMessage(error.message, "error")
            }
        },

        // --- GESTIÓN DE MENSAJES ---
        addMessage(text, type = 'success') {
            const msgObj = { text, type }
            this.messages.push(msgObj)
            setTimeout(() => {
                const idx = this.messages.indexOf(msgObj)
                if (idx > -1) this.messages.splice(idx, 1)
            }, 5000)
        },

        removeMessage(index) {
            this.messages.splice(index, 1)
        }
    }
})


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
    return map[moduleCode] || '../../logoBatoi.png' || 'logoBatoi.png'; 
}