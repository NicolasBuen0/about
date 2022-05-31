const btn = document.querySelector("#btn-mobile");
const nav = document.querySelector("nav");

function toggle() {
    nav.classList.toggle("ativo");
}


btn.addEventListener("click", toggle);