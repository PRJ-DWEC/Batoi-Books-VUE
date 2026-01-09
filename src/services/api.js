import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getBooks: () => api.get('/books'),
    getModules: () => api.get('/modules'),
    addBook: (item) => api.post('/books', item),
    deleteBook: (id) => api.delete(`/books/${id}`),
};