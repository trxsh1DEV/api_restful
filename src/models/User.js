// Um model sempre tem a nomenclatura no singular da tabela, ex: (tabela: alunos, model: Aluno)
// eslint-disable-next-line
import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

// Criando um model para BD
export default class User extends Model {
  // Esse sequelize é simplesmente a connection que estamos enviando
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        // Validando os dados que irão pra BD
        validate: {
          // len = tamanho do campo
          len: {
            args: [3, 60],
            msg: 'Campo (nome) deve ter entre 3 e 60 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já existe',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      // Esse campo está aqui virtualmente e n vai existir na BD, por isso ele
      // n aparece no users da migration
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 50],
            msg: 'Campo (senha) deve ter entre 8 e 50 caracteres',
          },
        },
      },
    }, {
      sequelize,
    });

    // adicionando hook (ação baseado em um determinado evento), ex: depois que salvar na bd ...
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
      // Sempre que criarmos um usuário vamos criar um hash da senha digitada
      // Atribuir esse hash ao password_hash q é um campo virtual, ou seja, n vai pra nossa bd
      // esse "8" é o salt que vai ser dado (entre 8 e 10 é bom)
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  // Método que verifica se a senha digitada pelo usuário bate cm nosso hash
  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
