<template>
  <div class="amount-input">
    <label>Monto:</label>
    <input type="number" v-model.number="store.amount" min="0" />
    <button @click="store.fetchRate">Convertir</button>
  </div>
</template>

<script setup>
import { useExchangeStore } from '../store/useExchangeStore'

const store = useExchangeStore()
</script>

<style scoped>
.amount-input {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}
input {
  width: 100px;
  padding: 5px;
}
</style>
