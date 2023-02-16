"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Um model sempre tem a nomenclatura no singular da tabela, ex: (tabela: alunos, model: Aluno)
// eslint-disable-next-line
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

// Criando um model para BD
 class User extends _sequelize.Model {
  // Esse sequelize é simplesmente a connection que estamos enviando
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      // Esse campo está aqui virtualmente e n vai existir na BD, por isso ele
      // n aparece no users da migration
      password: {
        type: _sequelize2.default.VIRTUAL,
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
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  // Método que verifica se a senha digitada pelo usuário bate cm nosso hash
  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
