import { defineStore } from 'pinia'
import axios from 'axios'

export const useExchangeStore = defineStore('exchange', {
  state: () => ({
    from: 'USD',
    to: 'EUR',
    amount: 1,
    result: null,
    currencies: ['USD', 'EUR', 'CLP', 'MXN', 'GBP', 'BRL']
  }),

  actions: {
    async fetchRate() {
      try {
        const options = {
          method: 'GET',
          url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert',
          params: {
            from: this.from,
            to: this.to,
            amount: this.amount
          },
          headers: {
            'X-RapidAPI-Key': 'TU_API_KEY',
            'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
          }
        }

        const response = await axios.request(options)
        this.result = response.data.result
      } catch (error) {
        alert('Error al obtener tasa de cambio')
        console.error(error)
      }
    },

    invertir() {
      const temp = this.from
      this.from = this.to
      this.to = temp
    }
  }
})
