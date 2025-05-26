<template>
  <div class="amount-input">
    <label>Monto:</label>
    <input
      type="number"
      :value="store.amount"
      @input="onAmountChange"
      min="0"
    />
    <button
      @click="store.fetchRate"
      :disabled="!store.amount || store.amount <= 0"
    >
      Convertir
    </button>
  </div>
</template>

<script setup>
import { useExchangeStore } from '../store/useExchangeStore'

const store = useExchangeStore()

function onAmountChange(event) {
  const newAmount = Number(event.target.value)
  store.setAmount(newAmount)
}
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
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
