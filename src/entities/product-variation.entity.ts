import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

/**
 * ProductVariation entity that represents different variations of a product,
 * such as color and size, in the database. This entity extends the BaseEntity class,
 * inheriting common fields such as id, createdAt, and updatedAt.
 */
@Entity('product_variation')
export class ProductVariation extends BaseEntity {
  /**
   * The color of the product variation.
   * Stored as a string (varchar type) in the database with a maximum length of 20 characters.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 20 })
  color: string; // Product color

  /**
   * The size of the product variation.
   * Stored as a string (varchar type) in the database with a maximum length of 20 characters.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 20 })
  taille: string; // Product size

  /**
   * The quantity of this specific product variation in stock.
   * Stored as an integer in the database.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'int' })
  quantity: number; // Quantity in stock for this variation
}
