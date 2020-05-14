import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
// Rota para visualizar as imagens de forma estatica
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

// Rota para tratativas de erros
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
  // eslint-disable-next-line
  console.error(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line
  console.log('Server started on port 3333 ✔');
});
