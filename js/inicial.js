import data from '../login.json' assert { "type": "json" };
const key = '9ad86eccd0632ddc636d86346b6808a0'
const baseUrl = 'https://api.vagalume.com.br'

const user = document.querySelector('.user')


const urlParam = new URLSearchParams(window.location.search)
const paramIndex = urlParam.get('index')
acharUser(paramIndex)//colocar o nome do usuario na navbar




const loadNovidades = async () => {
  const res = await fetch(`${baseUrl}/hotspots.php?apikey=${key}`);
  const data = await res.json()
  const limitdata = data.hotspots.slice(0, 3)
  return limitdata
}
//https://api.vagalume.com.br/rank.php?apikey=${}&type=mus&period=day&periodVal=${data}&scope=all&limit=6
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
const tempo = new Date()
console.log(formatDate(tempo,"yyyymmdd"))

const loadAllWithPromiseAll = async () => {
  //criar uma array para todas as funções acima, ele vai esperar todas os paramentros 
  const [Novidades, MaisTocadas, topArtistas] = await Promise.all([
    loadNovidades(),
    loadRank(),
    loadRankArt()

  ])
  showHotSpots(Novidades)
  showRankMus(MaisTocadas)
  showRankArt(topArtistas)
}
loadAllWithPromiseAll()





/**Funções */
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

//Formatar a data atual para o ranking
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

//Novidades
function showHotSpots(spots){
  spots.map((spot)=>{
    const spotsSecc = document.createElement("article")
    spotsSecc.classList.add("hotSpots")
    const novidades = document.querySelector(".novidades")
    novidades.appendChild(spotsSecc)
    spotsSecc.innerHTML = 
  `
  <a href="./music.html?index=${puxarUser(paramIndex)}&id=${spot.id}" class="hotMusic" id=${spot.id}>
    <div class="imagem">
      <img src="${spot.art_pic_src}" alt="foto do artista" class="imgArt">
      <span class="nomeArt">${(spot.title).toUpperCase()}</span>
      <span class="Desc-mus">${spot.descr}</span>
    </div> 
  </a>
  `
  })  
}


//ranking de musicas
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
        <a href="./music.html?index=${puxarUser(paramIndex)}&id=${rank.id}" class="nomeMusRank">${rank.name}</a>
        <a href="./artista.html?index=${puxarUser(paramIndex)}&id=${rank.art.id}" class="nomeArtRank" >${rank.art.name}</</a>  
      </div>     
      </div>
    `

  })
}


//Rank de artistas
function showRankArt(art){
  
  const rankArtista = art.art.day.all
  console.log(rankArtista)

  

  rankArtista.map((artista,index)=>{
    const artSec = document.createElement('section')
    artSec.classList.add("rankArt")
    const rankArtpai = document.querySelector(".rankArtistas")
    rankArtpai.appendChild(artSec)

    artSec.innerHTML =`
    <a href="./artista.html?index=${puxarUser(paramIndex)}&id=${artista.id}" class="art" id="${artista.id}">
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
