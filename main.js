//variables for elements
const wordBox = document.querySelector('.wordBox')
const startGameButton = document.querySelector('.startGame')
const answerHeading = document.querySelector('.answerHeading')
//alphabet array

//generate array of letters and add click events to them


//start game by hiding answer
startGameButton.addEventListener('click', start)

function start(){
    answerHeading.innerHTML = wordBox.value.replace(/[a-zA-Z]/g, "_")
    wordBox.style.display = 'none'
    startGameButton.style.display = 'none'
}