// Great job using semantic variable names and clear comments throughout your code!
// Spacing between a line of code and your next comment could clear up which line your comment is referring to
// There were several times, you defined variables within functions, setting them equal to DOM elements.
// Use descriptive variable names even when defining local variables in a function, and set global variables when possible to reduce confusion.

// VARIABLES
// variables for elements
const wordBox = document.querySelector('.wordBox')
const startGameButton = document.querySelector('.startGame')
const letterHolder = document.querySelector('.letters')
const answerHolder = document.querySelector('.answerHeading')
let chars = []
const man = document.querySelector('.man').children
// alphabet array for the letter creator
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// theme array
const themeArray = ['css/supreme.css', 'css/light.css', 'css/greyscale.css']
// ^^ always instantiate a new variable with a const, let, or var

// variable to hold answer
let theAnswer = ''
let theAnswerArray = []
let theAnswerArrayWords = []
let currentWord = 0

// wrong counter
let wrongLetters = 0
// right counter
let rightLetters = 0
// letters needed to win
let winNumber = 0
let score = 0
// current player
let currentPlayer = 'player1'

// checking if page loaded before to set defaults for scoring
if (sessionStorage.getItem('loadedBefore') === null) {
  currentPlayer = 'player1'
  score = 0
  sessionStorage.setItem('player1score', 0)
  sessionStorage.setItem('player2score', 0)
  sessionStorage.setItem('loadedBefore', true)
  sessionStorage.setItem('lastPlayer', 'player1')
  updatePlayer()
} else {
  changeLastPlayer()
  updatePlayer()
  updateScore()
}

// SCORING
function updateScore () {
  if (currentPlayer === 'player1') {
    sessionStorage.setItem('player1score', score)
    document.querySelector('.player1score').innerHTML = `Player 1: ${score}`
    // ^^ above line seems redundant?
  } else {
    sessionStorage.setItem('player2score', score)
  }

  let savedScore1 = sessionStorage.getItem('player1score')
  let savedScore2 = sessionStorage.getItem('player2score')
  document.querySelector('.player1score').innerHTML = `Player 1: ${savedScore1}`
  document.querySelector('.player2score').innerHTML = `Player 2: ${savedScore2}`
}

// best practice is to group all event listeners together at the bottom of the JS file:
// 1. variable declaration first
// 2. functions
// 3. event listeners
document.querySelector('.clearScores').addEventListener('click', function () {
  score = 0
  sessionStorage.setItem('player1score', 0)
  sessionStorage.setItem('player2score', 0)
  sessionStorage.setItem('lastPlayer', 'player2')
  sessionStorage.removeItem('loadedBefore')
  changeLastPlayer()
  updateScore()
})

// Since you set session storage multiple times, you could consider making a function in which you pass in all the fields to be stored,
// and then it is able to set all those session storage items in that function. This would cut down on the repetition of 'sessionStorage.setItem()' throughout.

// currentplayer
function changeLastPlayer () {
  let lastPlayer = sessionStorage.getItem('lastPlayer')
  if (lastPlayer === 'player2') {
    currentPlayer = 'player1'
    sessionStorage.setItem('lastPlayer', 'player1')
  } else if (lastPlayer === 'player1') {
    currentPlayer = 'player2'
    sessionStorage.setItem('lastPlayer', 'player2')
  }
  score = sessionStorage.getItem(`${currentPlayer}score`)
  updatePlayer()
}

function updatePlayer () {
  if (currentPlayer === 'player1') {
    document.querySelector('.turnTeller').innerHTML = `Player 1's Guess`
  } else {
    document.querySelector('.turnTeller').innerHTML = `Player 2's Guess`
  }
}

// The theme changer feature is really cool!
// theme changer, saves on reload as well
let currentTheme = 1
if (sessionStorage.getItem('savedTheme')) {
  currentTheme = sessionStorage.getItem('savedTheme')
} else {
  currentTheme = 1
}
document.querySelector('#theme').setAttribute('href', themeArray[currentTheme])
// ^ I recommend putting this into a function to call here and below, to avoid repetition 10 lines below
document.querySelector('.themeButton').addEventListener('click', changeTheme)
function changeTheme () {
  if (currentTheme < (themeArray.length - 1)) {
    currentTheme++
  } else {
    currentTheme = 0
  }
  document.querySelector('#theme').setAttribute('href', themeArray[currentTheme])
  sessionStorage.setItem('savedTheme', currentTheme)
}

// show directions
document.querySelector('.directions').style.display = 'none' // the click if statement doesnt work the first click without this
document.querySelector('.showDirections').addEventListener('click', function () {
  let d = document.querySelector('.directions')
  let b = document.querySelector('.showDirections')
  // ^^ set both of these to a variable to begin with (globally), since you mention/use them more than once
  if (d.style.display === 'none') {
    d.style.display = 'initial'
    wordBox.style.display = 'none'
    startGameButton.style.display = 'none'
    b.innerHTML = 'Hide Directions'
  } else {
    d.style.display = 'none'
    wordBox.style.display = 'initial'
    startGameButton.style.display = 'initial'
    b.innerHTML = 'View Directions'
  }
})

