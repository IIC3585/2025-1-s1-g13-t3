<script>
  import { onMount } from 'svelte';
  import CurrencySelector from '$lib/components/CurrencySelector.svelte';
  import AmountInput from '$lib/components/AmountInput.svelte';
  import { baseCurrency, targetCurrency, fetchRates, fetchCodes } from '$lib/stores.js';

  let history = [];

  onMount(() => {
    fetchCodes();
    const stored = localStorage.getItem('conversionHistory');
    if (stored) {
      try {
        history = JSON.parse(stored);
      } catch {}
    }
  });

  $: if ($baseCurrency) fetchRates($baseCurrency);

  function saveConversion() {
    if (!$baseCurrency || !$targetCurrency) return;
    const pair = { base: $baseCurrency, target: $targetCurrency };
    history = history.filter(
      (item) => !(item.base === pair.base && item.target === pair.target)
    );
    history.unshift(pair);
    if (history.length > 10) history = history.slice(0, 10);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }

  function selectHistory(item) {
    baseCurrency.set(item.base);
    targetCurrency.set(item.target);
  }

  // Helper para obtener emoji de bandera de ISO país
  function countryToFlag(countryCode) {
    return countryCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt())
      );
  }

  function getFlag(currency) {
    if (!currency) return '';
    const mapping = { EUR: 'EU' };
    const country = mapping[currency] || currency.slice(0, 2);
    return countryToFlag(country);
  }
</script>

<main class="container">
  <header class="header">
    <h1>Money Exchange</h1>
  </header>

  <div class="converter">
    <CurrencySelector isBase={true} />
    <div class="flag">{getFlag($baseCurrency)}</div>
    <CurrencySelector isBase={false} />
    <div class="flag">{getFlag($targetCurrency)}</div>

    <AmountInput isBase={true} />
    <div class="arrow">⇄</div>
    <AmountInput isBase={false} />
    <div></div>
  </div>

  <button class="save-button" on:click={saveConversion}>
    Save
  </button>

  {#if history.length}
    <div class="history">
      <h2>History (last {history.length})</h2>
      <ul>
        {#each history as item}
          <li on:click={() => selectHistory(item)}>
            {item.base} → {item.target}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #d87d00;
    margin: 0;
    padding: 1rem;
  }

  .header {
    background-color: #c76c00;
    width: 100%;
    text-align: center;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .header h1 {
    margin: 0;
    color: white;
    font-size: 2.5rem;
  }

  .converter {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto;
    grid-template-rows: auto auto;
    gap: 0.75rem;
    width: 100%;
    max-width: 600px;
    align-items: center;
  }

  .flag {
    text-align: center;
    font-size: 1.5rem;
  }

  .arrow {
    font-size: 2.5rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .save-button {
    margin-top: 1rem;
    padding: 0.6rem 1.2rem;
    font-size: 1.125rem;
    border: 2px solid #fff;
    border-radius: 0.5rem;
    background: transparent;
    color: white;
    cursor: pointer;
  }

  .save-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .history {
    margin-top: 1.5rem;
    width: 100%;
    max-width: 600px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
    font-family: Arial, sans-serif;
  }

  .history h2 {
    margin: 0 0 0.5rem;
    color: white;
    font-size: 1.25rem;
  }

  .history ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .history li {
    padding: 0.5rem;
    margin-bottom: 0.25rem;
    background: white;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
  }

  .history li:hover {
    background: #f0f0f0;
  }

  :global(select),
  :global(input) {
    width: 100%;
    padding: 0.3rem;
    font-size: 0.8rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }

  @media (max-width: 600px) {
    .converter {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto;
    }
    .arrow {
      transform: rotate(90deg);
    }
    .save-button {
      width: 100%;
      text-align: center;
    }
  }
</style>
