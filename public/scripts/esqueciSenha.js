let esqueciSenhaBtn = document.getElementById("esqueci-senha-btn");
let esqueciSenhaForm = document.getElementById("confirmaEmail");
let formAtivo = document.querySelector(".form-ativo");
esqueciSenhaBtn.addEventListener("click", () => {
  if (esqueciSenhaForm) {
    esqueciSenhaForm.classList.remove("hidden");
    esqueciSenhaForm.classList.add("ativo");
  }
  if(document.getElementById('alterarSenha')){
    document.getElementById('alterarSenha').classList.remove('hidden')
  }
  formAtivo.classList.add("on");
});

formAtivo.addEventListener("click", () => {
  if (esqueciSenhaForm) {
    esqueciSenhaForm.classList.add("hidden");
  }
  formAtivo.classList.remove("on");
  if (document.getElementById("alterarSenha")) {
    document.getElementById("alterarSenha").classList.add("hidden");
  }
});

if (document.getElementById("alterarSenha")) {
  formAtivo.classList.add("on");
}
