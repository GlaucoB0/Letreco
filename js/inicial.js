import data from '../login.json' assert { "type": "json" };
const key = '9ad86eccd0632ddc636d86346b6808a0'
const baseUrl = 'https://api.vagalume.com.br'

const user = document.querySelector('.user')

document.addEventListener('DOMContentLoaded', ()=>{
  const urlParam = new URLSearchParams(window.location.search)
  const paramIndex = urlParam.get('index')
  acharUser(paramIndex)//colocar o nome do usuario na navbar
})



const loadNovidades = async () => {
  const res = await fetch(`${baseUrl}/hotspots.php?apikey=${key}
  `);
  const data = await res.json()
  const limitdata = data.hotspots.slice(0, 3)
  return limitdata
}




const loadAllWithPromiseAll = async () => {
  //criar uma array para todas as funções acima, ele vai esperar todas os paramentros 
  const [Novidades, MaisTocadas, topArtistas] = await Promise.all([
    loadNovidades(),

  ])
  showHotSpots(Novidades)
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

function showHotSpots(spots){
  
  
  console.log(spots)
  spots.map((spot)=>{
    const spotsSecc = document.createElement("article")
    spotsSecc.classList.add(".hotSpots")
    const novidades = document.querySelector(".novidades")
    novidades.appendChild(spotsSecc)
    spotsSecc.innerHTML = 
  `
  <div class=${spot.id}>
    <div class="imagem">
      <img src="${spot.art_pic_src}" alt="foto do artista" class="imgArt">
      <span class="nomeArt">${spot.title}</span>
    </div>
            
  </div>
  `
  console.log(spot)
  })
  
}
/** main */

