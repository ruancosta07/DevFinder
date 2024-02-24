if (document.querySelector(".account")) {
  document.querySelector(".account").addEventListener("click", function () {
    this.querySelector("i").style.transition = ".25s ease";
    this.querySelector("i").classList.toggle("rotate-180");
    document.querySelector(".actions-account").classList.toggle("hidden");
    setTimeout(() => {
      document.querySelector(".actions-account").classList.toggle("h-[0px]");
      document
        .querySelector(".actions-account")
        .classList.toggle("text-[0rem]");
      document
        .querySelector(".actions-account")
        .classList.toggle("text-[.95rem]");
    }, 1);
  });
}

document.getElementById("menu-mobile").addEventListener("change", function () {
  this.parentElement.querySelector("ul").style.transition = ".35s ease";
  this.parentElement.querySelector("ul").style.height = "0px";
  this.parentElement.querySelector("ul").style.fontSize = "0px";
  this.parentElement.querySelector("ul").classList.toggle("max-lg:hidden");
  setTimeout(() => {
    this.parentElement.querySelector("ul").style.height = "inherit";
    this.parentElement.querySelector("ul").style.fontSize = "1.2rem";
  });
});

let allVagas = document.querySelectorAll(".vagaCard");

allVagas.forEach((vaga) => {
  vaga.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    let acoesVaga = this.querySelector(".acoesVaga");
    let x = e.clientX - vaga.getBoundingClientRect().left;
    let y = e.clientY - vaga.getBoundingClientRect().top;
    if (acoesVaga) {
      document.querySelector(".vaga-ativa").classList.add("on");
      acoesVaga.style.position = "absolute";
      acoesVaga.style.zIndex = 5;
      acoesVaga.classList.replace("hidden", "grid");
      acoesVaga.style.left = `${x}px`;
      acoesVaga.style.top = `${y}px`;
      acoesVaga.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  });
});


let intervalId = 0;

allVagas.forEach((vaga) => {
  // Adiciona o evento de pressionar o botão do mouse
  vaga.addEventListener('mousedown', function (e) {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      intervalId = setTimeout(() => {
        let acoesVaga = this.querySelector('.acoesVaga');
        let x = e.clientX - vaga.getBoundingClientRect().left;
        let y = e.clientY - vaga.getBoundingClientRect().top;
        if (acoesVaga) {
          document.querySelector('.vaga-ativa').classList.add('on');
          acoesVaga.style.position = 'absolute';
          acoesVaga.style.zIndex = 5;
          acoesVaga.classList.replace('hidden', 'grid');
          acoesVaga.style.left = `${x}px`;
          acoesVaga.style.top = `${y}px`;
          acoesVaga.addEventListener('click', (e) => {
            e.stopPropagation();
          });
        }
      }, 500); // Define um delay de 0.5 segundos
    }
  });

  // Adiciona o evento de soltar o botão do mouse
  vaga.addEventListener('mouseup', function () {
    clearTimeout(intervalId);
  });
});

