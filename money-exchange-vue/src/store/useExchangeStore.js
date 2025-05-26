import { defineStore } from 'pinia'
import axios from 'axios'

// console.log('API Key cargada:', import.meta.env.VITE_RAPIDAPI_KEY)


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
          'X-RapidAPI-Key': '6621eb053bmsh9d334924d375a5dp1cf67ajsn0b6127381804',
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

  setAmount(newAmount) {
    this.amount = newAmount
    this.result = null
  },

  invertir(autoConvertir = false) {
    const temp = this.from
    this.from = this.to
    this.to = temp
    this.result = null

    if (autoConvertir) {
      this.fetchRate()
    }
  }
}

})
