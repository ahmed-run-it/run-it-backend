import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { Entity, Column } from 'typeorm';

/**
 * Category entity that represents product categories in the database.
 * This entity extends the BaseEntity class, inheriting common fields like id,
 * createdAt, and updatedAt. Categories are used to organize products into
 * manageable sections for easier navigation and filtering on an e-commerce site.
 */
@Entity('category')
export class Category extends BaseEntity {
  /**
   * The name of the category.
   * Stored as a string (varchar type) in the database and must be unique,
   * allowing each category to be distinctly identified in the system.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  name: string;

  /**
   * A description of the category.
   * Stored as text in the database, providing additional information about
   * what types of products the category contains. This field is nullable,
   * meaning it can be left empty if not needed.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;
}
