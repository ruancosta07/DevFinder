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
  vaga.addEventListener("mousedown", function (e) {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      intervalId = setTimeout(() => {
        let acoesVaga = this.querySelector(".acoesVaga");
        let x = e.clientX - vaga.getBoundingClientRect().left;
        let y = e.clientY - vaga.getBoundingClientRect().top;
        if (acoesVaga) {
          document.querySelector(".vaga-ativa").classList.add("on");
          acoesVaga.style.position = "absolute";
          acoesVaga.style.zIndex = 5;
          acoesVaga.classList.replace("hidden", "grid");
          acoesVaga.style.left = x - 20 + 'px';
          acoesVaga.style.top = y - 20 + 'px';
          acoesVaga.addEventListener("click", (e) => {
            e.stopPropagation();
          });
        }
      }, 500); // Define um delay de 0.5 segundos
    }
  });

  // Adiciona o evento de soltar o botão do mouse
  vaga.addEventListener("mouseup", function () {
    clearTimeout(intervalId);
  });
});

let excluirVaga = document.querySelectorAll(".excluir-vaga");

excluirVaga.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});
