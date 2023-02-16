// Fazendo a conexão com meu model

// eslint-disable-next-line
import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database'; // Arquivos de configuração da BD
// Todo model criado tem que ser importado para dentro desse arquivo
import Student from '../models/Student'; // Importando nossos models
import User from '../models/User'; // Importando nossos models
import Photo from '../models/Photo'; // Importando nossos models

const models = [Student, User, Photo]; // Pegando todos nossos models

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
// Se existir esse método fazemos a conexão com o model(s)
models.forEach((model) => model.associate && model.associate(connection.models));
