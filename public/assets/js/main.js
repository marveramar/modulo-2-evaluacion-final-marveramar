'use strict';

const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const errorText = document.querySelector('.error');
const divFav = document.querySelector('.div');
const btnLog = document.querySelector('.btn-log');
let series;

function getInfo() {
    const inputValue = input.value
    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)

        .then(response => response.json())
        .then(data => {
            series = data;
            if (data.length > 0) {
                errorText.classList.add('hidden')
                paintSeries(data)
                console.log(data)
            }
            else {
                errorText.classList.remove('hidden')
            }
        })
}

const paintSeries = (infoData) => {
    let imageDefault = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV.'
    for (let i = 0; i < infoData.length; i++) {
        const name = infoData[i].show.name
        const img = infoData[i].show.image
        const id = infoData[i].show.id
        const time = infoData[i].show.schedule
        const timeSerie = time.time
        const elementP = document.createElement('p');
        const contentP = document.createTextNode(`${timeSerie}`)
        elementP.appendChild(contentP)
        const elementLi = document.createElement('li');
        const elementH2 = document.createElement('h2');
        const content = document.createTextNode(`${name}`);
        elementH2.appendChild(content);
        elementLi.appendChild(elementH2);
        const elementImage = document.createElement('img');
        elementLi.appendChild(elementImage)
        const elementId = document.createElement('span');
        const IdContent = document.createTextNode(`${id}`);
        elementId.classList.add('hidden');
        elementLi.appendChild(elementP);
        elementId.appendChild(IdContent);
        elementLi.appendChild(elementId);
        elementLi.classList.add('li');
        list.appendChild(elementLi);
        if (img !== null) {
            elementImage.src = infoData[i].show.image.medium;
        }
        else {
            elementImage.src = imageDefault;
        }
        //ejecutar función para seleccionar favorito

        elementLi.addEventListener('click', selectedFavourite)

        //función para limpiar la ventana en nueva búsqueda

        const clearWindow = () => {
            list.innerHTML = ''
        }
        input.addEventListener('keydown', clearWindow)
    }
}

//función para seleccionar favorito

let array = []
const selectedFavourite = (event) => {
    console.log(event.currentTarget)
    const selected = event.currentTarget
    event.currentTarget.closest('li').classList.add('favourite')
    const object = {
        "info": selected.innerHTML
    }
    array.push(object);
    localStorage.setItem("listFav", JSON.stringify(array))
    divFav.appendChild(selected);
}

//función coger datos localStorage

let lastFavourites = '';
const getFavourites = () => {
    const myLocalStorage = localStorage.getItem("listFav");
    if (myLocalStorage !== null) {
        lastFavourites = JSON.parse(myLocalStorage)
        paintFav(lastFavourites);
    }
}

//función pasar por el array q me traigo de local

const paintFav = (array) => {
    for (let element of array) {
        addLastVisited(element)
    }
}

//función para pintar el objeto traido de local

const addLastVisited = (ob) => {
    const elementLiFav = document.createElement('li');
    elementLiFav.classList.add('favourite');
    elementLiFav.innerHTML = ob.info;
    divFav.appendChild(elementLiFav);
}

//función para que 'enter' imite 'click'

const enterKeyHandler = (event) => {
    event.preventDefault();
    getInfo()
}


const log = () => {
    for (let i = 0; i < series.length; i++) {
        console.log(series[i].show.name)
    }
}

// btnDelete.addEventListener('click', deleteFav);
btnLog.addEventListener('click', log)
window.addEventListener('load', getFavourites);
form.addEventListener('submit', enterKeyHandler);
btn.addEventListener('click', getInfo);






//# sourceMappingURL=main.js.map
