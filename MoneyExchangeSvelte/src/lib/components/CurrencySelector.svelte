<script>
  import { baseCurrency, targetCurrency, codes } from '$lib/stores.js';
  export let isBase = true;
  const store = isBase ? baseCurrency : targetCurrency;
</script>

<select bind:value={$store}>
  <!-- placeholder sin selected ni hidden -->
  <option value="" disabled>
    Select Currency
  </option>

  {#if $codes.length === 0}
    <!-- mientras carga -->
    <option disabled>Loading…</option>
  {:else}
    {#each $codes as [cur, name]}
      <option value={cur}>{cur} – {name}</option>
    {/each}
  {/if}
</select>

<style>
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    background: white;
  }
</style>