import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Obrigatório fazer login'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = data;

    // Checando se o usuário e e-mail correspodem aquele usuário na BD
    // (isso serve pra se um usuário alterar o e-mail cadastrado o token dele passar a ser inválido e ele ter q logar novamente pra ter um token válido)
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }
    // Aqui criamos um atributo no obj req. que contém o e-mail e o id baseado no token do usuário
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (err) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
