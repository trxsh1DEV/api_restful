"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);
console.log(_appConfig2.default.url)

// Criando um model para BD
 class Photo extends _sequelize.Model {
  // Esse sequelize é simplesmente a connection que estamos enviando
  static init(sequelize) {
    super.init({
      originalname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            args: [3, 80],
            msg: 'Campo precisa ser preenchido',
          },
        },
      },
      filename: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            args: [3, 80],
            msg: 'Campo precisa ser preenchido',
          },
        },
      },
      url: {
        type: _sequelize2.default.VIRTUAL,
        get() {
          console.log(_appConfig2.default.url);
          return `${_appConfig2.default.url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'photos', // mudar nome da tabela
    });
    return this;
  }

  // Associonando as fotos ao id de um aluno
  // static associate(models) {
  // this.belongsTo(models.Student, { foreignKey: 'student_id' });
  // this.hasOne(models.Photo, { foreignKey: 'student_id' }); (isso se eu fosse fazer no aluno)
  // }
} exports.default = Photo;
