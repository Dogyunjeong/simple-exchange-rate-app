import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import { Container } from './components/MaterialUI'
import ExchangeRateRouter from './routes/ExchangeRateRouter'

function App() {
  return (
    <div>
      <Container>
        <BrowserRouter>
          <ExchangeRateRouter/>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
