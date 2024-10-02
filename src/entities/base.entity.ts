import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @Index()
  id!: number;

  @Column({ name: 'uuid', type: 'uuid', unique: true })
  @Generated('uuid')
  @Index()
  uuid!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
  deleted_at!: Date;
}
