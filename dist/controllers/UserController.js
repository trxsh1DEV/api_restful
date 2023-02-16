"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) { // Esse async é pq estamos mexendo cm nossa BD
    try {
      const newUser = await _User2.default.create(req.body); // Recebendo dados da requisição (do front)
      const { id, name, email } = newUser;
      // Testando a inserção de dados na nossa tabela
      //   name: 'Yago',
      //   email: 'teupai@gmail.com',
      //   password: '12345678',
      // });

      // res.json({
      //   itsOk: true,
      // });
      res.json({ id, name, email });
    } catch (err) {
      // console.log(err);
      // passando por todo o array cm chave "errors"
      res.status(400).json({
        // "convertendo" o array em um obj json por padronização e pra facilitar no consumo da API
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      // console.log('USER ID', req.userId);
      // console.log('USER Email', req.userEmail);
      // const users = await User.findAll(); // Pegando todos os usuários
      const users = await _User2.default.findAll({ attributes: ['id', 'name', 'email'] }); //
      // console.log('ID', req.userId, 'Email', req.userEmail);
      return res.json(users);
    } catch (err) {
      return res.json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      // const { id } = req.params;
      // Pegando um usuário pela sua primary key (id)
      const user = await _User2.default.findByPk(req.params.id);
      const { id, name, email } = user; //eslint-disable-line
      return res.json({ id, name, email });
    } catch (err) {
      // console.log(err);
      return res.status(400).json({
        errors: ['ID não existe ou não foi encontrado'],
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      // console.log('USER ID', req.userId);
      // console.log('USER Email', req.userEmail);
      // const { id } = req.params;
      // if (!id) {
      //   return res.status(400).json({
      //     errors: ['ID não enviado'],
      //   });
      // } // comentei esse código, pois agr o ID do usuário está na requisição
      const user = await _User2.default.findByPk(req.userId); // Pegando um usuário pela sua primary key (id)
      // console.log(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
      const newData = await user.update(req.body);
      const { id, name, email } = newData;
      return res.json({ id, name, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      // const { id } = req.params;

      // if (!id) {
      //   return res.status(400).json({
      //     errors: ['ID não existe'],
      //   });
      // }
      console.log(req.userId);
      const user = await _User2.default.findByPk(req.userId); // Pegando um usuário pela sua primary key (id)

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();
      return res.json(`Usuário deletado com sucesso! Adeus ${req.userEmail}`);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }
}

exports. default = new UserController();
