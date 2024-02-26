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


