let requisitos = document.querySelectorAll('input[name="requisitosVaga"]')

requisitos.forEach((input)=>{
    input.parentElement.querySelector('.excluir-input').addEventListener('click', function(){
        input.parentElement.removeChild(this)
        input.parentElement.removeChild(input)
    })
})