import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';

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
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `http://localhost:3333/files/${this.avatar}`;
      // return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
