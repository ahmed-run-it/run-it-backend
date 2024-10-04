import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

/**
 * Address entity that represents a physical address in the database.
 * This entity extends the BaseEntity class to inherit common properties
 * like id, createdAt, and updatedAt. It is decorated with the @Entity decorator
 * to be recognized by TypeORM.
 */
@Entity('address')
export class Address extends BaseEntity {
  /**
   * The street name and number of the address.
   * Stored as a string (varchar type) with a maximum length of 100 characters.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  street: string; // Rue

  /**
   * The city of the address.
   * Stored as a string (varchar type) with a maximum length of 50 characters.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  city: string; // Ville

  /**
   * The postal code of the address.
   * Stored as a string (varchar type) with a maximum length of 20 characters.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 20 })
  postalCode: string; // Code postal

  /**
   * The country of the address.
   * Stored as a string (varchar type) with a maximum length of 50 characters.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  country: string; // Pays
}
