let valoresInputs = [];
let adicionarRequisito = document.getElementById("adicionarRequisito");
let valoresTotais = document.querySelector('input[name="requirements"]');
let form = document.querySelector("form");
let allInputFiels = document.querySelectorAll(".input-vaga");
let levelVaga = document.querySelector(".level-vaga");
let requisitosVaga = document.querySelector(".requisitos-vaga");
let descricaoVaga = document.querySelector(".descricao-vaga");

adicionarRequisito.addEventListener("click", function () {
  let input = document.createElement("input");
  input.setAttribute("name", "requisitosVaga");
  input.classList.add("mt-2");
  this.parentElement.parentElement
    .querySelector("button")
    .insertAdjacentElement("beforebegin", input);
});

form.addEventListener("submit", function (event) {
  document.querySelectorAll('input[name="requisitosVaga"]').forEach((input) => {
    valoresInputs.push(input.value);
    valoresTotais.value = valoresInputs.join(" § ");
  });
});

allInputFiels.forEach((campo) => {
  if (campo.querySelector(".erro-vaga")) {
    campo.querySelector("input").classList.add("erroVaga");
  }
  campo.querySelector("input").addEventListener("keyup", function () {
    if (this.value != "") {
      this.classList.remove("erroVaga");
      if (campo.querySelector(".erro-vaga")) {
        campo.removeChild(campo.querySelector(".erro-vaga"));
      }
    }
  });
});

if (descricaoVaga.querySelector(".erro-vaga")) {
  descricaoVaga.querySelector("textarea").classList.add("erroVaga");
}

descricaoVaga.querySelector("textarea").addEventListener("keyup", function () {
  if (this.value != "") {
    descricaoVaga.querySelector("textarea").classList.remove("erroVaga");
    if (descricaoVaga.querySelector(".erro-vaga")) {
      descricaoVaga.removeChild(descricaoVaga.querySelector(".erro-vaga"));
    }
  }
});
if (requisitosVaga.querySelector(".erro-vaga")) {
  requisitosVaga.querySelector("input").classList.add("erroVaga");
}

requisitosVaga.querySelector("input").addEventListener("keyup", function () {
  if (this.value != "") {
    requisitosVaga.querySelector("input").classList.remove("erroVaga");
    if (requisitosVaga.querySelector(".erro-vaga")) {
      this.parentElement.removeChild(requisitosVaga.querySelector(".erro-vaga"));
    }
  }
});

if(levelVaga.querySelector('.erro-vaga')){
  levelVaga.querySelector('select').classList.add('erroVaga')
}

levelVaga.querySelector("select").addEventListener("change", function () {
  if (this.value != "") {
    this.classList.remove("erroVaga");
    if (levelVaga.querySelector(".erro-vaga")) {
      levelVaga.removeChild(levelVaga.querySelector(".erro-vaga"));
    }
  }
});
