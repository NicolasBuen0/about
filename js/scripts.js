//menu
const btn = document.querySelector("#btn-mobile");
const nav = document.querySelector("nav");

function toggle() {
    nav.classList.toggle("ativo");
}


btn.addEventListener("click", toggle);


//links projeto

const imgProjetos = document.querySelectorAll(".img-projetos");
imgProjetos.forEach(img);

function img(img) {
    console.log(img)
    img.addEventListener("click", clicou)
}

function clicou(e) {
    const hover = e.target.lastElementChild;
    hover.classList.add("ativo")
}

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

//formulario

const formulario = document.querySelector("form");

function formularioEnviado(resposta) {
    if (resposta.ok) {
        formulario.innerHTML = "<p class='sucess font-2-l'>Mensagem enviada, em breve entrarei em contato.</p>"

    } else {
        formulario.innerHTML = "<p class='spotlight font-2-l'>Erro no envio, você pode mandar diretamente para meu email: contato@nicolasbueno.com.br</p>"
    }
}

function enviarFormulario(event) {
    event.preventDefault();
    const botao = document.querySelector("form button");
    botao.disable = "true";
    botao.innerText = "Enviando...";
    const data = new FormData(formulario);
    fetch("./enviar.php", {
        method: 'POST',
        body: data,
    }).then(formularioEnviado);
}


formulario.addEventListener("submit", enviarFormulario)