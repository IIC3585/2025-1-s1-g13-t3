<script lang="ts">
  import CurrencySelector from './selectorContainer.svelte';
  import { onMount } from 'svelte';

  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

  type SymbolsResponse = {
    symbols: Record<string, string>;
  };

  type RateResponse = {
    result: number;
  };

  let symbols: Record<string, string> = {};
  let entries: [string, string][] = [];

  let selectedFrom = '';
  let selectedTo = '';
  let amountFrom = '';
  let amountTo = '';
  let lastChanged: 'from' | 'to' = 'from';

  onMount(async () => {
    try {
      const url = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols'
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
      };
      const res = await fetch(url, options);
      const data: SymbolsResponse = await res.json();

      symbols = data.symbols;
      entries = Object.entries(symbols);
    } catch (error) {
      console.error('Failed to fetch symbols:', error);
    }
  });

  async function handleSearch() {
      const from = lastChanged === 'from' ? selectedFrom : selectedTo;
      const to = lastChanged === 'from' ? selectedTo : selectedFrom;
      const amount = Number(lastChanged === 'from' ? amountFrom : amountTo);

      if (!from || !to || isNaN(amount)) return;

      const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${from}&to=${to}&amount=${amount}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
      };

    try {
      const response = await fetch(url, options);
      const rate: RateResponse = await response.json();
      const result = rate.result.toString();



      if (lastChanged === 'from') {
        amountTo = result;
      } else {
        amountFrom = result;
      }
    } catch (error) {
      console.error('Error during conversion:', error);
    }
  }

  


</script>


<div class="mainContainer">
  <div class="titleText">Money Exchange</div>

  {#if entries.length > 0}
    <div class="allSelectorContainer">
      <div class="SelectorsContainer">
        <CurrencySelector
          {entries}
          bind:selected={selectedFrom}
          bind:amount={amountFrom}
          on:input={() => lastChanged = 'from'}
        />
        <CurrencySelector
          {entries}
          bind:selected={selectedTo}
          bind:amount={amountTo}
          on:input={() => lastChanged = 'to'}
        />
      </div>
      <button class="searchButton" on:click={handleSearch}>Search</button>
    </div>
  {:else}
    <p>Loading currencies...</p>
  {/if}
</div>

<style>
.mainContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(90deg, orangered 0%, orange 90%);
  background-size: 200% 200%;
  animation: animatedGradient 4s linear infinite;
}

@keyframes animatedGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.titleText {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 900;
  color: white;
  font-size: 80px;
}

.allSelectorContainer {
  display: flex;
  flex-direction: row;
}

.SelectorsContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.searchButton {
  height: inherit;
  background-color: orangered;
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
  margin: 0.5rem;
  border-radius: 5px;
  border-width: 0px;
}

.searchButton:hover {
  background-color: yellow;
  cursor: pointer;
  color: orangered;
}
</style>