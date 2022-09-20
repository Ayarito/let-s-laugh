const API = 'https://api.giphy.com/v1/gifs/search?api_key='

const KEY = 'sTdCJjIAUz2fNDMUob8nqHx6G50HnUzP'

const limit = '&limit='

const rest = '&q='

const text = document.querySelector('#searchGiphy')
const btn = document.querySelector('#btn')
const output = document.querySelector('#output')
const count = document.querySelector('#count')

const allInputs = document.querySelectorAll('.input')


const search = async(city) =>{
    try{
        const url = `${API}${KEY}${limit}${count.value}${rest}${text.value?text.value:city}`

        const request = await fetch(url)
    
        const response = await request.json()
    
        render(response.data)
    }catch(e){
        alert('error')
    }
}
search('bishkek')

const render = (data) =>{
    console.log(data)
    output.innerHTML=''
    data.forEach(el=>{
        const row = document.querySelector('.row')
        const iframe = document.createElement('iframe')
        const title = document.createElement('p')
        title.className='textGiphy'

        const box = document.createElement('div')
        box.className='box__giphy'
        
        const col = document.createElement('div')
        col.className='col-3'

        iframe.src = el.embed_url
        title.textContent = el.title

     box.append(iframe,title)  
     col.append(box)
     row.append(col)
    //  output.append(row)
    //   output.append(iframe,title)
    });
    
}

const disableBtn = () => {
    document.querySelector('.error').textContent = 'Field is empty'
    btn.style.pointerEvents = 'none'
    btn.style.opacity = '0.5'
}

const enableBtn = () => {
    document.querySelector('.error').textContent = ''
    btn.style.pointerEvents = 'unset'
    btn.style.opacity = '1'
}

const validateInload = () =>{
    search('bishkek')
    if(!text.value || !count.value){
        disableBtn()
    }
}
validateInload()


btn.addEventListener('click', () => {

    if (!text.value || !count.value) {
        disableBtn()
    } else {
        enableBtn()
        search()
    }

})

allInputs.forEach(el => {
    el.addEventListener('keyup',e=> {
        if (!e.target.value) {
            disableBtn()
        } else {
            enableBtn()
        }
    })
})


allInputs.forEach((el,index) => {
    el.addEventListener('keyup', e=> {
        if (e.key === 'Enter') {
            if (!text.value || !count.value) {
                disableBtn()
            } else {
                enableBtn()
                search()
            }
        }
    })
})