import { Entity, Column, BeforeInsert, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';

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
   * Stored as a string (varchar type) with a maximum length of 50 characters in the database.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  /**
   * The last name of the user.
   * Stored as a string (varchar type) with a maximum length of 50 characters in the database.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 50, nullable: true })
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
   * The email of the user.
   * This is stored as a unique string (varchar) in the database to ensure
   * that no two users share the same email address. It has a maximum length of 100 characters.
   * An index is added for performance optimization, and the email format is validated.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  @Index()
  @IsEmail()
  email: string;

  /**
   * The hashed password of the user.
   * Stored as a string (varchar) in the database with a maximum length of 255 characters.
   * This field is nullable, and it will be encrypted using bcrypt before being saved.
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  /**
   * The role of the user within the system.
   * Stored as a string (varchar type) in the database with a default value of 'client'.
   * This field represents the user's permissions level within the system.
   * @ApiProperty decorator is used to generate Swagger documentation for this property.
   */
  @ApiProperty()
  @Column({ type: 'varchar', default: 'client' })
  role: string;

  /**
   * The gender or sex of the user.
   * Stored as an enum type in the database with predefined values such as "FEMALE", "MALE",
   * "AMBIGUOUS", "UNKNOWN", "NOT APPLICABLE", and "OTHER". This field is nullable.
   */
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['FEMALE', 'MALE', 'AMBIGUOUS', 'UNKNOWN', 'NOT APPLICABLE', 'OTHER'],
    nullable: true,
  })
  sex: string;

  /**
   * The mobile phone number of the user.
   * Stored as a string (varchar) in the database with a maximum length of 15 characters.
   * This field is nullable.
   */
  @ApiProperty()
  @Column({ type: 'varchar', length: 15, nullable: true })
  mobile_phone: string;

  /**
   * Method that runs before inserting a new user into the database.
   * This method hashes the user's password using bcrypt to ensure that
   * sensitive information is securely stored.
   */
  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    if (this.password) {
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
}
