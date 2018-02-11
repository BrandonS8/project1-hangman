// variables for elements
const wordBox = document.querySelector('.wordBox')
const startGameButton = document.querySelector('.startGame')
const letterHolder = document.querySelector('.letters')
const answerHolder = document.querySelector('.answerHeading')
let chars = []
// alphabet array
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

// variable to hold answer
let theAnswer = ''
let theAnswerArray = []
// wrong counter
let wrongLetters = 0
//right counter
let rightLetters = 0
let winNumber = 0
// generate array of letters and add click events to them

alphabet.forEach(function (letter) {
  let div = document.createElement('div')
  div.textContent = letter
  div.classList.add('letter')
  div.addEventListener('click', pressedLetter)
  letterHolder.appendChild(div)
})

// start game by hiding answer
startGameButton.addEventListener('click', start)

function start () {
  if (wordBox.value !== '') {
    theAnswer = wordBox.value.toUpperCase()
    theAnswerArray = wordBox.value.toUpperCase().split('')
    hideAnswer(setChars)
    wordBox.style.display = 'none'
    startGameButton.style.display = 'none'
    console.log(theAnswer)
    console.log(theAnswerArray)
  } else {
    alert('Please enter a word')
  }
}
let wrongCount = 0
function pressedLetter () {
  let pressedContent = this.textContent
  let pressed = this
  let i = 0
  chars.forEach(function (letter) {
    if (letter.innerHTML === pressedContent) {
      i++
      rightLetters++
      checkWin()
      letter.style.color = 'black'
      letter.style.borderBottom = 'none'
      pressed.style.color = 'green'
    } else if (i <= 0 && rightLetters < winNumber) {
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
  }
}
// NOTE TO ME: last letter being right throws a wrong! fix!
wordBox.addEventListener('keypress', function (evt) {
  if (evt.keyCode === 13) {
    evt.preventDefault()
    start()
  }
})
function hideAnswer (callback) {
    var normal = /[a-zA-Z]/
  theAnswerArray.forEach(function (letter) {
    if (letter != ' ' && letter != `'` && isNaN(letter) && letter.match(normal)) {
      let div = document.createElement('div')
      div.textContent = letter
      div.classList.add('hiddenAnswer')
      div.addEventListener('click', showAnswerLetter)
      answerHolder.appendChild(div)
      winNumber++
    } else {
      let div = document.createElement('div')
      div.textContent = letter
      div.classList.add('hiddenAnswer')
      div.style.color = 'black'
      div.style.borderBottom = 'none'
      answerHolder.appendChild(div)
      console.log(letter)
    }
    callback()
  })
}

function setChars () {
  chars = document.querySelectorAll('.hiddenAnswer')
}

function showAnswerLetter () {
  this.style.color = 'black'
}

function checkWin(){
    if(rightLetters === winNumber){
        console.log('winner!')
    }
}
//   https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_split
// https://stackoverflow.com/questions/13946651/matching-special-characters-and-letters-in-regex
// note to self: look more into regexp is may be more useful https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions


// later on split this into mulitple objects
// like an object for the answer stuff
// object for the letters
//object for the hangman

if(parseInt('hello')){
    console.log(true)
} else {
    console.log(false)
}