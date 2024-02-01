import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'exclass' })
export class Exclass extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text', {
    name: 'className',
    nullable: false
  })
  className: string;
}
