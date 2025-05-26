<template>
  <div v-if="store.result !== null" class="conversion-result">
    <p>{{ store.amount }} {{ store.from }} = <strong>{{ store.result.toFixed(2) }} {{ store.to }}</strong></p>
  </div>
</template>

<script setup>
import { useExchangeStore } from '../store/useExchangeStore'

const store = useExchangeStore()
</script>

<style scoped>
.conversion-result {
  margin-top: 20px;
  font-size: 1.2em;
  color: #333;
}
</style>
