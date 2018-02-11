// variables for elements
const wordBox = document.querySelector('.wordBox')
const startGameButton = document.querySelector('.startGame')
const letterHolder = document.querySelector('.letters')
const answerHolder = document.querySelector('.answerHeading')
let chars = []
const man = document.querySelector('.man').children
// alphabet array
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

// variable to hold answer
let theAnswer = ''
let theAnswerArray = []
let theAnswerArrayWords = []
let currentWord = 0
// wrong counter
let wrongLetters = 0
// right counter
let rightLetters = 0
let winNumber = 0
// generate array of letters and add click events to them
function createLetters () {
  alphabet.forEach(function (letter) {
      let div = document.createElement('div')
      div.textContent = letter
      div.classList.add('letter')
      div.addEventListener('click', pressedLetter)
      letterHolder.appendChild(div)
    })
}

// start game by hiding answer
startGameButton.addEventListener('click', start)

function start () {
  createLetters()
  if (wordBox.value !== '') {
    theAnswer = wordBox.value.toUpperCase()
    theAnswerArrayWords = wordBox.value.toUpperCase().split(' ')
    theAnswerArray = wordBox.value.toUpperCase().split('')
    setWords()
    hideAnswer(setChars)
    wordBox.style.display = 'none'
    startGameButton.style.display = 'none'
  } else {
    alert('Please enter a word')
  }
}

function setWords () {
  theAnswerArrayWords.forEach(function (word) {
      let div = document.createElement('div')
      div.classList.add('hiddenAnswerWord')
      answerHolder.appendChild(div)
    })
}

let wrongCount = 0
function pressedLetter () {
  let pressedContent = this.textContent
  let pressed = this
  let i = 0
  pressed.removeEventListener('click', pressedLetter)
  chars.forEach(function (letter) {
    if (letter.innerHTML === pressedContent) {
      i++
      rightLetters++
      checkWin()
      letter.style.color = 'white'
      letter.style.borderBottom = 'none'
      pressed.style.color = 'green'
      wrongCount = 0
    } else if (i === 0 && rightLetters <= winNumber && letter.innerHTML != pressedContent) {
      wrongCount++
      wrongAnswer(pressed)
    }
  })
}

function wrongAnswer (pressed) {
  if (wrongCount === chars.length) {
    wrongLetters += 1
    pressed.style.color = 'red'
    console.log('Wrong!' + wrongLetters)
    wrongCount = 0
    // addToMan()
    makeMan(wrongLetters - 1)
    checkLoss()
  }
}

wordBox.addEventListener('keypress', function (evt) {
  if (evt.keyCode === 13) {
    evt.preventDefault()
    start()
  }
})
function hideAnswer (callback) {
  let word = document.querySelectorAll('.hiddenAnswerWord')
  let normal = /[a-zA-Z]/
  theAnswerArray.forEach(function (letter) {
    if (letter != ' ' && letter != `'` && isNaN(letter) && letter.match(normal)) {
      let div = document.createElement('div')
      div.textContent = letter
      div.classList.add('hiddenAnswer')
      div.addEventListener('click', showAnswerLetter)
      word[currentWord].appendChild(div)
      winNumber++
    } else if (letter === ' ') {
      currentWord++
    } else {
      let div = document.createElement('div')
      div.textContent = letter
      div.classList.add('hiddenAnswer')
      div.style.color = 'white'
      div.style.borderBottom = 'none'
      word[currentWord].appendChild(div)
      console.log(letter)
    }
  })
  callback()
}

function setChars () {
  chars = document.querySelectorAll('.hiddenAnswer')
  console.log(chars)
}

function showAnswerLetter () {
  this.style.color = 'white'
  this.style.borderBottom = 'none'
}

function checkWin () {
  if (rightLetters >= winNumber) {
    console.log('winner!')
  }
}
function checkLoss(){
    if(wrongLetters >= 7){
        console.log('You lost')
    }
}

function makeMan(value){
  man[value].style.opacity = 1

}
//   https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_split
// https://stackoverflow.com/questions/13946651/matching-special-characters-and-letters-in-regex
// note to self: look more into regexp is may be more useful https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

// later on split this into mulitple objects
// like an object for the answer stuff
// object for the letters
// object for the hangman
