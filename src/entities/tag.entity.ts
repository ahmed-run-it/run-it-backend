import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { Entity, Column } from 'typeorm';

/**
 * Tag entity that represents tags used for categorizing or labeling items in the database.
 * This entity extends the BaseEntity class, inheriting common fields like id,
 * createdAt, and updatedAt. Tags can be associated with products, articles, or other entities.
 */
@Entity('tag')
export class Tag extends BaseEntity {
  /**
   * The name of the tag.
   * Stored as a string (varchar type) in the database, representing the label
   * assigned to items for categorization.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  /**
   * A description of the tag.
   * Stored as text in the database, providing additional details about the tag.
   * This field is nullable, meaning it can be left empty if not needed.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * A unique slug for the tag, typically used in URLs.
   * Stored as a string (varchar type) in the database, ensuring that each tag
   * has a unique identifier for routing or linking purposes.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  slug: string;

  /**
   * Indicates whether the tag is active.
   * Stored as a boolean in the database, with a default value of true,
   * allowing for easy management of tag visibility in the application.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;
}
