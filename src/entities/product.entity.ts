import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

/**
 * Product entity that represents a product in the database.
 * This entity extends the BaseEntity class to inherit common properties
 * such as id, createdAt, and updatedAt. It is decorated with the @Entity decorator
 * to be recognized by TypeORM.
 */
@Entity('product')
export class Product extends BaseEntity {
  /**
   * The name of the product.
   * It is stored as a string (varchar type) in the database.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  /**
   * The description of the product.
   * It is stored as text in the database and can be null.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * The price of the product.
   * It is stored as a decimal with a precision of 10 and a scale of 2, allowing for monetary values.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
