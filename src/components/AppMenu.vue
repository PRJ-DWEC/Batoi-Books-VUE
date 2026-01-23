<script></script>
<template>
    <nav>
        <ul>
            <li><router-link to="/">Ver Libros</router-link></li>
            <li><router-link to="/add-book">Añadir Libro</router-link></li>
            <li><router-link to="/cart">Ver Carrito</router-link></li>
            <li><router-link to="/about">Acerca de...</router-link></li>
        </ul>
    </nav>
</template>

<style scoped>
nav { display: flex; gap: 25px; }
a { text-decoration: none; color: #6b7280; font-weight: 500; font-size: 0.95rem; transition: color 0.2s; }
a:hover, a.active { color: #4f46e5; }
</style>