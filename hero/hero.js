'use strict';

// Set cards to array. 
const cards = Array.from(document.getElementById('stackWrapper').children);

// Count the cards and set their width inside the wrapper so
// we can have as many/few as we need and have it still fit.
const cardCount = cards.length;
const wElement = (100 / cardCount).toFixed(1);
cards.forEach(card => card.style.width = wElement + "%");

function hoverOn() {
  // Seperate cards into groups for movement.
  const firstCard = cards[0];
  let notFirst = cards.slice(1,cardCount);
  let notLast = cards.slice(0,(cardCount-1));
  const lastCard = cards[cards.length-1];
  // Set widths and spacing for the movement.
  let cardCompWidth = parseInt(getComputedStyle(this).width);
  let newCardWidth = cardCompWidth * 1.5;
  let cssTrans = (newCardWidth - cardCompWidth) / 2;

  // Scale the hovered card.
  this.style.transform = "scale(1.5)";
  // Toggle the class for the fade and card content.
  this.classList.toggle('hover');

  // First card pushes other to right.
  if(this == firstCard) {      
    notFirst.forEach(nfCard => nfCard.style.transform = "translate("+cssTrans *2 + "px, 0px)");
  } 
  // Last card pushes other to left.
  else if(this == lastCard) {
    notLast.forEach(nlCard => nlCard.style.transform = "translate(-"+cssTrans *2 + "px, 0px)");
  } 
  // Group cards to left and right of hover to push them away from hovered middle cards.
  else {
    let leftOf = cards.slice(0, cards.indexOf(this));
    let rightOf = cards.slice((cards.indexOf(this) +1), cards.length);

    leftOf.forEach(leftCard => leftCard.style.transform = "translate(-"+cssTrans+ "px, 0px)");
    rightOf.forEach(rightCard => rightCard.style.transform = "translate("+cssTrans+ "px, 0px)");
  }
}

function hoverOff() {
  // Reset all the cards on hover off.
  this.classList.toggle('hover');
  this.style.transform = "scale(1)";
  cards.forEach(card => card.style.transform = "");
}

cards.forEach(card => card.addEventListener('mouseenter', hoverOn));
cards.forEach(card => card.addEventListener('mouseleave', hoverOff));
