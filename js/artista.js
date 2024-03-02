import data from '../login.json' assert { "type": "json" };
const key = '9ad86eccd0632ddc636d86346b6808a0'
const baseUrl = 'https://api.vagalume.com.br'

const user = document.querySelector('.user')


const urlParam = new URLSearchParams(window.location.search)
const paramIndex = urlParam.get('index')
acharUser(paramIndex)

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