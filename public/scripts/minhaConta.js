let verSenha = document.getElementById('ver-senha')
let esconderSenha = document.getElementById('esconder-senha')
let confirmarSenha = document.querySelector('input[name="confirmarSenha"]')
let senhaAtivaBg = document.querySelector('.senha-ativa')
let alterarSenhaBtn = document.getElementById('alterar-senha-btn')
let alterarSenhaForm = document.getElementById('alterar-senha-form')
let deletarContaForm = document.getElementById('deletar-conta-form')
let deletarContaBtn = document.getElementById('deletar-conta-btn')

alterarSenhaBtn.addEventListener('click', ()=>{
    alterarSenhaForm.classList.replace('hidden', 'grid')
    alterarSenhaForm.classList.add('ativo')
    senhaAtivaBg.classList.add('on')
})

senhaAtivaBg.addEventListener('click', ()=>{
    alterarSenhaForm.classList.replace('grid', 'hidden')
    deletarContaForm.classList.add('hidden')
    alterarSenhaForm.classList.remove('ativo')
    deletarContaForm.classList.remove('ativo')
    senhaAtivaBg.classList.remove('on')
})

verSenha.addEventListener('click', ()=>{
    verSenha.classList.add('hidden')
    esconderSenha.classList.remove('hidden')
    confirmarSenha.setAttribute('type', 'text')
})

esconderSenha.addEventListener('click', ()=>{
    verSenha.classList.remove('hidden')
    esconderSenha.classList.add('hidden')
    confirmarSenha.setAttribute('type', 'password')
})

deletarContaBtn.addEventListener('click', ()=>{
    deletarContaForm.classList.replace('hidden', 'grid')
    deletarContaForm.classList.add('ativo')
    senhaAtivaBg.classList.add('on')
})

if(document.querySelector('.erro-deletar')){
    senhaAtivaBg.classList.add('on')
}

