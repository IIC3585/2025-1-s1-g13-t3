import { writable, derived } from 'svelte/store';

// Lista de códigos soportados: [code, name]
export const codes = writable([]);

// moneda base y destino (vacíos al arrancar)
export const baseCurrency   = writable('');
export const targetCurrency = writable('');

// objeto con todas las tasas
export const rates = writable({});

// tasa para la moneda destino
export const exchangeRate = derived(
  [rates, targetCurrency],
  ([$rates, $targetCurrency]) => $rates[$targetCurrency] || 0
);

// monto ingresado por el usuario (string para poder mostrar placeholder)
export const amount = writable('');

// monto convertido ('' hasta que haya amount y tasa)
export const converted = derived(
  [amount, exchangeRate],
  ([$amount, $exchangeRate]) => {
    const num = parseFloat($amount);
    return !isNaN(num) && $exchangeRate
      ? num * $exchangeRate
      : '';
  }
);

// carga la lista de códigos desde la API
export async function fetchCodes() {
  const key = import.meta.env.VITE_EXCHANGE_API_KEY;
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/codes`);
  const data = await res.json();
  // data.supported_codes → array de [code, name]
  codes.set(data.supported_codes);
}

// recarga las tasas cuando cambia la base
export async function fetchRates(base) {
  if (!base) return;
  const key = import.meta.env.VITE_EXCHANGE_API_KEY;
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${key}/latest/${base}`
  );
  const data = await res.json();
  rates.set(data.conversion_rates);
}