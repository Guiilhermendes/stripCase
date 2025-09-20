import React, { useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar sessão de checkout');
      }

      const { url } = await response.json();

      window.location.href = url;
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar o pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Integração com Stripe</h1>
        <button onClick={handlePayment} disabled={loading}>
          {loading ? 'Processando...' : 'Comprar Produto ($20.00)'}
        </button>
        <p style={{ fontSize: '14px', marginTop: '20px' }}>
          Após clicar, você será redirecionado para o Stripe Checkout.
        </p>
      </header>
    </div>
  );
}

export default App;
