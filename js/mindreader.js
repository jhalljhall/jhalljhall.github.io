//global variables to sync java script to html elements/classes

let bgtxt = document.getElementById('mindreader-bigtext');
let nxtbtn = document.getElementById('mindreader-next');
let smtxt = document.getElementById('mindreader-smalltext');
let resetBtn = document.getElementById('mindreader-goreset');

//setting click to the goreset class and to run it's function
resetBtn.addEventListener('click', resetState);

//setting click to the next class in html and to run it's function
nxtbtn.addEventListener('click', changeState);

var state = 0;

var selectedSymbol = String.fromCharCode(Math.floor(Math.random() * 10) + 36);

window.onhashchange = function() {       
    // if (location.hash.length > 0) {        
    //     state = parseInt(location.hash.replace('#',''),10);     
    // } else {
    //     state = 0;
    // }
    // renderState();
}

function resetState() {
    selectedSymbol = String.fromCharCode(Math.floor(Math.random() * 10) + 36);
    state = 0;
    //location.hash = state;
    renderState();
}

function changeState() {
    state++;
    //location.hash = state;
    renderState();
}

function renderState() {
    switch (state) {
        case 0:
        

         // bigtext 'Pick a number from 01-99'
         bgtxt.innerHTML = 'Press Start';
         // next button needs to reveal
         resetBtn.style.visibility = 'hidden';
         // small text 'when you have your number click next'
         smtxt.innerHTML = '';

         // go needs to change to reset icon and needs to take you back to state 1
         nxtbtn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
         nxtbtn.style.visibility = 'visible';
         break;

        case 1:


            // bigtext 'Pick a number from 01-99'
            bgtxt.innerHTML = 'Pick a number between 01-99';
            // next button needs to reveal
            nxtbtn.style.visibility = 'visible';
            // small text 'when you have your number click next'
            smtxt.innerHTML = 'when you have your number click next';

            // go needs to change to reset icon and needs to take you back to state 1
            resetBtn.style.visibility = 'visible';
            resetBtn.innerHTML = '<i class="bi bi-arrow-counterclockwise"></i>';
            nxtbtn.innerHTML = '<i class="bi bi-play"></i>';
            break;


        case 2:
           
            bgtxt.innerHTML = 'Add both digits together to get a new number';
            
            nxtbtn.style.visibility = 'visible';
           
            smtxt.innerHTML = 'Ex: 14 is 1 + 4 = 5, click next to proceed';


            // go needs to change to reset icon and needs to take you back to state 1
            break;

        case 3:
            
            bgtxt.innerHTML = 'Subtract your new  number from the  original number ';
         
            nxtbtn.style.visibility = 'visible';
            
            smtxt.innerHTML = 'Ex: 14 - 5 = 9, click next to proceed';


            // go needs to change to reset icon and needs to take you back to state 1
            break;

        case 4:
           
            bgtxt.innerHTML = '<h1>Scroll down &#8595;</h1><h3>Find your number and symbol... </h3><br />';

            for (var i = 0; i < 100; i++) {
                if (i % 9 == 0) {
                    
                    bgtxt.innerHTML += i + ' = ' + selectedSymbol + '<br />';
                }
                else  {
                    var r = String.fromCharCode(Math.floor(Math.random() * 10) + 36);
                    bgtxt.innerHTML += i + ' = ' + r + '<br />';
                }
            }

            // next button needs to say REVEAL
            nxtbtn.style.visibility = 'visible';
            // small text 'when you have your number click next'
            smtxt.innerHTML = 'Reading your mind... (click next to proceed)';


            // go needs to change to reset icon and needs to take you back to state 1
            break;

        case 5:
            // bigtext 'Pick a number from 01-99'
            bgtxt.innerHTML = '<h1>Your symbol is:</h1> <br /> <span style="font-size:22pt; font-weight:bolder;">' + selectedSymbol + '</span>';
            // next button needs to reveal
            nxtbtn.style.visibility = 'hidden';
            // small text 'when you have your number click next'
            smtxt.innerHTML = 'try again?';


            // go needs to change to reset icon and needs to take you back to state 1
            break;

    }


}

function mindreader_init(){
    renderState();
}