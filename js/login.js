const data = [
  {
    "id":"0",
    "usuario":"testador",
    "senha":"123"
  },
  {
    "id":"1",
    "usuario":"GlaucoB0",
    "senha":"scott12"
  },
  {
    "id":"2",
    "usuario":"Carlos",
    "senha":"abc321"
  },
  {
    "id":"3",
    "usuario":"Igor",
    "senha":"abc123"
  }
];

const btn = document.querySelector('.btn')

btn.addEventListener('click', ()=>{
  const user = document.querySelector('#user').value
  const senha = document.querySelector('#senha').value

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
})