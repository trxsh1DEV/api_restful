"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Fazendo a conexão com meu model

// eslint-disable-next-line
var _sequelize = require('sequelize');
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database); // Arquivos de configuração da BD
// Todo model criado tem que ser importado para dentro desse arquivo
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student); // Importando nossos models
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User); // Importando nossos models
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo); // Importando nossos models

const models = [_Student2.default, _User2.default, _Photo2.default]; // Pegando todos nossos models

const connection = new (0, _sequelize.Sequelize)(_database2.default);

models.forEach((model) => model.init(connection));
// Se existir esse método fazemos a conexão com o model(s)
models.forEach((model) => model.associate && model.associate(connection.models));
