import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

/**
 * User entity that represents a user in the database.
 * This entity extends the BaseEntity class to inherit common properties
 * such as id, createdAt, and updatedAt. It is decorated with the @Entity decorator
 * to be recognized by TypeORM.
 */
@Entity('user')
export class User extends BaseEntity {
  /**
   * The first name of the user.
   * Stored as a string (varchar type) in the database.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar' })
  firstName: string;

  /**
   * The last name of the user.
   * Stored as a string (varchar type) in the database.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar' })
  lastName: string;

  /**
   * Indicates whether the user is active or not.
   * Stored as a boolean in the database with a default value of true.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  /**
   * The role of the user within the system.
   * Stored as a string (varchar type) in the database with a default value of 'client'.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', default: 'client' })
  role: string;
}
