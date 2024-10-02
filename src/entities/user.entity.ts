import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { Entity, Column } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' }) // Ajout du type pour éviter les problèmes de migration
  firstName: string;

  @ApiProperty()
  @Column({ type: 'varchar' }) // Ajout du type
  lastName: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: true }) // Ajout du type pour plus de clarté
  isActive: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', default: 'client' }) // Ajout du type
  role: string;
}
