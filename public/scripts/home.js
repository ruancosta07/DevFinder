if(document.querySelector('.account')){
    document.querySelector('.account').addEventListener('click', ()=>{
        document.querySelector('.actions-account').classList.toggle('hidden')
        setTimeout(()=>{
            document.querySelector('.actions-account').classList.toggle('h-[0px]')
            document.querySelector('.actions-account').classList.toggle('text-[0rem]')
            document.querySelector('.actions-account').classList.toggle('text-[.95rem]')
        }, 1)
    })
}