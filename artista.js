import data from '../login.json' assert { "type": "json" };
const key = '9ad86eccd0632ddc636d86346b6808a0'
const baseUrl = 'https://www.vagalume.com.br'
const baseUrlApi = 'https://api.vagalume.com.br'


const user = document.querySelector('.user')


const urlParam = new URLSearchParams(window.location.search)
const paramIndex = urlParam.get('index')
const urlArtista = urlParam.get('name')

fetch(`https://www.vagalume.com.br${urlArtista}index.js`)
.then((res)=>res.json())
.then((dataArt)=>{
  //console.log(dataArt)
  nomePagina(dataArt)
  loadArtist(dataArt)
  randomMusic(dataArt)
})
acharUser(paramIndex)



function randomMusic(datas){
  const randomElement = datas.artist.lyrics.item[Math.floor(Math.random() * datas.artist.lyrics.item.length)]
  const btn = document.querySelector(".randomMusic")
  btn.addEventListener('click',()=>{
    window.location.href = `./music.html?index=${puxarUser(paramIndex)}&id=${randomElement.id}`
  })
}
//Funções main
function loadArtist(dataArt){
  const imagem = document.querySelector(".imagem-Principal")
  imagem.innerHTML = 
  `
  <section class="hero">
    <img id="hero" src=${baseUrl+dataArt.artist.pic_medium} alt="">
    <div class="infos-artista">
      <div class="nomeRank">
        <h1 class="nomeArtista">${dataArt.artist.desc}</h1><span>Top ${dataArt.artist.rank.pos}</span>
      </div>
      <span class="views">${dataArt.artist.rank.views} views</span>
    </div>
  </section>
  `
  console.log(dataArt)

  





  let MaisTocadasArr = dataArt.artist.toplyrics.item
  MaisTocadasArr = MaisTocadasArr.slice(0, 15)

  

  
  MaisTocadasArr.map((music,index)=>{
    const musics = document.querySelector(".Musics")
    const musicDiv = document.createElement("div")
    musicDiv.classList.add("musica")
    musics.appendChild(musicDiv)
    
    musicDiv.innerHTML = 
    `
    <a class="a"  href="./music.html?index=${puxarUser(paramIndex)}&id=${music.id}">
      <span class="numeroRank">${index+1}</span>
      <span>${music.desc}</span>
    </a>
    `
  })
  const allMusicsArr = dataArt.artist.lyrics.item
  allMusicsArr.map((music,index)=>{
    const allMusics =document.querySelector(".allMusics")
    const musicDiv = document.createElement("div")
    musicDiv.classList.add("musica")
    allMusics.appendChild(musicDiv)

    musicDiv.innerHTML = 
    ` 
    <a class="a" href="./music.html?index=${puxarUser(paramIndex)}&id=${music.id}">
      <span class="numeroRank">${index+1}</span>
      <span>${music.desc}</span>
    </a>
    `
  })
  
}

//Funções uteis
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
function nomePagina(dataArt){
  const title = document.querySelector('#title-art')
  title.innerHTML = `${dataArt.artist.desc} - Letreco`
}


/********mais tocadas do site******* */
const tempo = new Date()
const loadRank = async () => {
  const res = await fetch(`${baseUrlApi}/rank.php?apikey=${key}&type=mus&period=day&periodVal=${formatDate(tempo,"yyyymmdd")}&scope=all&limit=10
  `);
  const data = await res.json()
  return data
}

const loadRankArt = async () => {
  const res = await fetch(`${baseUrlApi}/rank.php?apikey=${key}&type=art&period=day&periodVal=${formatDate(tempo,"yyyymmdd")}&scope=all&limit=3
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
    <a href="./music.html?index=${puxarUser(paramIndex)}&id=${rank.id}" class="music">
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

    artSec.innerHTML =`
    <a href="./artista.html?index=${puxarUser(paramIndex)}&name=${tratarART(artista.url)}" class="art" id="${artista.id}">
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