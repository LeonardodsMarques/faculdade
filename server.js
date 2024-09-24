const express = require('express');

const app = express();
const PORT = 3000;

let exchangeRates = {};

app.use(express.json());

app.use(express.static('public'));

async function fetchCurrencies() {
  const fetch = (await import('node-fetch')).default;
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/BRL');
    const data = await response.json();
    exchangeRates = data.rates;
    console.log('Valores de corretagem coletados:', exchangeRates);
  } catch (error) {
    console.error('Erro ao coletar os valores de corretagem:', error);
  }
}

fetchCurrencies();

app.post('/convert', (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Valor inválido' });
  }

  const conversions = {};
  for (const currency in exchangeRates) {
    conversions[currency] = (amount * exchangeRates[currency]).toFixed(2);
  }

  res.json({ amount, conversions });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
