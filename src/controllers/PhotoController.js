import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Photo from '../models/Photo';

// Criando um middleware de upload de arquivos
const upload = multer(multerConfig).single('photo'); // Esse photo vem da requisição multpart Insomia

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
        const photo = await Photo.create({ originalname, filename, student_id });
        return res.json(photo);
      } catch (err) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

export default new PhotoController();
