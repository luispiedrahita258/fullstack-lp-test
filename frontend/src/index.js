import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; 
import store from './store'; 
import Modal from 'react-modal';
import reportWebVitals from './reportWebVitals';

// Establecer modal
Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Envolvemos la app con el Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
