import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { Entity, Column } from 'typeorm';

/**
 * SubCategory entity that represents product subcategories in the database.
 * This entity extends the BaseEntity class, inheriting common fields like id,
 * createdAt, and updatedAt. Subcategories are used to further organize products
 * within their parent categories for more specific classification.
 */
@Entity('sub_category')
export class SubCategory extends BaseEntity {
  /**
   * The name of the subcategory.
   * Stored as a string (varchar type) in the database and must be unique,
   * allowing each subcategory to be distinctly identified within its parent category.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  name: string;

  /**
   * A description of the subcategory.
   * Stored as text in the database, providing additional information about
   * what types of products the subcategory contains. This field is nullable,
   * meaning it can be left empty if not needed.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;
}
