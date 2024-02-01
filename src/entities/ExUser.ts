import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'exuser' })
export class ExUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false
  })
  email: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 150
  })
  pwd: string;
  @Column({
    nullable: false
  })
  role: number;
  @Column({
    name: 'fullname',
    nullable: false
  })
  fullname: string;
  @Column({
    name: 'birthday',
    nullable: false
  })
  birthday: string;
  @Column({
    nullable: false
  })
  classId: number;
}
