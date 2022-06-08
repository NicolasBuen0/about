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

//animacao
new SimpleAnime();

//scroll suave
function scrollSuave() {
    const links = document.querySelectorAll("a[href^='#']")
    links.forEach(link => {
        ["touchstart", "click"].forEach(evento => {
            link.addEventListener(evento, scrollLink)
        })
    })

    function scrollLink(event) {
        event.preventDefault();
        const to = getScrollTopByHref(event.target) - 95;
        scrollToPosition(to);
    }

    function scrollToPosition(to) {
        window.scroll({
            top: to,
            behavior: "smooth",
        });
    }

    function getScrollTopByHref(element) {
        const id = element.getAttribute("href");
        return document.querySelector(id).offsetTop;
    }
}

scrollSuave()