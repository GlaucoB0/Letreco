import data from '../login.json' assert { "type": "json" };
const key = '9ad86eccd0632ddc636d86346b6808a0'
const baseUrl = "https://api.vagalume.com.br"

const user = document.querySelector(".user")
const urlParam = new URLSearchParams(window.location.search)
let userId = urlParam.get('index')
const musicId = urlParam.get('id')
userId = descript(userId)


let idCripto = encriptar(userId)

function encriptar(id){
  var encriptarID1 = 
  id.replace(/0/g,"lUy").replace(/1/g,"Bolp").replace(/2/g,"chArt").replace(/3/g,"mInt").replace(/4/g,"Ped").replace(/5/g,"lont").replace(/6/g,"minh").replace(/7/g,"lkj").replace(/8/g,"zdr").replace(/9/g,"paraM")
  
  var encriptarID2 =
  encriptarID1.replace(/U/g,"JJkm1").replace(/a/g,"1Hf").replace(/o/g,"0Klm").replace(/e/g,"H4g").replace(/m/g,"0Kk")

  return `${encriptarID2}`

}
function descript(cripto){

  var encriptarID2 =
  cripto.replace(/0Kk/g,"m").replace(/H4g/g,"e").replace(/0Klm/g,"o").replace(/1Hf/g,"a").replace(/JJkm1/g,"U");

  var original = 
  encriptarID2.replace(/paraM/g,"9").replace(/zdr/g,"8").replace(/lkj/g,"7").replace(/minh/g,"6").replace(/lont/g,"5").replace(/Ped/g,"4").replace(/mInt/g,"3").replace(/chArt/g,"2").replace(/Bolp/g,"1").replace(/lUy/g,"0")
  
  return `${original}`
}
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
  return `${encriptar(user)}`
}

acharUser(userId)//colocar o nome do usuario na navbar

// https://api.vagalume.com.br/search.php?apikey=${key}&musid=${id}
// https://www.vagalume.com.br/${nomeArtista}/index.js

let i = 0
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
const barra = document.querySelector("#menu")
function carregarPesquisa(data){
  if(i!=0){
    barra.innerHTML = ""
  }
  i++
  const menu = document.createElement("div")
  menu.classList.add("barra")
  data.response.docs.map((results)=>{

  
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
      const main = document.querySelector("main")
      main.addEventListener("click",()=>{
        barra.innerHTML = " "
        menu.innerHTML = " "
      })
    })

 
}



const logo = document.querySelector("#logo")
logo.addEventListener('click',()=>{
  window.location.href = `./paginaInicial.html?index=${encriptar(userId)}`
})
//funções

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
  <div>
    <div class="infoMusica">
      <img src="${baseUrl}${data.artist.pic_small}"></img>
      <div class="nomeMusica">
        <span class="nome">${music.mus[0].name}</span>
        <a href="./artista.html?index=${puxarUser(userId)}&name=${data.artist.url}" class="nomeArtista">${music.art.name}</a>
        
      </div>
      <div class="tradutor"></div> 
    </div> 
    
  </div>
  
  <div class="letraMusica">
    <p id="letraMusica">${tratarLetra(music.mus[0].text)}</p>
    <a class="fonte" href="${music.mus[0].url}"><br>(letra retirada de: ${music.mus[0].url})</a>
  </div>
  `
  traduzir(music.mus[0],music.mus[0].translate[0].text)
}
function tratarLetra(letra){
  return letra.replace(/\n/g,"<br>")
}
let t = 0
function traduzir(letra,letraTraduzida){
    if(letra.translate != undefined){
      const tradutor = document.querySelector('.tradutor')
      const letraMusica = document.querySelector('#letraMusica')
      const traduzir = document.createElement('button')
      traduzir.classList.add('traduzir')
      traduzir.innerHTML = `Tradução`
      tradutor.appendChild(traduzir)
      
        traduzir.addEventListener('click',()=>{
          if(t == 0){
          t++
          letraMusica.innerHTML = `${tratarLetra(letraTraduzida)}`
          traduzir.innerHTML = `Original`
        }
        else{
          letraMusica.innerHTML = `${tratarLetra(letra.text)}`
          t = 0
          traduzir.innerHTML = `Tradução`
      }
    })
      }
      
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