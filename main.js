// variables for elements
const wordBox = document.querySelector('.wordBox')
const startGameButton = document.querySelector('.startGame')
const letterHolder = document.querySelector('.letters')
const answerHolder = document.querySelector('.answerHeading')
// alphabet array
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

// variable to hold answer
let theAnswer = ''
let theAnswerArray = []
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
      hideAnswer()
      wordBox.style.display = 'none'
      startGameButton.style.display = 'none'
      console.log(theAnswer)
      console.log(theAnswerArray)
    } else {
      alert('Please enter a word')
    }
}

function pressedLetter () {
  this.textContent
}

wordBox.addEventListener('keypress', function (evt) {
  if (evt.keyCode === 13) {
      evt.preventDefault()
      start()
    }
})
function hideAnswer () {
  theAnswerArray.forEach(function (letter) {
      if (letter != ' '){
        let div = document.createElement('div')
        div.textContent = letter
        div.classList.add('hiddenAnswer')
        div.addEventListener('click', showAnswerLetter)
        answerHolder.appendChild(div)
      } else{
        let div = document.createElement('div')
        div.textContent = letter
        div.classList.add('hiddenAnswer')
        div.style.borderBottom =  'none'
        answerHolder.appendChild(div)
      }
    })
}

function showAnswerLetter() {
    this.style.color = 'black'
  }






//   https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_split