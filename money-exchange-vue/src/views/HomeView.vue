<template>
  <div class="container">
    <h1>MoneyExchange</h1>
    
    <CurrencySelector />

    <div class="invert-container">
      <button @click="store.invertir(true)">Invertir</button>
    </div>

    <AmountInput />
    <ConversionResult />
  </div>
</template>

<script setup>
import CurrencySelector from '../components/CurrencySelector.vue'
import AmountInput from '../components/AmountInput.vue'
import ConversionResult from '../components/ConversionResult.vue'

import { useExchangeStore } from '../store/useExchangeStore'
const store = useExchangeStore()
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.invert-container {
  margin: 10px 0;
}

.invert-container button {
  background-color: #6c757d;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
