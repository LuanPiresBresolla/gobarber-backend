import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Essa propriedade Entity, faz com que os dados sejam gravados na tabela do banco de dados
@Entity('users')
class User {
  // Indicando para o model qual é o tipo deste campo
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // Função vazia quer dizer que o campo é varchar
  name: string;

  @Column() // Função vazia quer dizer que o campo é varchar
  email: string;

  @Column() // Função vazia quer dizer que o campo é varchar
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
