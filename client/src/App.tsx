import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import { Container } from './components/MaterialUI'
import HomeErrorBoundary from './containers/ErrorBoundary/HomeErrorBoundary'
import AppNotificationProvider from './contexts/AppNotificationContext'
import ExchangeRateRouter from './routes/ExchangeRateRouter'

function App() {
  return (
    <div>
      <HomeErrorBoundary>
        <Container>
          <BrowserRouter>
            <AppNotificationProvider>
              <ExchangeRateRouter/>
            </AppNotificationProvider>
          </BrowserRouter>
        </Container>
      </HomeErrorBoundary>
    </div>
  );
}

export default App;
