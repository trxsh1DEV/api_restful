import multer from 'multer';
import { extname, resolve } from 'path';

const random = Math.floor(Math.random() * 10000 + 10000);
// console.log(random);

export default {
  // Aceitando somente imagens
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('O arquivo precisa ser uma imagem(PNG/JPG)'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, callback) => {
      // pegando o tempo em que subiram a foto + numero aleatorio + a extensão do arquivo
      callback(null, `${Date.now()}_${random}${extname(file.originalname)}`);
    },
  }),
};
