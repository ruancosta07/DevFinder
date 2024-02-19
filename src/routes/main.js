const main = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT_KEY = process.env.JWT_KEY;
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
  res.render("criar-conta", { token: req.cookies.token });
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
          res.redirect("/criar-conta");
        })
        .catch((err) => {
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
  return function (req, res, next) {
    // Verifique o token do usuário
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/login");
    }

    try {
      const decoded = jwt.verify(token, `${JWT_KEY}`);
      if (decoded.role !== role) {
        return res
          .status(403)
          .send(
            "Acesso negado. Você não tem permissão para acessar esta rota."
          );
      }
      next();
    } catch (ex) {
      res.status(400).send("Token inválido.");
    }
  };
}

main.get("/anunciar-vaga", checkRole("recrutador"), (req, res) => {
  res.render("anunciar-vaga", { token: req.cookies.token });
});

main.post("/anunciar-vaga", (req, res) => {
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
  });
});

main.get("/login", (req, res) => {
  res.render("login", { token: req.cookies.token });
});

main.post("/login", (req, res) => {
  const { email, password } = req.body;

  let erros = {};

  if (!email || typeof email == undefined || email == null) {
    erros.email_error = "Preencha o campo acima";
  }

  if (!password || typeof password == undefined || password == null) {
    erros.password_error = "Preencha o campo acima";
  }

  if (Object.values(erros).length > 0) {
    res.render("login", { erros });
  } else {
    Usuario.findOne({ email })
      .select("+password")
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              req.flash("password_incorrect", "Senha incorreta");
              return res.redirect("/login");
            }
            
            if (!isMatch) {
              req.flash("password_incorrect", "Senha incorreta");
              return res.redirect("/login");
            }

            else if (isMatch) {
              const tokenUser = jwt.sign(
                { email: user.email, password: user.password, role: user.role },
                `${JWT_KEY}`,
                { expiresIn: "5m" }
              );
              req.session.token = tokenUser;
              res.cookie("token", tokenUser, {
                httpOnly: true,
                secure: false,
                maxAge: 600000,
              });
              res.redirect("/");
            }
          });
        } else {
          req.flash("user_not_found", "Usuário não encontrado");
          res.redirect("/login");
        }
      });
  }
});

main.get("/ver-vagas", (req, res) => {
  Vaga.find()
    .sort({ date: "desc" })
    .then((vagas) => {
      res.render("ver-vagas", { vagas, token: req.cookies.token });
    });
});

main.get("/logout", function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
});

main.post("/ver-vagas", async (req, res) => {
  let { searchVaga, min, max, level, front, back, full } = req.body;

  // Cria um objeto de consulta vazio
  let query = {};

  // Se searchVaga existe, adiciona ao objeto de consulta
  if (searchVaga) {
    query.title = { $regex: new RegExp(searchVaga, "i") };
  }

  // Se min e max existem, adiciona ao objeto de consulta
  if (min && max) {
    query.salary = { $gte: Number(min), $lte: Number(max) };
  }

  // Se level existe, adiciona ao objeto de consulta
  if (level) {
    query.level = level;
  }

  // Se front, back ou full existem, adiciona ao objeto de consulta
  let titleRegex = [];
  if (front) titleRegex.push(new RegExp("Front", "i"));
  if (back) titleRegex.push(new RegExp("Back", "i"));
  if (full) titleRegex.push(new RegExp("Full", "i"));
  if (titleRegex.length > 0) query.title = { $in: titleRegex };

  const vagasEncontradas = await Vaga.find(query).sort({ title: "asc" });

  const quantidade = await Vaga.countDocuments(query);

  // Vaga.find(query)
  //   .sort({ title: 'asc' })
  //   .then((vagasEncontradas) => {
  //     Vaga.countDocuments().then((quantidade) => {
  //       res.render('ver-vagas', { vagasEncontradas, quantidade, searchVaga, min, max, front, back, full, level });
  //     });
  //   });
  res.render("ver-vagas", {
    vagasEncontradas,
    quantidade,
    searchVaga,
    min,
    max,
    front,
    back,
    full,
    level,
  });
});


// main.post('/ver-vagas/filter', (req, res)=>{
//   const {searchVaga, min, max} = req.body
//   Vaga.find({title: {$regex: searchVaga, $options: 'i'}, salary: {$gte: min, $lte: max}}).sort({title: 'asc'}).then((vagasEncontradas)=>{
//     Vaga.countDocuments().then((quantidade)=>{
//       res.render('ver-vagas', {vagasEncontradas, quantidade, searchVaga: searchVaga})
//     })
//   })
// })

main.get("/vagas/:id", (req, res) => {
  res.render("/vaga");
});

module.exports = main;
