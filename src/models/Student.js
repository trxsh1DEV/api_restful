// Um model sempre tem a nomenclatura no singular da tabela, ex: (tabela: alunos, model: Aluno)
// eslint-disable-next-line
import Sequelize, { Model } from 'sequelize';

// Criando um model para BD
export default class Student extends Model {
  // Esse sequelize é simplesmente a connection que estamos enviando
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 80],
            msg: '(Nome) deve ter entre 3 e 80 caracteres',
          },
        },
      },
      surname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 80],
            msg: '(Sobrenome) deve ter entre 3 e 80 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido',
          },
        },
      },
      age: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: '(Idade) precisa ser um número inteiro',
          },
        },
      },
      weight: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: '(Peso) precisa ser um número',
          },
        },
      },
      height: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: '(Altura) precisa ser um número',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id' });
  }
}
