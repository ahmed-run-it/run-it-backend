import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

/**
 * CartItem entity that represents an item in a shopping cart.
 * This entity extends the BaseEntity class, inheriting common fields like id,
 * createdAt, and updatedAt. It tracks the quantity of a specific item in the cart.
 */
@Entity('cart_item')
export class CartItem extends BaseEntity {
  /**
   * The quantity of the item in the cart.
   * Stored as an integer in the database, representing how many units of the item
   * are present in the cart.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'int' })
  quantity: number; // Quantity of the item in the cart
}
