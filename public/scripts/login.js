let errosInput = document.querySelectorAll('.erro-input')
let inputsForm = document.querySelectorAll('input')

inputsForm.forEach((input)=>{
    if(input.parentElement.parentElement.querySelector('.erro-input')){
        input.classList.add('error')
        input.parentElement.parentElement.querySelector('label').classList.add('errorLabel')
    }
    input.addEventListener('keyup', ()=>{
        if(input.parentElement.parentElement.querySelector('.erro-input')){
            input.parentElement.parentElement.removeChild(input.parentElement.parentElement.querySelector('.erro-input'))
        }
    })
})