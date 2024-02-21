let excluirVaga = document.querySelectorAll('.excluir-vaga')

excluirVaga.forEach((item)=>{
    item.addEventListener('click', (event)=>{
        event.stopPropagation()
    })
})