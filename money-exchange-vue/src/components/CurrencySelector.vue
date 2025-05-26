<template>
  <div class="currency-selector">
    <div class="select-group">
      <label for="from">De:</label>
      <select id="from" v-model="store.from">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>

    <div class="invert-button-container">
      <button class="invert-button" @click="invertCurrencies">
        Invertir
      </button>
    </div>

    <div class="select-group">
      <label for="to">A:</label>
      <select id="to" v-model="store.to">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { useExchangeStore } from '../store/useExchangeStore'
import { storeToRefs } from 'pinia'
import { watch, onMounted } from 'vue'

const store = useExchangeStore()
const { currencies, from, to } = storeToRefs(store)

onMounted(() => {
  store.fetchSymbols()
})

watch([from, to], () => {
  store.result = null
})

function invertCurrencies() {
  const temp = store.from
  store.from = store.to
  store.to = temp
  store.result = null
}
</script>

<style scoped>
.currency-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.select-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

select {
  padding: 8px 10px;
  border: 2px solid #327fc3;
  border-radius: 6px;
  font-size: 1em;
  background-color: white;
  cursor: pointer;
  width: 100px;
}

.invert-button-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
}

.invert-button {
  background-color: #327fc3;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.invert-button:hover {
  background-color: #2869a8;
}
</style>
