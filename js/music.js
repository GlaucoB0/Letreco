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

const btnpesquisa = document.querySelector("#pesquisar")
btnpesquisa.addEventListener('click',()=>{
  let valorPesquisa = document.querySelector(".pesquisar").value
  valorPesquisa = valorPesquisa.replace(/ /g, "%20")
  console.log(valorPesquisa)
  fetch(`https://api.vagalume.com.br/search.artmus?apikey=${key}&q=${valorPesquisa}&limit=5`)
  .then((res)=>res.json())
  .then((data)=>{
    carregarPesquisa(data)
    console.log(data)
  })
})

function carregarPesquisa(data){
  const menu = document.createElement("div")
  menu.classList.add("barra")
  data.response.docs.map((results)=>{

  const barra = document.querySelector("#menu")
    barra.appendChild(menu)
    const nome = document.createElement("div")
    menu.appendChild(nome)
    if(results.title == undefined){
    nome.innerHTML=
      `
      <a href="./artista.html?index=${puxarUser(userId)}&name=${tratarART(results.url)}" class="banda">${results.band}</a>
      `
    }
    else{
      nome.innerHTML=
      `
      <a href="./music.html?index=${puxarUser(userId)}&id=${results.id}"> ${results.title} - <span class="banda">${results.band}</span></a>
      `
    }

    })

 
}

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
  const res = await fetch(music.art.url+"index.js");
  const data = await res.json()
  
  showMusic(data,music)
}

function showMusic(data,music){
  const letra = document.querySelector(".letra")
  const title = document.querySelector("#title-mus")
  title.innerHTML = `${music.mus[0].name} - Letreco`
  letra.innerHTML=
  `
  <div class="infoMusica">
    <img src="${baseUrl}${data.artist.pic_small}"></img>
    <div class="nomeMusica">
      <span class="nome">${music.mus[0].name}</span>
      <a href="./artista.html?index=${puxarUser(userId)}&name=${data.artist.url}" class="nomeArtista">${music.art.name}</a>
    </div>
  </div>  
  <div class="letraMusica">
    <p>${tratarLetra(music.mus[0].text)}</p>
    <a class="fonte" href="${music.mus[0].url}"><br>(letra retirada de: ${music.mus[0].url})</a>
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
    <a href="./music.html?index=${puxarUser(userId)}&id=${rank.id}" class="music">
      <span class="numRank">${index+1}</span>
      <div class="info-musica">
        <div class="nomeMusRank">${rank.name}</div>
        <div class="nomeArtRank" >${rank.art.name}</div>  
      </div>     
    </a>
    `

  })
}
function showRankArt(art){
  
  const rankArtista = art.art.day.all


  

  rankArtista.map((artista,index)=>{
    const artSec = document.createElement('section')
    artSec.classList.add("rankArt")
    const rankArtpai = document.querySelector(".rankArtistas")
    rankArtpai.appendChild(artSec)
    console.log(artista)
    artSec.innerHTML =`
    <a href="./artista.html?index=${puxarUser(userId)}&name=${tratarART(artista.url)}" class="art" id="${artista.id}">
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
function tratarART(artista){
  let nomeArt = artista
  nomeArt = nomeArt.replace("https://www.vagalume.com.br","")
  return `${nomeArt}`
}