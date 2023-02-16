"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

// Criando um middleware de upload de arquivos
const upload = _multer2.default.call(void 0, _multerConfig2.default).single('photo'); // Esse photo vem da requisição multpart Insomia

class PhotoController {
  store(req, res) {
    // esse é o arquivo que é criado a partir do single do photoRouter
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
      // pegando os atributos de campos obrigatórios na nossa BD e o ID é autoincremental
        const { originalname, filename } = req.file;
        const { student_id } = req.body; // pegando o id que foi enviado no corpo da requisição
        // Criando a photo baseada nessas informações na sua respectiva tabela na BD
        const photo = await _Photo2.default.create({ originalname, filename, student_id });
        return res.json(photo);
      } catch (err) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

exports. default = new PhotoController();
