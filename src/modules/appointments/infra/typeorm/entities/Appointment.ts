import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

// Essa propriedade Entity, faz com que os dados sejam gravados na tabela do banco de dados
@Entity('appointments')
class Appointment {
  // Indicando para o model qual é o tipo deste campo
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Criando relacionamento com a tabela de users
  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  // Criando relacionamento com a tabela de users
  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
