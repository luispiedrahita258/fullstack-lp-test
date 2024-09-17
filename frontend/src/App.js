import './App.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tienda de Productos</h1>
      </header>
      <ProductList /> {/* Trae los productos */}
    </div>
  );
}

export default App;
