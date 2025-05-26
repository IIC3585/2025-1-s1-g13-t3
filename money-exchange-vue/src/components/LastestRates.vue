<template>
  <div class="latest-rates">
    <h1 class="title">Tasas actuales desde {{ store.from }}</h1>

    <button @click="toggleRates" class="fetch-button">
      {{ showRates ? 'Ocultar tasas actuales' : 'Mostrar tasas actuales' }}
    </button>

    <table v-if="showRates && store.latestRates" class="rates-table">
      <thead>
        <tr>
          <th>Moneda</th>
          <th>Tasa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rate, currency) in store.latestRates" :key="currency">
          <td>{{ currency }}</td>
          <td>{{ rate.toFixed(4) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else-if="showRates && !store.latestRates" class="no-data">Cargando datos...</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useExchangeStore } from '../store/useExchangeStore'

const store = useExchangeStore()
const showRates = ref(false)

async function toggleRates() {
  showRates.value = !showRates.value

  if (showRates.value && !store.latestRates) {
    await store.fetchLatestRates()
  }
}
</script>

<style scoped>
.latest-rates {
  text-align: center;
  margin-top: 30px;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.fetch-button {
  background-color: #327fc3;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;
}

.fetch-button:hover {
  background-color: #2869a8;
}

.rates-table {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-collapse: collapse;
  border: 2px solid #327fc3;
  border-radius: 8px;
  overflow: hidden;
}

.rates-table th,
.rates-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.rates-table th {
  background-color: #327fc3;
  color: white;
}

.rates-table tr:nth-child(even) {
  background-color: #f4f8fc;
}


.no-data {
  text-align: center;
  color: #327fc3;
  font-weight: 600;
  margin-top: 12px;
}

</style>
