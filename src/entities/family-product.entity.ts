import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { Entity, Column } from 'typeorm';

/**
 * ProductFamily entity that represents different families or groups of products
 * in the database. This entity extends the BaseEntity class, inheriting common
 * fields like id, createdAt, and updatedAt. Product families categorize products
 * based on broader classifications, facilitating easier organization and navigation
 * within an e-commerce application.
 */
@Entity('product_family')
export class ProductFamily extends BaseEntity {
  /**
   * The name of the product family.
   * Stored as a string (varchar type) in the database and must be unique, allowing
   * each product family to be distinctly identified. Examples include "Children",
   * "Women", "Accessories", and "Sports".
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  name: string; // Ex: "Children", "Women", "Accessories", "Sports"
}
