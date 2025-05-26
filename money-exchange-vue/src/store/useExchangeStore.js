import { defineStore } from 'pinia'
import axios from 'axios'

export const useExchangeStore = defineStore('exchange', {
  state: () => ({
    from: 'USD',
    to: 'EUR',
    amount: 1,
    result: null,
    currencies: [],
    latestRates: null,
    loadingConversion: false,
  }),

  actions: {
    async fetchRate() {
      this.loadingConversion = true
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
      } finally {
        this.loadingConversion = false
      }
    },

    async fetchLatestRates() {
      try {
        const response = await axios.get(
          'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest',
          {
            params: { base: this.from },
            headers: {
              'X-RapidAPI-Key': '6621eb053bmsh9d334924d375a5dp1cf67ajsn0b6127381804',
              'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
            }
          }
        )
        this.latestRates = response.data.rates
      } catch (error) {
        alert('Error al obtener tasas actuales')
        console.error(error)
      }
    },

    async fetchSymbols() {
      try {
        const response = await axios.get(
          'https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols',
          {
            headers: {
              'X-RapidAPI-Key': '6621eb053bmsh9d334924d375a5dp1cf67ajsn0b6127381804',
              'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
            }
          }
        )
        if (response.data && response.data.symbols) {
          this.currencies = Object.keys(response.data.symbols)
        }
      } catch (error) {
        console.error('Error al obtener símbolos:', error)
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
