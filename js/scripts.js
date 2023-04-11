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
    img.addEventListener("click", clicou)
}

function clicou(e) {
    const hover = e.target.lastElementChild;
    hover.classList.add("ativo")
}

//animacao
new SimpleAnime();


//animacao conteiners
const containers = document.querySelectorAll(".anima");
const windowMetade = window.innerHeight * 0.6;


function anima() {
    containers.forEach((item) => {
        const itemTopo = item.getBoundingClientRect().top;
        const itemMetade = itemTopo - windowMetade;
        if (itemMetade < 0) {
            item.classList.add("ativo")
        }

    })

}

window.addEventListener("scroll", anima)


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



/* cms */

/* tokens dato */
const token = "43c9810f5d691100486311b79be13d";
const imagem = document.querySelector(".sobre-img img");


fetch(
  'https://graphql.datocms.com/',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: '{ allProjetos { imagem {url, title, customData}}, allPerfils{ perfil {url}}}'
    }),
  }
)
.then(res => res.json())
.then((res) => {
    const perfil = res.data.allPerfils[0].perfil.url; /* att foto perfil via cms */
    atualizaFotoPerfil(perfil);
    const projetos = Array.from(res.data.allProjetos)
    projetos.forEach((projeto)=>{
        const url = projeto.imagem.url;
        const titulo = projeto.imagem.title;
        const github = projeto.imagem.customData.github;
        const pagina = projeto.imagem.customData.pagina;
        createNewProject(url, titulo, github, pagina)
    })
})
.catch((error) => {
  console.log(error);
});

function createNewProject(img, title, github, pagina){
    const projetosContainer = document.querySelector(".lista-projetos");
    const modeloString  = `<li><div class="img-projetos"><img src="${img}" alt="${title}"><div class="hover"><a href="${github}" target="_blank"><img src="icons/git.svg" class="git"></a><a href="${pagina}" target="_blank"><img src="icons/pc.svg"class="git"></a></div></div><p class="font-2-s color-0">${title}</p></li>`
    const parser = new DOMParser();
    const modeloDOM = parser.parseFromString(modeloString, "text/html");
    const elemento = modeloDOM.querySelector("li");
    projetosContainer.appendChild(elemento );
}

function atualizaFotoPerfil(url){
    const imgPerfil = document.querySelector(".sobre-img img");
    imgPerfil.src=url;
   
}

