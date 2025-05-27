<script>
  import { amount, exchangeRate, converted } from '$lib/stores.js';
  export let isBase = true;

  let inputValue = '';

  // Refleja siempre el valor correcto en el input
  $: inputValue = isBase ? $amount : $converted;

  function handleInput(e) {
    const val = parseFloat(e.target.value);
    // limpia si está vacío o no es número
    if (isNaN(val)) {
      amount.set('');
      return;
    }

    if (isBase) {
      amount.set(val);
    } else if ($exchangeRate) {
      amount.set(val / $exchangeRate);
    }
  }
</script>

<label class="input-group">
  <input
    type="number"
    min="0"
    step="any"
    placeholder="Enter Amount"
    value={inputValue}
    on:input={handleInput}
  />
</label>