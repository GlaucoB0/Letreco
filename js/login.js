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
        window.location.href = `./pages/paginaInicial.html?index=${encriptar(info.id)}`
      }
      else{
        alert("senha incorreta")
      }
    }
  })
}

//let idCripto = encriptar(paramIndex)

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