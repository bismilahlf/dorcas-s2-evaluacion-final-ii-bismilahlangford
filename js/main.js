'use strict';

var inputs = document.querySelectorAll('.input');
var button = document.querySelector('.button');
var list = document.querySelector('.card__list');

var numberOfCards = 4;

var listItem;
var imageFront;
var imageBack;

for (var input of inputs){
  input.addEventListener('click', setCardNumber);
}
function setCardNumber(event){
  numberOfCards = event.currentTarget.value;
}

button.addEventListener('click', createCards);

function createCards() {
  list.innerHTML = '';
  fetch('https://raw.githubusercontent.com/Adalab/cards-data/master/' + numberOfCards + '.json')
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      for (var jsonItem of json) {
        listItem = document.createElement('li');
        listItem.classList.add('list__item');
        list.appendChild(listItem);
        listItem.addEventListener('click', flipCard);

        imageFront = document.createElement('img');
        imageFront.classList.add('hidden');
        listItem.appendChild(imageFront);
        imageFront.src = jsonItem.image;

        imageBack = document.createElement('img');
        imageBack.classList.add('visible');
        listItem.appendChild(imageBack);
        imageBack.src = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
      }
    });
}

function flipCard(event){
  var imageVisible = event.currentTarget.querySelector('.visible');
  var imageHidden = event.currentTarget.querySelector('.hidden');

  imageVisible.classList.remove('visible');
  imageVisible.classList.add('hidden');

  imageHidden.classList.remove('hidden');
  imageHidden.classList.add('visible');
}