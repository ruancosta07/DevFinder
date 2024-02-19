let vagasCards = document.querySelectorAll(".vagaCard");
let vagasExpanded = document.querySelectorAll(".vagaExpanded");

function fechaVaga(event) {
  this.classList.remove("on");
  vagasExpanded.forEach((item) => {
    item.classList.add("hidden");
  });
}

document.querySelector(".vaga-ativa").addEventListener("click", fechaVaga);

function mostraVaga() {
  vagasExpanded.forEach((item) => {
    item.classList.add("hidden");
    if (this.getAttribute("data-id") == item.getAttribute("data-id")) {
      item.classList.add("animate");
      item.classList.replace("hidden", "fixed");
      document.querySelector(".vaga-ativa").classList.add("on");
    }
  });
}

vagasCards.forEach((vaga) => {
  vaga.addEventListener("click", mostraVaga);
});

if (document.querySelector(".searchVaga")) {
  if (vagasCards.length == 0) {
    document.querySelector(".searchVaga").innerHTML =
      "Oops, parece que busca não retornou nenhum resultado :(";
  }
}
