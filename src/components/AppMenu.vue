<template>
    <nav>
        <ul>
            <li><a href="#">Ver Libros</a></li>
            <li><a href="#">Añadir Libro</a></li>
            <li><a href="#">Acerca de...</a></li>
        </ul>
    </nav>
</template>

<style scoped>
nav { display: flex; gap: 25px; }
a { text-decoration: none; color: #6b7280; font-weight: 500; font-size: 0.95rem; transition: color 0.2s; }
a:hover, a.active { color: #4f46e5; }
</style>