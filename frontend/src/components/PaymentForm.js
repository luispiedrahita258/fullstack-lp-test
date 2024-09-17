import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentForm.css'; 

const PaymentForm = ({ producto, onClose }) => {
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [cvc, setCvc] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cardHolder, setCardHolder] = useState(''); 
  const [customerEmail, setCustomerEmail] = useState(''); 
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [estadoTransaccion, setEstadoTransaccion] = useState(''); // (PENDIENTE, COMPLETADO, FALLIDO)


  const saveToLocalStorage = () => {
    const paymentData = {
      numeroTarjeta,
      cvc,
      expMonth,
      expYear,
      cardHolder,
      customerEmail,
    };
    localStorage.setItem('paymentData', JSON.stringify(paymentData));
  };


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('paymentData'));
    if (savedData) {
      setNumeroTarjeta(savedData.numeroTarjeta);
      setCvc(savedData.cvc);
      setExpMonth(savedData.expMonth);
      setExpYear(savedData.expYear);
      setCardHolder(savedData.cardHolder);
      setCustomerEmail(savedData.customerEmail);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [numeroTarjeta, cvc, expMonth, expYear, cardHolder, customerEmail]);

  const obtenerAcceptanceToken = async () => {
    try {
      const response = await axios.get(
        'https://api-sandbox.co.uat.wompi.dev/v1/merchants/pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7'
      );
      const acceptanceToken = response.data.data.presigned_acceptance.acceptance_token;
      return acceptanceToken;
    } catch (error) {
      console.error('Error obteniendo el acceptance token:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEstadoTransaccion('PENDIENTE');

    try {
      const tokenResponse = await axios.post(
        'https://api-sandbox.co.uat.wompi.dev/v1/tokens/cards',
        {
          number: numeroTarjeta,
          cvc,
          exp_month: expMonth,
          exp_year: expYear,
          card_holder: cardHolder, 
        },
        {
          headers: {
            Authorization: `Bearer pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7`, 
          },
        }
      );
  
      const token = tokenResponse.data.data.id;
  
      const acceptanceToken = await obtenerAcceptanceToken();
  
      const transaccionData = {
        productoId: producto.id,
        monto: producto.precio,
        token, 
        acceptanceToken, 
        payment_method: {
          type: 'CARD',
          token: token, 
          installments: 1,
        },
        reference: `transaccion_ref_${producto.id}`,
        customerEmail, 
        cardHolder 
      };
      
      const response = await axios.post('https://s6mggfxu5l.execute-api.us-east-2.amazonaws.com/default/BackendTransaction', transaccionData);
      setMensaje(`Transacción ${response.data.estado}: ¡Gracias por tu compra!`);
      setEstadoTransaccion('COMPLETADO'); 
      localStorage.removeItem('paymentData'); 
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        setMensaje('Error al procesar la transacción: ' + JSON.stringify(error.response.data.message));
      } else {
        console.error('Error:', error.message);
        setMensaje('Error al procesar la transacción');
      }
      setEstadoTransaccion('FALLIDO'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="react-modal-content">
      <h2>Formulario de Pago</h2>

      {/* Muestra el estado de la transacción */}
      {estadoTransaccion === 'PENDIENTE' && <p>Procesando la transacción...</p>}
      {estadoTransaccion === 'COMPLETADO' && <p>¡Transacción completada con éxito!</p>}
      {estadoTransaccion === 'FALLIDO' && <p>Error en la transacción. Inténtalo nuevamente.</p>}

      {/* Muestra un spinner o mensaje de carga mientras la transacción está en curso */}
      {loading && <p>Cargando...</p>}

      {/* Muestra el formulario solo si no está cargando o no está completada la transacción */}
      {!loading && estadoTransaccion !== 'COMPLETADO' && (
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-field">
            <label>Nombre del titular:</label> 
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Juan Perez"
              required
            />
          </div>
          <div className="form-field">
            <label>Número de tarjeta:</label>
            <input
              type="text"
              value={numeroTarjeta}
              onChange={(e) => setNumeroTarjeta(e.target.value)}
              placeholder="4111 1111 1111 1111"
              required
            />
          </div>
          <div className="form-field">
            <label>CVC:</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
              required
            />
          </div>
          <div className="form-field">
            <label>Mes de expiración:</label>
            <input
              type="text"
              value={expMonth}
              onChange={(e) => setExpMonth(e.target.value)}
              placeholder="12"
              required
            />
          </div>
          <div className="form-field">
            <label>Año de expiración:</label>
            <input
              type="text"
              value={expYear}
              onChange={(e) => setExpYear(e.target.value)}
              placeholder="2025"
              required
            />
          </div>
          <div className="form-field">
            <label>Correo electrónico:</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="email@ejemplo.com"
              required
            />
          </div>
          <button type="submit" className="pay-button">Pagar</button>
          <button type="button" className="close-button" onClick={onClose}>Cerrar</button>
        </form>
      )}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default PaymentForm;
