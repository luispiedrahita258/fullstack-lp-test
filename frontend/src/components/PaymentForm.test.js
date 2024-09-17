import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentForm from './PaymentForm';

describe('PaymentForm Component', () => {
  const mockProduct = { id: 1, nombre: 'Test Product', precio: 1000 };
  const mockClose = jest.fn();

  test('renders the form correctly', () => {
    render(<PaymentForm producto={mockProduct} onClose={mockClose} />);

    expect(screen.getByLabelText(/Nombre del titular/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número de tarjeta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CVC/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mes de expiración/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Año de expiración/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
  });

  test('updates the input values correctly', () => {
    render(<PaymentForm producto={mockProduct} onClose={mockClose} />);

    const cardHolderInput = screen.getByLabelText(/Nombre del titular/i);
    fireEvent.change(cardHolderInput, { target: { value: 'Juan Perez' } });
    expect(cardHolderInput.value).toBe('Juan Perez');

    const cardNumberInput = screen.getByLabelText(/Número de tarjeta/i);
    fireEvent.change(cardNumberInput, { target: { value: '4111111111111111' } });
    expect(cardNumberInput.value).toBe('4111111111111111');
  });

  test('submits the form with valid data', () => {
    render(<PaymentForm producto={mockProduct} onClose={mockClose} />);

    const cardHolderInput = screen.getByLabelText(/Nombre del titular/i);
    fireEvent.change(cardHolderInput, { target: { value: 'Juan Perez' } });

    const cardNumberInput = screen.getByLabelText(/Número de tarjeta/i);
    fireEvent.change(cardNumberInput, { target: { value: '4111111111111111' } });

    const cvcInput = screen.getByLabelText(/CVC/i);
    fireEvent.change(cvcInput, { target: { value: '123' } });

    const expMonthInput = screen.getByLabelText(/Mes de expiración/i);
    fireEvent.change(expMonthInput, { target: { value: '12' } });

    const expYearInput = screen.getByLabelText(/Año de expiración/i);
    fireEvent.change(expYearInput, { target: { value: '2025' } });

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByRole('button', { name: /Pagar/i });
    fireEvent.click(submitButton);

  });
});
