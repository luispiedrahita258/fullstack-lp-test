import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import PaymentForm from './PaymentForm'; 
import { fetchProducts } from '../features/productSlice'; 
import './ProductList.css'; 

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const openModal = (producto) => {
    setSelectedProduct(producto);
    setModalIsOpen(true);
  };


  const closeModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };

  if (status === 'loading') {
    return <div>Cargando productos...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list">
      <h2>Productos Disponibles</h2>
      <ul>
        {products.map(({ id, nombre, descripcion, precio, stock }) => (
          <li key={id}>
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
            <p>Precio: {precio.toLocaleString()} COP</p>
            <p>Stock: {stock}</p>
            <button onClick={() => openModal({ id, nombre, precio })}>Comprar</button>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal} 
          className="react-modal-content" 
          overlayClassName="react-modal-overlay"
          ariaHideApp={false} 
        >
          <PaymentForm producto={selectedProduct} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
