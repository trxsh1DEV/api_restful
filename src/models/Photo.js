import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';
console.log(appConfig.url)

// Criando um model para BD
export default class Photo extends Model {
  // Esse sequelize é simplesmente a connection que estamos enviando
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            args: [3, 80],
            msg: 'Campo precisa ser preenchido',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            args: [3, 80],
            msg: 'Campo precisa ser preenchido',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          console.log(appConfig.url);
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
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
}
