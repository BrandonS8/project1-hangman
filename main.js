//variables for elements
const wordBox = document.querySelector('.wordBox')
const startGameButton = document.querySelector('.startGame')
const answerHeading = document.querySelector('.answerHeading')
const letterHolder = document.querySelector('.letters')
//alphabet array
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

// variable to hold answer
let theAnswer = ''
//generate array of letters and add click events to them

alphabet.forEach(function(letter){
  let div = document.createElement('div')
  div.textContent = letter
  div.classList.add('letter')
  div.addEventListener('click', pressedLetter)
  letterHolder.appendChild(div)
})

//start game by hiding answer
startGameButton.addEventListener('click', start)

function start(){
//RegExp for checking if numbers are inputted?
    if(wordBox.value !== ''){
        theAnswer = wordBox.value.toUpperCase()
        answerHeading.innerHTML = wordBox.value.replace(/[a-zA-Z]/g, "_")
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
        wordBox.style.display = 'none'
        startGameButton.style.display = 'none'
        console.log(theAnswer)
    } else {
        alert('Please enter a word')
    }
}

function pressedLetter(){
    console.log(this.textContent)
}

wordBox.addEventListener('keypress', function(evt) { 
    if (evt.keyCode === 13) {
        evt.preventDefault()
        start()
    }
  })