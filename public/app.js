document.getElementById('convert').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
  
    if (!amount || isNaN(amount)) {
      alert('Insira um valor válido.');
      return;
    }
  
    try {
      const response = await fetch('/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount })
      });
  
      const data = await response.json();
      displayResults(data.conversions);
    } catch (error) {
      console.error('Erro ao coletar os valores para corretagem:', error);
    }
  });
  
  function displayResults(conversions) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    for (const currency in conversions) {
      const p = document.createElement('p');
      p.textContent = `${currency}: ${conversions[currency]}`;
      resultDiv.appendChild(p);
    }
  }
  