import data from '../login.json' assert { "type": "json" };
const btn = document.querySelector('.btn')

const senha = document.querySelector('#senha')
senha.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    enter()
  }
})
const user = document.querySelector('#user')
user.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    enter()
  }
})

function enter() {
  const user = document.querySelector('#user').value
  const senha = document.querySelector('#senha').value

  login(user,senha)
}

btn.addEventListener('click', ()=>{
  const user = document.querySelector('#user').value
  const senha = document.querySelector('#senha').value

  login(user,senha)
})

function login(user,senha){
  data.forEach((info)=>{
    if(user == info.usuario){
      if(senha == info.senha){
        window.location.href = `./pages/paginaInicial.html?index=${info.id}`
      }
      else{
        alert("senha incorreta")
      }
    }
  })
}