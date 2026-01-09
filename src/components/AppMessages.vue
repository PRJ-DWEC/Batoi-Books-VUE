<script setup>
import { useDataStore } from '../stores/datos.js'
const store = useDataStore()
</script>

<template>
    <div class="messages-area">
        <div v-for="(msg, index) in store.messages" :key="index" class="alert alert-danger">
            {{ msg }}
            <button class="btn-close" @click="store.removeMessage(index)">x</button>
        </div>
    </div>
</template>