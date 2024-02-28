const key = '9ad86eccd0632ddc636d86346b6808a0'

const usuarios = [
  {
    "id":"0",
    "usuario":"testador",
  },
  {
    "id":"1",
    "usuario":"GlaucoB0",
  },
  {
    "id":"2",
    "usuario":"Carlos",
  },
  {
    "id":"3",
    "usuario":"Igor",
  }
];
const user = document.querySelector('.user')





document.addEventListener('DOMContentLoaded', ()=>{
  const urlParam = new URLSearchParams(window.location.search)
  const paramIndex = urlParam.get('index')
  acharUser(paramIndex)//colocar o nome do usuario na navbar
})

/**Funções */
function acharUser(index){
  usuarios.forEach((usuari)=>{

    if(index == usuari.id){
      console.log(usuari.usuario)
      user.innerHTML = "Bem vindo "+ usuari.usuario + "!"
    }
  })
}