import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * BaseEntity is an abstract class that defines common fields
 * to be inherited by other entities. It includes fields for primary ID, UUID,
 * creation date, update date, and soft deletion date. These fields are
 * automatically managed by TypeORM.
 */
export abstract class BaseEntity {
  /**
   * Primary key of the entity.
   * This is an auto-incremented integer, indexed for fast lookup.
   * @PrimaryGeneratedColumn automatically generates this field.
   */
  @PrimaryGeneratedColumn()
  @Index()
  id!: number;

  /**
   * Universally unique identifier (UUID) for the entity.
   * This ensures that each entity has a globally unique ID.
   * The @Generated('uuid') decorator automatically generates the UUID.
   * It is indexed and stored as a unique field in the database.
   */
  @Column({ name: 'uuid', type: 'uuid', unique: true })
  @Generated('uuid')
  @Index()
  uuid!: string;

  /**
   * Timestamp indicating when the entity was created.
   * The date is stored in the database with timezone information.
   * @CreateDateColumn automatically sets this value when the entity is created.
   */
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at!: Date;

  /**
   * Timestamp indicating when the entity was last updated.
   * The date is stored in the database with timezone information.
   * @UpdateDateColumn automatically updates this value whenever the entity is updated.
   */
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at!: Date;

  /**
   * Timestamp indicating when the entity was soft deleted.
   * The date is stored in the database with timezone information.
   * @DeleteDateColumn marks this column for soft deletion purposes.
   * Entities are not actually removed from the database, but marked as deleted.
   */
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
  deleted_at!: Date;
}
