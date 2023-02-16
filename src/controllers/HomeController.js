// import Student from '../models/Student';

class HomeController {
  async index(req, res) { // Esse async é pq estamos mexendo cm nossa BD
    // const newStudent = await Student.create({
    //   // Testando a inserção de dados na nossa tabela
    //   name: 'Yago',
    //   surname: 'Souza',
    //   email: 'teupai@gmail.com',
    //   age: 25,
    //   weight: 225,
    //   height: 1.39,
    // });
    res.json('Index(Home)');
    // res.json({
    //   itsOk: true,
    // });
  }
}

export default new HomeController();
