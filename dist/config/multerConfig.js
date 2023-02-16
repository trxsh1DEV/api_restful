"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

const random = Math.floor(Math.random() * 10000 + 10000);
// console.log(random);

exports. default = {
  // Aceitando somente imagens
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new _multer2.default.MulterError('O arquivo precisa ser uma imagem(PNG/JPG)'));
    }

    return cb(null, true);
  },
  storage: _multer2.default.diskStorage({
    destination: (req, file, callback) => {
      callback(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, callback) => {
      // pegando o tempo em que subiram a foto + numero aleatorio + a extensão do arquivo
      callback(null, `${Date.now()}_${random}${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
