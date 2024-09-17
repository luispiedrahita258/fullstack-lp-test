import { IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PaymentMethodDto {
  @IsNotEmpty({ message: 'El tipo de pago es obligatorio' })
  type: string;

  @IsNotEmpty({ message: 'El token de la tarjeta es obligatorio' })
  token: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Debe seleccionar un número de cuotas' })
  @Min(1, { message: 'Debe seleccionar al menos una cuota' })
  installments: number;
}

export class CrearTransaccionDto {
  @IsNotEmpty({ message: 'El ID del producto es obligatorio' })
  @IsNumber({}, { message: 'El ID del producto debe ser un número' })
  productoId: number;

  @IsNotEmpty({ message: 'El monto es obligatorio' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  monto: number;

  @IsNotEmpty({ message: 'El nombre del titular es obligatorio' })
  cardHolder: string;

  @IsNotEmpty({ message: 'El acceptanceToken es obligatorio' })
  acceptanceToken: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  customerEmail: string;

  @ValidateNested()
  @Type(() => PaymentMethodDto)
  payment_method: PaymentMethodDto;
}
