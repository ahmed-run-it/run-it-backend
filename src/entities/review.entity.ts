import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { Entity, Column } from 'typeorm';

/**
 * Review entity that represents customer reviews in the database.
 * This entity extends the BaseEntity class, inheriting common fields
 * like id, createdAt, and updatedAt. Reviews are associated with products
 * and contain a textual review as well as a rating.
 */
@Entity('review')
export class Review extends BaseEntity {
  /**
   * The content of the review, written by the customer.
   * Stored as text in the database, allowing for longer and more detailed reviews.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'text' })
  content: string;

  /**
   * The rating given by the customer for a product.
   * Stored as an integer in the database. This is typically on a scale from 1 to 5,
   * where 1 is the lowest rating and 5 is the highest.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'int' })
  rating: number; // Rating scale from 1 to 5
}
