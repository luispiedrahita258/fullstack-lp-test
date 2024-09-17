declare class PaymentMethodDto {
    type: string;
    token: string;
    installments: number;
}
export declare class CrearTransaccionDto {
    productoId: number;
    monto: number;
    cardHolder: string;
    acceptanceToken: string;
    customerEmail: string;
    payment_method: PaymentMethodDto;
}
export {};
