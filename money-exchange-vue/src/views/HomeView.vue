<template>
  <div class="container">
    <h1>Money Exchange Vue</h1>
    
    <CurrencySelector />
    <AmountInput />
    <ConversionResult />
    <LastestRates />
  </div>
</template>

<script setup>
import CurrencySelector from '../components/CurrencySelector.vue'
import AmountInput from '../components/AmountInput.vue'
import ConversionResult from '../components/ConversionResult.vue'
import LastestRates from '../components/LastestRates.vue'


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
</style>
