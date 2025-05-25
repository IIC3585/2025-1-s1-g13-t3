<template>
  <div class="currency-selector">
    <label>De:</label>
    <select v-model="store.from">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>

    <label>A:</label>
    <select v-model="store.to">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useExchangeStore } from '../store/useExchangeStore'
import { storeToRefs } from 'pinia'

const store = useExchangeStore()
const { currencies } = storeToRefs(store)
</script>

<style scoped>
.currency-selector {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
select {
  padding: 5px;
}
</style>
