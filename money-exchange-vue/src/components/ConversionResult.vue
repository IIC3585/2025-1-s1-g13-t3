<template>
  <div class="conversion-result" v-if="store.result !== null">
    <p>{{ store.amount }} {{ store.from }} = <strong>{{ store.result.toFixed(2) }}</strong> {{ store.to }}</p>
  </div>
</template>

<script setup>
import { useExchangeStore } from '../store/useExchangeStore'

const store = useExchangeStore()
</script>

<style scoped>
.conversion-result {
  font-size: 18px;
  margin-top: 20px;
}
</style>
