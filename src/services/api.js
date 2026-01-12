import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Asegúrate de tener .env.development
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

// --- LIBROS ---

export async function getDBBooks() {
    try {
        const response = await apiClient.get('/books');
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los libros');
    }
}

export async function getDBBook(id) {
    try {
        const response = await apiClient.get(`/books/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`No se pudo obtener el libro con id ${id}`);
    }
}

export async function addDBBook(book) {
    try {
        const response = await apiClient.post('/books', book);
        return response.data;
    } catch (error) {
        throw new Error('Error al añadir el libro');
    }
}

export async function changeDBBook(book) {
    try {
        const response = await apiClient.put(`/books/${book.id}`, book);
        return response.data;
    } catch (error) {
        throw new Error('Error al modificar el libro');
    }
}

export async function removeDBBook(id) {
    try {
        await apiClient.delete(`/books/${id}`);
    } catch (error) {
        throw new Error('Error al eliminar el libro');
    }
}

export async function checkDBBookExists(userId, moduleCode) {
    try {
        const response = await apiClient.get('/books', {
            params: { userId, moduleCode }
        });
        return response.data.length > 0;
    } catch (error) {
        throw new Error('Error al comprobar la existencia del libro');
    }
}

// --- MÓDULOS ---

export async function getDBModules() {
    try {
        const response = await apiClient.get('/modules');
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los módulos');
    }
}

// --- USUARIOS ---

export async function getDBUsers() {
    try {
        const response = await apiClient.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los usuarios');
    }
}

export async function getDBUser(id) {
    try {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`No se pudo obtener el usuario con id ${id}`);
    }
}

export async function addDBUser(user) {
    try {
        const response = await apiClient.post('/users', user);
        return response.data;
    } catch (error) {
        throw new Error('Error al añadir el usuario');
    }
}

export async function getDBUserById(userId) {
    try {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('User Not Found');
    }
}

export async function changeDBUser(user) {
    try {
        const response = await apiClient.put(`/users/${user.id}`, user);
        return response.data;
    } catch (error) {
        throw new Error('Error al modificar el usuario');
    }
}

export async function changeDBUserPassword(id, newPassword) {
    try {
        const response = await apiClient.patch(`/users/${id}`, { password: newPassword });
        return response.data;
    } catch (error) {
        throw new Error('Error al cambiar la contraseña');
    }
}

export async function removeDBUser(id) {
    try {
        await apiClient.delete(`/users/${id}`);
    } catch (error) {
        throw new Error('Error al eliminar el usuario');
    }
}