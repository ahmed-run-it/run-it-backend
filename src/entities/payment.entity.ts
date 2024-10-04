import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

/**
 * Payment entity that represents payment transactions in the database.
 * This entity extends the BaseEntity class, inheriting common fields like id,
 * createdAt, and updatedAt. It tracks the payment amount, method, and status.
 */
@Entity('payment')
export class Payment extends BaseEntity {
  /**
   * The total amount of the payment.
   * Stored as a decimal in the database with a precision of 10 and a scale of 2,
   * allowing for monetary values (e.g., 99999999.99).
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  /**
   * The method used for the payment (e.g., credit card, PayPal, bank transfer).
   * Stored as a string (varchar type) in the database with a maximum length of 50 characters.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  paymentMethod: string;

  /**
   * Indicates whether the payment has been completed.
   * Stored as a boolean in the database, with a default value of `false` indicating
   * the payment is pending or incomplete.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;
}
