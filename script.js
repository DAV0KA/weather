let tempBlock = document.querySelector('#temp')
let cityBlock = document.querySelector('#city')
let imgBlock = document.querySelector('.img-block')
let local_date = document.querySelector('#local-date')
let searchInp = document.querySelector('.search')

setInterval(() => {
    let date = new Date;
    local_date.textContent = `Local time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}, 1000)

let city = 'Saratov'

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        let value = searchInp.value;
        if(!value) return false;
        city = value;
        init()
        searchInp.value = ''
    }
})

function init() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e0dc0a3cc420dc09135db69654def5e9`)
        .then((resp) => {return resp.json()})
        .then((data) => {

            tempBlock.textContent = `${temperature()}°`

            cityBlock.textContent = `City: ${data.name}`

            console.log()

            function temperature() {
                let getTemp = data.main.temp
                let tempC = Math.floor(getTemp) - 273
                return tempC
            }



            console.log('перезапуск')
        })
        .catch(() => {
            alert('This city not found')
            city = 'Saratov';
            init()
            searchInp.value = ''
        })
}

init()

setInterval(() => {
    init()
}, 100000) //Обновляет инфу каждые 100секунд