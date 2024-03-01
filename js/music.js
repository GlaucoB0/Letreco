import data from '../login.json' assert { "type": "json" };
const key = '9ad86eccd0632ddc636d86346b6808a0'
const baseUrl = "https://api.vagalume.com.br"

const user = document.querySelector(".user")
const urlParam = new URLSearchParams(window.location.search)
const userId = urlParam.get('index')
const musicId = urlParam.get('id')

acharUser(userId)//colocar o nome do usuario na navbar

// https://api.vagalume.com.br/search.php?apikey=${key}&musid=${id}
// https://www.vagalume.com.br/${nomeArtista}/index.js



//funções
function acharUser(index){
  data.forEach((usuario)=>{
    if(index == usuario.id){
      user.innerHTML = "Bem vindo "+ usuario.usuario + "!"
    }
  })
}

fetch(`https://api.vagalume.com.br/search.php?apikey=${key}&musid=${musicId}`)
.then((res)=>res.json())
.then((data)=>{
  const artista = loadArtista(data)
  
})

async function loadArtista(music) {
  console.log(music.art.url+"index.js")
  const res = await fetch(music.art.url+"index.js");
  const data = await res.json()
  
  showMusic(data,music)
}

function showMusic(data,music){
  const letra = document.querySelector(".letra")
  console.log(data)
  console.log(music)
  letra.innerHTML=
  `
  <div class="infoMusica">
    <img src="${baseUrl}${data.artist.pic_small}"></img>
    <div class="nomeMusica">
      <span class="nome">${music.mus[0].name}</span>
      <span class="nomeArtista">${music.art.name}</span>
    </div>
  </div>

  <div class="letraMusica">
    <p>${tratarLetra(music.mus[0].text)}</p>
  </div>
  `
}
function tratarLetra(letra){
  return letra.replace(/\n/g,"<br>")
}