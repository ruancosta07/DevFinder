if(document.querySelector('.flashMsg')){
  setTimeout(()=>{
    document.querySelector('.flashMsg').classList.add('flashIn')
  }, 100)
  setTimeout(()=>{
    document.querySelector('.flashMsg').classList.remove('flashIn')
    document.querySelector('.flashMsg').classList.add('flashOut')
  }, 3000)
}

