if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const keyboardButtons = document.querySelectorAll('.keyboard button');

const words = ['javascript', 'hangman', 'developer', 'programming'];
let selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
let correctLetters = [];
let wrongLetters = [];

function displayWord() {
  wordElement.innerHTML = selectedWord
    .split('')
    .map(letter => (correctLetters.includes(letter) ? letter : '_'))
    .join(' ');
}

function updateWrongLetters() {
  wrongLettersElement.textContent = wrongLetters.join(' ');
}

function handleGuess(letter) {
  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
    }
  }

  displayWord();
  updateWrongLetters();
}

keyboardButtons.forEach(button => {
  button.addEventListener('click', () => {
    const letter = button.textContent;
    handleGuess(letter);
    button.disabled = true;
  });
});

displayWord();
