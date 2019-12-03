'use strict';

console.log('>> Ready :)');

const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const divFav = document.querySelector('.div')


function getInfo() {
    const inputValue = input.value
    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)

        .then(response => response.json())
        .then(data => {
            paintSeries(data)
            console.log(data)
        })
}



const paintSeries = (infoData) => {
    let imageDefault = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV.'
    for (let i = 0; i < infoData.length; i++) {
        const name = infoData[i].show.name
        const img = infoData[i].show.image
        const elementLi = document.createElement('li');
        const content = document.createTextNode(`${name}`);
        const elementH2 = document.createElement('h2'); elementH2.appendChild(content);
        elementLi.appendChild(elementH2);
        const elementImage = document.createElement('img');
        elementLi.appendChild(elementImage)
        elementLi.classList.add('li')
        list.appendChild(elementLi);
        if (img !== null) {
            elementImage.src = infoData[i].show.image.medium;
        }
        else {
            elementImage.src = imageDefault;
        }
        elementLi.addEventListener('click', selectedFavourite)

        const clearWindow = () => {
            if (elementLi.classList.contains('favourite')) {
                elementLi.classList.remove('hidden')
            }
            else {
                elementLi.classList.add('hidden')
            }
        }
        input.addEventListener('keyup', clearWindow)
    }
}
let array = []
const selectedFavourite = (event) => {
    console.log(event.currentTarget)
    const selected = event.currentTarget
    event.currentTarget.closest('li').classList.toggle('favourite')
    divFav.appendChild(selected)
    const object = {
        info: selected.innerHTML
    }
    array.push(objectSerie);
    localStorage.setItem('array', JSON.stringify(array))
}


// let lastVisitedFavourites = []
const getFavourites = () => {
    const myLocalStorage = JSON.parse(localStorage.getItem('array'))
    if (myLocalStorage !== null) {
        //     lastVisitedFavourites = JSON.parse(myLocalStorage)
        const fav = document.createElement('li')
        const contain = myLocalStorage
        fav.appendChild(contain)
        divFav.appendChild(fav)
        addLastVisited(myLocalStorage)
    }

    const addLastVisited = (object) =>
        divFav.innerHTMl += object.info
}
document.addEventListener('load', getFavourites)
btn.addEventListener('click', getInfo)
//  const selectedFavourite = (event) => {
//     const selected = event.currentTarget
//     event.currentTarget.closest('li').classList.toggle('favourite')
//     div.appendChild(selected)
//     localStorage.setItem("favoritas", JSON.stringify(array))
//    
// }
//# sourceMappingURL=main.js.map
