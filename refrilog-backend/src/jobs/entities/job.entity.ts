import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  clientName!: string;

  @Column('text')
  description!: string;

  @Column({
    type: 'numeric',
  })
  amount!: number;

  @Column({
    type: 'date',
  })
  date!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