// next round
document.querySelector('.replay').addEventListener('click', function () {
  location.reload()
})

// generate array of letters and add click events to them when start calls it
function createLetters () {
  alphabet.forEach(function (letter) {
    let div = document.createElement('div')
    // I recommend using an element more descriptive than just div - even when it's just a local variable in this function.
    div.textContent = letter
    // ^ I would stay consistent throughout your game using either textContent or innerHTML to add text on the page
    div.classList.add('letter')
    div.addEventListener('click', pressedLetter)
    letterHolder.appendChild(div)
  })
}

// START
// start game by hiding answer
// enter key to start from wordbox or use start button
wordBox.addEventListener('keypress', function (evt) {
  if (evt.keyCode === 13) {
    evt.preventDefault()
    start()
  }
})
// ^^ nice idea to add an event listener for a click and for pressing return

startGameButton.addEventListener('click', start)

function start () {
  if (wordBox.value !== '') {
    document.querySelector('.right').style.display = 'flex'
    theAnswer = wordBox.value.toUpperCase()
    theAnswerArrayWords = wordBox.value.toUpperCase().split(' ')
    theAnswerArray = wordBox.value.toUpperCase().split('')
    setWords()
    hideAnswer(setChars)
    createLetters()
    wordBox.style.display = 'none'
    startGameButton.style.display = 'none'
    document.querySelector('.showDirections').style.display = 'none'
    document.querySelector('.replay').style.display = 'none'
  } else {
    alert('Please enter a word')
  }
}
// ^ great idea to separate some of the above functionality into functions like setWords(); see if you can separate out even more functions!

// puts the letters into words so they won't get flex-wrapped in a weird way seperated from parts of the word
function setWords () {
  theAnswerArrayWords.forEach(function (word) {
    let div = document.createElement('div')
    div.classList.add('hiddenAnswerWord')
    answerHolder.appendChild(div)
  })
}
// ^^ you only need one of these containers for your one hidden answer word.
// In fact, since it will be empty to start, you could have the div on the page to start with, or set it earlier?

// hide answers if they are letters, display all the other characters
function hideAnswer (callback) {
  let word = document.querySelectorAll('.hiddenAnswerWord')
  let normal = /[a-zA-Z]/
  theAnswerArray.forEach(function (letter) {
    if (letter.match(normal)) {
        let div = document.createElement('div')
        // ^^ Use a more descriptive variable name
        div.textContent = letter
        div.classList.add('hiddenAnswer')
        word[currentWord].appendChild(div)
        winNumber++
      } else if (letter === ' ') {
        currentWord++
      } else {
        let div = document.createElement('div')
        div.textContent = letter
        div.classList.add('unhiddenAnswer')
        div.style.borderBottom = 'none'
        word[currentWord].appendChild(div)
      }
  })
  checkWin() //if string doesn't have anything to guess
  callback()
}

function setChars () {
  chars = document.querySelectorAll('.hiddenAnswer')
}

// guessing
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
      letter.classList.add('unhiddenAnswer')
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
    wrongCount = 0
    makeMan(wrongLetters - 1)
    checkLoss()
  }
}
function showAnswerLetter () {
  this.classList.add('unhiddenAnswer')
  this.classList.remove('hiddenAnswer')
  this.style.borderBottom = 'none'
}

function checkWin () {
  if (rightLetters >= winNumber) {
    winLose('win')
  }
}
function checkLoss () {
  if (wrongLetters >= 7) {
    winLose('lose')
  }
}

// adds to the hangman
function makeMan (value) {
  // ^^ when defining a function, make the arguments more descriptive!
  man[value].style.opacity = 1
}
// displays if user won or lost
function winLose (value) {
  letterHolder.style.display = 'none'
  document.querySelector('.answer').style.flexDirection = 'column'
  document.querySelector('.right').style.display = 'none'
  document.querySelector('.winloss').style.display = 'inline'
  document.querySelector('.replay').style.display = 'initial'
  if (value === 'win') {
    score++
    document.querySelector('.winloss').classList.add('won')
    document.querySelector('.winloss').textContent = `YOU WIN!`
    showAnswer()
    updateScore()
  } else if (value === 'lose') {
    document.querySelector('.winloss').classList.add('lost')
    document.querySelector('.winloss').textContent = `YOU LOSE!`
    showAnswer()
  }
  // Instead of sending string 'win' or 'lose' through the function, you may want to have booleans set up
  // (e.g. let wonGame = false and let lostGame = false), then you can set the right boolean to true, depending on the outcome.
  // Then reset both booleans at the end.
}
// shows the answer at end of the game
function showAnswer () {
  document.querySelectorAll('.hiddenAnswer').forEach(function (ans) {
    ans.classList.add('unhiddenAnswer')
    ans.classList.remove('hiddenAnswer')
  })
}
// RESOURCES
// https://www.w3schools.com/jsref/met_loc_reload.asp
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_split
// https://stackoverflow.com/questions/13946651/matching-special-characters-and-letters-in-regex