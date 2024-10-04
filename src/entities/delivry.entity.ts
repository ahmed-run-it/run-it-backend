import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

/**
 * Delivery entity that represents the delivery details of an order.
 * This entity extends the BaseEntity class, inheriting common fields like id,
 * createdAt, and updatedAt. It tracks the delivery method, cost, estimated delivery date,
 * and the status of the delivery.
 */
@Entity('delivery')
export class Delivery extends BaseEntity {
  /**
   * The method of delivery (e.g., "Standard", "Express").
   * Stored as a string (varchar type) in the database with a maximum length of 100 characters.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  deliveryMethod: string; // e.g. "Standard", "Express"

  /**
   * The cost of the delivery.
   * Stored as a decimal in the database with a precision of 5 and a scale of 2,
   * allowing for monetary values (e.g., 999.99).
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  deliveryCost: number; // Cost of delivery

  /**
   * The expected delivery date of the order.
   * Stored as a timestamp in the database to represent the estimated arrival date.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'timestamp' })
  expectedDeliveryDate: Date; // Estimated delivery date

  /**
   * The current status of the delivery (e.g., "Pending", "Shipped", "Delivered").
   * Stored as a string (varchar type) in the database with a default value of "Pending".
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', default: 'Pending' })
  status: string; // e.g. "Pending", "Shipped", "Delivered"
}
