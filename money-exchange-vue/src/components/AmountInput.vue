<template>
  <div class="amount-input">
    <label class="input-label">Monto:</label>
    <input
      type="number"
      :value="store.amount"
      @input="onAmountChange"
      min="0"
      class="input-box"
    />
    <button
      class="convert-button"
      @click="store.fetchRate"
      :disabled="!store.amount || store.amount <= 0 || store.loadingConversion"
    >
      Convertir
    </button>
  </div>

  <p v-if="store.loadingConversion" class="loading-text">Cargando datos...</p>
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
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.input-label {
  font-weight: 500;
  font-size: 16px;
  margin-right: 6px;
}

.input-box {
  width: 120px;
  padding: 8px 10px;
  border: 2px solid #327fc3;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease-in-out;
}

.input-box:focus {
  border-color: #225c91;
}

.convert-button {
  background-color: #327fc3;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.convert-button:hover {
  background-color: #225c91;
}

.convert-button:disabled {
  background-color: #a0c4e3;
  cursor: not-allowed;
}

.loading-text {
  text-align: center;
  color: #327fc3;
  font-weight: 600;
  margin-top: 12px;
}
</style>
