let elementsAnimateLeft = document.querySelectorAll('[data-animate="left"]');
let elementsAnimateRight = document.querySelectorAll('[data-animate="right"]');
let animateVaga = document.querySelectorAll('[data-animate="vaga"]');
let solucoesLeft = document.querySelector('[data-animate="solucoes-left"]');
let solucoesRight = document.querySelector('[data-animate="solucoes-right"]');
let animateVagaRender = document.querySelectorAll('[data-animate="vaga-render"]');

elementsAnimateLeft.forEach((element, index) => {
  setTimeout(() => {
    element.classList.add("animateLeft");
  }, 300 * index);
});

elementsAnimateRight.forEach((element, index) => {
  setTimeout(() => {
    element.classList.add("animateLeft");
  }, 300 * index);
});

window.addEventListener("scroll", () => {
  let windowTop = window.scrollY + window.innerHeight * 0.95;
  animateVaga.forEach((vaga, index) => {
    if (windowTop > vaga.offsetTop) {
      setTimeout(() => {
        vaga.classList.add("animateVaga");
      }, 300 * index);
    }
  });
});

animateVagaRender.forEach((vaga, index) => {
  setTimeout(() => {
    vaga.classList.add("animateVaga");
  }, 300 * index);
});

window.addEventListener("scroll", () => {
  let windowTop = window.scrollY + window.innerHeight * 0.95;
  if(solucoesLeft){

  if (windowTop > solucoesLeft.offsetTop) {
    solucoesLeft.classList.add("animateLeft");
  }
  if (windowTop > solucoesRight.offsetTop) {
    solucoesRight.classList.add("animateRight");
  }
  }
});
