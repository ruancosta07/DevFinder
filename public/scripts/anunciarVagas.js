let valoresInputs = [];
let adicionarRequisito = document.getElementById("adicionarRequisito");
let valoresTotais = document.querySelector('input[name="requirements"]');
let form = document.querySelector("form");

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