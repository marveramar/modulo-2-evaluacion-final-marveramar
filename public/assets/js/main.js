'use strict';

console.log('>> Ready :)');

const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const list = document.querySelector('#list');
const form = document.querySelector('#form');


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
        const id = infoData[i].show.id
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
    }
}
let favouritesSeries = []

const selectedFavourite = (event) => {

    event.currentTarget.closest('li').classList.add('favourite')
    // let fav = localStorage.setItem(, name)
    // event.currentTarget = fav
    console.log(event.target)
}

const lis = document.querySelectorAll('li')
for (let li of lis) {
    li.addEventListener('click', selectedFavourite)
}




btn.addEventListener('click', getInfo)

//# sourceMappingURL=main.js.map
