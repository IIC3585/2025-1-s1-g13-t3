<script lang="ts">

  import CurrencySelector from './selectorContainer.svelte';
  import { onMount } from 'svelte';

  type SymbolsResponse = {
    symbols: Record<string, string>;
  };

  let symbols: Record<string, string> = {};
  let entries: [string, string][] = [];
  let selectedFrom: string = '';
  let selectedTo: string = '';
  let amountFrom: string  = '';
  let amountTo: string  = '';

  onMount(async () => {
    try {
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'x-rapidapi-key': '8feae0d2d4msh66c64b3e503010cp11d9f0jsn37f58bab92a0',
        //         'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        //     }
        // };
        // const res = await fetch('https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols', options);
        // const data: SymbolsResponse = await res.json();
        let data = {
            "symbols": {
            AED: "United Arab Emirates Dirham",
            AFN: "Afghan Afghani",
            ALL: "Albanian Lek",
            AMD: "Armenian Dram"
            }
        };
        console.log(data)
        symbols = data.symbols;
        entries = Object.entries(symbols);
    } catch (error) {
      console.error('Failed to fetch symbols:', error);
    }
  });





</script>

<div class="mainContainer">
  <div class="titleText">Money Exchange</div>

  {#if entries.length > 0}
    <div class=allSelectorContainer >
        <div class="SelectorsContainer">
            <CurrencySelector {entries} bind:selected={selectedFrom} bind:amount={amountFrom} />
            <CurrencySelector {entries} bind:selected={selectedTo} bind:amount={amountTo} />
        </div>

        <button class="searchButton">Search</button>
        
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
}

.titleText {
    font-family: sans-serif;
    font-weight: 900;
    color: orangered;
    font-size: xx-large;
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


</style>