<template>
  <div v-if="store.result !== null" class="conversion-result">
    <p>
      {{ store.amount }} {{ store.from }} =
      <strong>{{ store.result.toFixed(2) }} {{ store.to }}</strong>
    </p>
  </div>
</template>

<script setup>
import { useExchangeStore } from '../store/useExchangeStore'

const store = useExchangeStore()
</script>

<style scoped>
.conversion-result {
  margin-top: 24px;
  padding: 16px 20px;
  background-color: #f0f8ff;
  border: 2px solid #327fc3;
  border-radius: 10px;
  font-size: 1.2em;
  color: #1e1e1e;
  font-weight: 500;
  text-align: center;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.conversion-result strong {
  color: #225c91;
}
</style>
