//VARIABLES
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
themeArray = ['css/supreme.css', 'css/light.css', 'css/greyscale.css']
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
  } else {
    sessionStorage.setItem('player2score', score)
  }

  let savedScore1 = sessionStorage.getItem('player1score')
  let savedScore2 = sessionStorage.getItem('player2score')
  document.querySelector('.player1score').innerHTML = `Player 1: ${savedScore1}`
  document.querySelector('.player2score').innerHTML = `Player 2: ${savedScore2}`
}

document.querySelector('.clearScores').addEventListener('click', function () {
  score = 0
  sessionStorage.setItem('player1score', 0)
  sessionStorage.setItem('player2score', 0)
  sessionStorage.setItem('lastPlayer', 'player2')
  sessionStorage.removeItem('loadedBefore')
  changeLastPlayer()
  updateScore()
})

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

// theme changer, saves on reload as well
let currentTheme = 1
if (sessionStorage.getItem('savedTheme')) {
  currentTheme = sessionStorage.getItem('savedTheme')
} else {
  currentTheme = 1
}
document.querySelector('#theme').setAttribute('href', themeArray[currentTheme])
document.querySelector('.themeButton').addEventListener('click', changeTheme)
function changeTheme () {
  if (currentTheme < (themeArray.length - 1)) {
    currentTheme++
    sessionStorage.setItem('savedTheme', currentTheme)
  } else {
    currentTheme = 0
    sessionStorage.setItem('savedTheme', currentTheme)
  }
  document.querySelector('#theme').setAttribute('href', themeArray[currentTheme])
}
// show directions
document.querySelector('.directions').style.display = 'none' //the click if statement doesnt work the first click without this 
document.querySelector('.showDirections').addEventListener('click', function () {
  let d = document.querySelector('.directions')
  let b = document.querySelector('.showDirections')
    if(d.style.display === 'none'){
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
//next round
document.querySelector('.replay').addEventListener('click', function(){
    location.reload()
})

// generate array of letters and add click events to them when start calls it
function createLetters () {
  alphabet.forEach(function (letter) {
    let div = document.createElement('div')
    div.textContent = letter
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
// puts the letters into words so they won't get flex-wrapped in a weird way seperated from parts of the word
function setWords () {
  theAnswerArrayWords.forEach(function (word) {
    let div = document.createElement('div')
    div.classList.add('hiddenAnswerWord')
    answerHolder.appendChild(div)
  })
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
// hide answers if they are letters, display all the other characters
function hideAnswer (callback) {
  let word = document.querySelectorAll('.hiddenAnswerWord')
  let normal = /[a-zA-Z]/
  theAnswerArray.forEach(function (letter) {
    if (letter.match(normal)) {
      let div = document.createElement('div')
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
  callback()
}

function setChars () {
  chars = document.querySelectorAll('.hiddenAnswer')
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
