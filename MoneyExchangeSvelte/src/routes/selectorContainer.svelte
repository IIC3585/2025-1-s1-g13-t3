<script lang="ts">
  export let entries: [string, string][] = [];
  export let selected: string = '';
  export let amount: string = '';
</script>

<div class="selectorContainer">
  <select bind:value={selected}>
    <option disabled selected value="">Select currency</option>
    {#each entries as [code, name]}
      <option value={code}>{code} - {name}</option>
    {/each}
  </select>
  <input type="number" min="0" step="any" placeholder="Enter Amount" bind:value={amount} on:input />
</div>

<style>
  .selectorContainer {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    margin: 0.5rem;
  }

  select,
  input {
    padding: 0.5rem;
    font-size: 1rem;
  }
</style>
