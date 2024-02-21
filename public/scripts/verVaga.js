let vagasCards = document.querySelectorAll(".vagaCard");
let vagasExpanded = document.querySelectorAll(".vagaExpanded");

function fechaVaga(event) {
  document.querySelector(".vaga-ativa").classList.remove("on");
  document.body.style.overflowY = "scroll";
  vagasExpanded.forEach((item) => {
    item.classList.add("hidden");
  });
  if (document.querySelector(".filtros")) {
    document.querySelector(".filtros").classList.toggle("filtrosAnimate");
    document.querySelector(".filtros").classList.toggle("max-lg:right-full");
    document.querySelector(".ativa-filtros").classList.toggle("hidden");
  }
}

if (document.querySelector(".vaga-ativa")) {
  document.querySelector(".vaga-ativa").addEventListener("click", fechaVaga);
}

if (document.querySelector(".filtros")) {
  document.querySelector(".filtros").style.transition = ".3s !important";
  document.querySelector(".ativa-filtros").addEventListener("click", () => {
    document.querySelector(".filtros").classList.toggle("max-lg:right-full");
    document.querySelector(".filtros").classList.toggle("filtrosAnimate");
    document.querySelector(".ativa-filtros").classList.toggle("hidden");
    document.querySelector(".vaga-ativa").classList.toggle("on");
  });
}

if (document.querySelector(".fecha-filtros")) {
  document.querySelector(".fecha-filtros").addEventListener("click", () => {
    document.querySelector(".filtros").classList.toggle("max-lg:right-full");
    document.querySelector(".filtros").classList.toggle("filtrosAnimate");
    document.querySelector(".vaga-ativa").classList.toggle("on");
    document.querySelector(".ativa-filtros").classList.toggle("hidden");
  });
}

function mostraVaga() {
  vagasExpanded.forEach((item) => {
    item.classList.add("hidden");
    if (this.getAttribute("data-id") == item.getAttribute("data-id")) {
      // document.body.style.overflowY = 'hidden'
      item.classList.add("animate");
      item.classList.replace("hidden", "grid");
      document.querySelector(".vaga-ativa").classList.add("on");
    }
  });
}

document.querySelectorAll(".fechar-vaga").forEach((close) => {
  close.addEventListener("click", () => {
    document.querySelector(".vaga-ativa").classList.remove("on");
    vagasExpanded.forEach((vaga) => {
      vaga.classList.add("hidden");
    });
  });
});

vagasCards.forEach((vaga) => {
  vaga.addEventListener("click", mostraVaga);
});

if (document.querySelector("h1.searchVaga")) {
  if (vagasCards.length < 1) {
    document.querySelector(".searchVaga").innerHTML =
      "Oops, parece que busca não retornou nenhum resultado :(";
  }
}
