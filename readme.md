
# HATERMAKER

HATERMAKER is a different take on the original hangman game. It follows the same rules but instead of a "hangman" it's a "hater" being created.

This game was made as my first project in my Web Development Immersive class at [General Assembly](https://generalassemb.ly/). 
## Overview
![site preview](https://i.imgur.com/Groo2oE.jpg)
When the site is first loaded it will look like this. Before (or while) playing you can switch between the three themes (Light, Greyscale, and [Supreme](http://www.supremenewyork.com/)), view the directions, or reset the scores.
## Getting Started
Visit the GitHub Pages site [here](https://brandons8.github.io/project1-hangman/) to play!

To start playing choose who is player 1 and who is player 2 (or establish teams where team 1 is player 1, team 2 is player 2). Look at the top right, or center on smaller devices like mobile, to see who's guessing. If there is scores there already press clear scores.

Next the player not guessing enters a word without the other player seeing. 
The guessing screen will appear, here you click the letters being guessed and try not to fully create your hater or you lose.

## The Process
My plan for creating this was to follow the MVP(Bronze), Silver, Gold pattern.
Broken down this looks like:

**MVP(Bronze)**
* User can input a word
* The word is hidden
* User can guess letters that appear when guessed

**Silver**
* If user get's all the letters right they win
* If user presses too many wrong they lose
* When a wrong letter is used it shows a part of the hater
* Answer is shown at the end under the You Won or You Lost text

**Gold**
* Two player session storage scoring
* Theme Changer

## How does it work?
HATERMAKER is built using vanilla javascript. 

This is how it works starting from the user typing in a word or phrase:
 1. Event listener on 'Start' button is triggered when the user clicks it
 2. Keyboard-looking list of letters appears that are clickable
 3. Every character in the string is converted into a div
 4. If the character is a guessable letter A-Z it is hidden, if it's a special character or number it is shown
 5. Every word is recreated by adding each character to a word, changing to the next word when there is a space. I put them into words so the word is not chopped up when it is wrapped to fit inside the window.
 6. User clicks letters to guess, if right the letter becomes green, if 
    wrong the letter becomes red	
    * When user gets one wrong it adds a piece to the hater
    * If the user guesses wrong enough times to show all piece of the hater they lose
    * If the user got a letter right it is displayed in the hidden answer
    * If the user guesses all of them right before building the hater they win and 1 is added to their score

This is the method I used to hide the letters and put them in to the words, simplified.

   ```js 
   let word = document.querySelectorAll('.hiddenAnswerWord')
  let normal = /[a-zA-Z]/
  theAnswerArray.forEach(function (letter) {
    if (letter.match(normal)) {
    //create the div and hide the letter
    //append div to current word
    } else if (letter === ' ') {
      //switch to next word div
    } else {
    //create the div but don't hide the character
    }
   ```
   A lof of people were not aware of RegExp, which is this part ```/[a-zA-Z]/```. I wasn't aware of this either until after some searching. You can learn more about it here](https://www.w3schools.com/jsref/jsref_obj_regexp.asp) 

## Future Ideas
If I come back to this in the future or had more time these are some things I would add or do.
* Tweaks to styling and JS to allow more customization through css only
* More themes and get others to make their own themes (You can still make and send one if you want :D ) 
* Ability to have how every many players you want and choose the turn
* Better graphics for the hater, maybe more than a stickman
* Foreign language support, the current letters are only the English alphabet
* I think it would be fun to add a dunk tank clown style to the hater, so as it is being made it 'speaks' to the user, such as a quote saying 'I can't wait to show twitter your score' when the player is near losing
* Using keyboard to guess letters.
* Possibly stop putting the letters in to divs and instead display an array converted to a string
 