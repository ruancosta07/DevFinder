const main = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT_KEY = process.env.JWT_KEY
require("../models/Usuario");
require("../models/Vaga");
const Usuario = mongoose.model("usuarios");
const Vaga = mongoose.model("vagas");
const jwt = require("jsonwebtoken");

main.get("/", (req, res) => {
  Vaga.find()
    .limit(6)
    .sort({ date: "desc" })
    .then((vagas) => {
      res.render("index", { vagas, token: req.cookies.token });
    });
});

main.get("/criar-conta", (req, res) => {
  res.render("criar-conta");
});

main.post("/criar-conta", async (req, res) => {
  let erros = {};
  const novoUsuario = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  };

  if (
    !req.body.name ||
    typeof req.body.name == undefined ||
    req.body.name == null
  ) {
    erros.name_error = "Preencha o campo acima";
  }

  if (
    !req.body.email ||
    typeof req.body.email == undefined ||
    req.body.email == null
  ) {
    erros.email_error = "Preencha o campo acima";
  }

  if (
    !req.body.password ||
    typeof req.body.password == undefined ||
    req.body.password == null
  ) {
    erros.password_error = "Preencha o campo acima";
  }

  if (
    !req.body.role ||
    typeof req.body.role == undefined ||
    req.body.role == null
  ) {
    erros.role_error = "Selecione uma opção";
  }

  if (Object.values(erros).length > 0) {
    res.render("criar-conta", { erros });
  } else {
    const { email } = req.body;
    const user = await Usuario.find({ email });
    if (user.length > 0) {
      req.flash("emailExists", "Email já vinculado a uma conta.");
      res.redirect("/criar-conta");
    } else {
      new Usuario(novoUsuario)
        .save()
        .then(() => {
          req.flash("userSuccess", "Conta criada com sucesso!");
          console.log("Usuário adicionado com sucesso");
          res.redirect("/criar-conta");
        })
        .catch((err) => {
          console.log("Erro ao cadastrar");
          throw err;
        });
    }
  }
});

main.get("/users", (req, res) => {
  Usuario.find().then((users) => {
    res.render("users", { users });
  });
});

function checkRole(role) {
  return function(req, res, next) {
    // Verifique o token do usuário
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('Acesso negado. Nenhum token fornecido.');
    }

    // Verifique o papel do usuário
    try {
      const decoded = jwt.verify(token, `${JWT_KEY}`);
      if (decoded.role !== role) {
        return res.status(403).send('Acesso negado. Você não tem permissão para acessar esta rota.');
      }
      next();
    } catch (ex) {
      res.status(400).send('Token inválido.');
    }
  };
}

main.get("/anunciar-vaga", checkRole('recrutador'), (req, res) => {
  res.render("anunciar-vaga");
});

main.post("/anunciar-vaga",  (req, res) => {
  const novaVaga = {
    title: req.body.title,
    enterprise: req.body.enterprise,
    requirements: req.body.requirements,
    salary: req.body.salary,
    level: req.body.level,
    description: req.body.description,
  };

  Vaga.create(novaVaga).then(() => {
    req.flash("vagaSuccess", "Vaga cadastrada com sucesso!");
    res.redirect("/anunciar-vaga");
    console.log("Vaga cadastrada");
  });
});

main.get("/login", (req, res) => {
  res.render("login");
});

main.post("/login", (req, res) => {
  const { email, password } = req.body;
  Usuario.findOne({ email })
    .select("+password")
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log(err);
          } else if (isMatch) {
            const tokenUser = jwt.sign(
              { email: user.email, password: user.password, role:user.role },
              `${JWT_KEY}`,
              { expiresIn: "5m" }
            );
            req.session.token = tokenUser;
            res.cookie("token", tokenUser, {
              httpOnly: true,
              secure: false,
              maxAge: 300000
            });
            res.redirect('/')
            console.log("Senha correta");
          } else {
            req.flash('password_incorrect', 'Senha incorreta')
            res.redirect('/login')
          }
        });
      } else {
        console.log("Usuário não encontrado");
      }
    });
});

main.get('/ver-vagas', (req, res)=>{
  Vaga.find().sort({date: 'desc'}).then((vagas)=>{
  res.render('ver-vagas', {vagas})
  })
})

main.post('/ver-vagas', (req, res)=>{
  const {searchVaga} = req.body
  Vaga.find({title: {$regex: searchVaga, $options: 'i'}}).sort({title: 'asc'}).then((vagasEncontradas)=>{
    res.render('ver-vagas', {vagasEncontradas, searchVaga: searchVaga})
    console.log(searchVaga);
    console.log('vagas encontradas');
  })
})


main.get('/vagas/:id', (req, res)=>{
  res.render('/vaga')
})

module.exports = main;
