"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  // Criando os controllers que são as funções que cada rota vai ter
  async index(req, res) { // Esse async é pq estamos mexendo cm nossa BD

    const students = await _Student2.default.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']], // pegando sempre pelo id mais recente
      include: {
        model: _Photo2.default,
        attributes: ['url', 'filename'],
      },
    });
    res.json(students);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID inválido ou não encontrado'],
        });
      }

      const student = await _Student2.default.findByPk(id, {
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']], // pegando sempre pelo id mais recente
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });
      if (!student) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }

      return res.json(student);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async store(req, res) {
    try {
      const student = await _Student2.default.create(req.body);
      return res.json(student);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID inválido ou não encontrado'],
        });
      }

      const student = await _Student2.default.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }

      const newStudent = await student.update(req.body);

      return res.json(newStudent);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID inválido ou não encontrado'],
        });
      }

      const student = await _Student2.default.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }
      const { email } = student;
      console.log(email);

      await student.destroy();
      return res.json(`O aluno (${email}) foi deletado com sucesso! ADIOSSSSSSSS`);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }
}

exports. default = new StudentController();
