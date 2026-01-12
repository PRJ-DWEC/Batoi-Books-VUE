<script setup>
import { store } from '../stores/datos.js'
</script>

<template>
    <div class="messages-container">
        <transition-group name="fade">
            <div 
                v-for="(msg, index) in store.messages" 
                :key="index" 
                class="message-card"
                :class="msg.type" 
            >
                <span class="text">{{ msg.text }}</span>
                <button @click="store.removeMessage(index)" class="close-btn">×</button>
            </div>
        </transition-group>
    </div>
</template>

<style scoped>
.messages-container {
    position: fixed; 
    bottom: 30px; 
    right: 30px; 
    z-index: 2000;
    display: flex; 
    flex-direction: column; 
    gap: 10px;
}

.message-card {
    padding: 15px 20px; 
    border-radius: 8px;
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    min-width: 300px; 
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    font-weight: 500;
    color: white;
}

/* CLASE PARA ÉXITO (VERDE) */
.message-card.success {
    background-color: #27ae60; /* Verde bonito */
    border-left: 5px solid #1e8449;
}

/* CLASE PARA ERROR (ROJO) */
.message-card.error {
    background-color: #e74c3c; /* Rojo bonito */
    border-left: 5px solid #c0392b;
}

.close-btn { 
    background: none; 
    border: none; 
    color: rgba(255,255,255,0.8); 
    font-size: 1.5rem; 
    line-height: 1; 
    padding: 0; 
    margin-left: 15px; 
    cursor: pointer; 
}
.close-btn:hover { 
    color: white; 
}

/* Animación de entrada/salida */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s, transform 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateX(30px); }
</style>