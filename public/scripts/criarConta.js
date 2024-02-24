let password = document.querySelector('input[type="password"]');
let verSenha = document.getElementById("verSenha");
let esconderSenha = document.getElementById("esconderSenha");
let inputName = document.querySelector('input[name="name"]');
let inputEmail = document.querySelector('input[name="email"]');
let inputPassword = document.querySelector('input[name="password"]');
let inputsTexto = document.querySelectorAll('input:not([type="radio"])');
let labelsInput = document.querySelectorAll(
  'label:not([for="recrutador"], [for="candidato"])'
);
let inputsTipoConta = document.querySelectorAll('.role input[type="radio"]')

inputsTexto.forEach((input) => {
  input.addEventListener("focusout", function () {
    if (this.value != "") {
      this.classList.add("inputAtivo");
      this.parentElement.querySelector("label").classList.add("labelAtivo");
    }
  });
});

if (verSenha) {
  verSenha.addEventListener("click", function () {
    password.setAttribute("type", "text");
    this.classList.add("hidden");
    esconderSenha.classList.remove("hidden");
  });
}

if (esconderSenha) {
  esconderSenha.addEventListener("click", function () {
    password.setAttribute("type", "password");
    this.classList.add("hidden");
    verSenha.classList.remove("hidden");
  });
}

if (document.querySelector(".alertName")) {
  inputName.classList.add("error");
  inputName.parentElement.querySelector("label").classList.add("errorLabel");
}
if (document.querySelector(".alertEmail")) {
  inputEmail.classList.add("error");
  inputEmail.parentElement.querySelector("label").classList.add("errorLabel");
}
if (document.querySelector(".alertPassword")) {
  inputPassword.classList.add("error");
  inputPassword.parentElement
    .querySelector("label")
    .classList.add("errorLabel");
}

if (inputName) {
  inputName.addEventListener("focus", function () {
    if (document.querySelector(".alertName")) {
      document.querySelector(".alertName").classList.add("hidden");
      this.parentElement.parentElement.removeChild(
        this.parentElement.parentElement.querySelector(".alertName")
      );
    }
    inputName.classList.remove("error");
    inputName.parentElement
      .querySelector("label")
      .classList.remove("errorLabel");
  });
}

inputEmail.addEventListener("focus", function () {
  if (document.querySelector(".alertEmail")) {
    document.querySelector(".alertEmail").classList.add("hidden");
    this.parentElement.parentElement.removeChild(
      this.parentElement.parentElement.querySelector(".alertEmail")
    );
  }
  inputEmail.classList.remove("error");
  inputEmail.parentElement
    .querySelector("label")
    .classList.remove("errorLabel");
});

inputPassword.addEventListener("focus", function () {
  if (document.querySelector(".alertPassword")) {
    document.querySelector(".alertPassword").classList.add("hidden");
  }
  inputPassword.classList.remove("error");
  inputPassword.parentElement
    .querySelector("label")
    .classList.remove("errorLabel");
});

inputsTexto.forEach((input) => {
  if (input.value != "") {
    input.classList.add("inputAtivo");
    input.classList.remove("error");
    input.parentElement.querySelector("label").classList.add("labelAtivo");
    input.parentElement.querySelector("label").classList.remove("errorLabel");
  }
});

inputsTipoConta.forEach((input)=>{
  input.addEventListener('change', ()=>{
    if(input.parentElement.parentElement.parentElement.querySelector('span.alertPassword')){
      input.parentElement.parentElement.parentElement.removeChild(input.parentElement.parentElement.parentElement.querySelector('span.alertPassword'))
    }
  })
})