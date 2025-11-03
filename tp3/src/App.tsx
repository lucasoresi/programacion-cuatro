import { OrderProvider } from './context/OrderContext';
import { Menu } from './components/Menu';
import { OrderSummary } from './components/OrderSummary';
import './App.css';

function App() {
  return (
    <OrderProvider>
      <div className="app">
        <header className="app-header">
          <h1>☕ Cafetería Digital</h1>
          <p>Bienvenido a nuestra cafetería. Realiza tu pedido de forma rápida y sencilla.</p>
        </header>

        <main className="app-main">
          <div className="menu-section">
            <Menu />
          </div>

          <div className="order-section">
            <OrderSummary />
          </div>
        </main>

        <footer className="app-footer">
          <p>Desarrollado con TDD + React + TypeScript + Vitest + MSW</p>
        </footer>
      </div>
    </OrderProvider>
  );
}

export default App;
