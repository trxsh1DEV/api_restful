import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import studentRoutes from './routes/studentRoutes';
import photoRoutes from './routes/photoRoutes';
import './database';
// import '../'

dotenv.config();

class App {
  constructor() {
    // Toda vez que a classe for acionada vai chamar essas funções
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Configurando o express
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    // Pasta de arquivos estáticos
    this.app.use('/images/', express.static(resolve(__dirname, '..','uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/students/', studentRoutes);
    this.app.use('/photos/', photoRoutes);
  }
}

// Exportando somente o express
export default new App().app;
