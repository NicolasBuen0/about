//menu
const btn = document.querySelector("#btn-mobile");
const nav = document.querySelector("nav");

function toggle() {
    nav.classList.toggle("ativo");
}


btn.addEventListener("click", toggle);


//timeout para links projeto

/* const imgProjetos = document.querySelectorAll(".img-projetos");
imgProjetos.forEach(img);

function img(img) {
    img.addEventListener("click", clicou)
}

function clicou(e) {
    const hover = e.target.lastElementChild;
    hover.classList.add("ativo")
} */