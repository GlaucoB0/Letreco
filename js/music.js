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
function puxarUser(index){
  let user = ""
  data.forEach((usuario)=>{
    
    if(index == usuario.id){
      user = `${usuario.id}`
    }
  })
  return `${user}`
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
  const title = document.querySelector("#title-mus")
  title.innerHTML = `${music.mus[0].name} - Letreco`
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

/**Rank */
const tempo = new Date()
const loadRank = async () => {
  const res = await fetch(`${baseUrl}/rank.php?apikey=${key}&type=mus&period=day&periodVal=${formatDate(tempo,"yyyymmdd")}&scope=all&limit=10
  `);
  const data = await res.json()
  return data
}

const loadRankArt = async () => {
  const res = await fetch(`${baseUrl}/rank.php?apikey=${key}&type=art&period=day&periodVal=${formatDate(tempo,"yyyymmdd")}&scope=all&limit=3
  `);
  const data = await res.json()
  return data
}
function formatDate(date, format) {
  const map = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      yyyy: date.getFullYear(),
  }
  if(map.dd < 10){
    map.dd = `0${map.dd}`
  }
  if(map.mm < 10){
    map.mm = `0${map.mm}`
  }
  return format.replace(/mm|dd|yyyy/gi, matched => map[matched])
}
const loadAllWithPromiseAll = async () => {
  //criar uma array para todas as funções acima, ele vai esperar todas os paramentros 
  const [MaisTocadas, topArtistas] = await Promise.all([
    loadRank(),
    loadRankArt()

  ])
  showRankMus(MaisTocadas)
  showRankArt(topArtistas)
}
loadAllWithPromiseAll()

function showRankMus(date){
  const ranks = date.mus.day.all
  ranks.map((rank,index)=>{
    const rankSecc = document.createElement('section')
    rankSecc.classList.add("rankMus")
    const rankPai = document.querySelector(".maisAcessadas")
    rankPai.appendChild(rankSecc)
    rankSecc.innerHTML = 
    `
    <div class="music">
      <span class="numRank">${index+1}</span>
      <div class="info-musica">
        <a href="./music.html?index=${puxarUser(userId)}&id=${rank.id}" class="nomeMusRank">${rank.name}</a>
        <a href="./artista.html?index=${puxarUser(userId)}&id=${rank.art.id}" class="nomeArtRank" >${rank.art.name}</</a>  
      </div>     
      </div>
    `

  })
}
function showRankArt(art){
  
  const rankArtista = art.art.day.all
  console.log(rankArtista)

  

  rankArtista.map((artista,index)=>{
    const artSec = document.createElement('section')
    artSec.classList.add("rankArt")
    const rankArtpai = document.querySelector(".rankArtistas")
    rankArtpai.appendChild(artSec)

    artSec.innerHTML =`
    <a href="./artista.html?index=${puxarUser(userId)}&id=${artista.id}" class="art" id="${artista.id}">
      <div class="imagemArt">
        <img src="${artista.pic_medium}">
         
        </img> 
         <span class="numRankArt">${index+1}°</span>   
      </div>
      <div class="info-artista">
        <span class="nomeArtRank">${artista.name}</span>
        <span class="views">${artista.views} views</span>
      </div>

    </a>
    `
  })
}