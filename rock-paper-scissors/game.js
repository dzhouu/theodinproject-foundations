let rockArt = `
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
`;

let paperArt = `
    _______
---'   ____)____
          ______)
          _______)
         _______)
---.__________)
`;

let scissorsArt = `
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
`;


game_options = [
    {
        name: "Rock",
        art: rockArt
    },
    {
        name: "Paper",
        art: paperArt
    },
    {
        name: "Scissor",
        art: scissorsArt
    }
]

function playComputer(){
    return Math.floor(Math.random() * 3);
}

function playUser(){
    let isuserSelectionValid = false;

    while(!isuserSelectionValid) {
        userSelection = parseInt(prompt("What do you choose? Type 0 for Rock, 1 for Paper or 2 for Scissors."));
        
        if(userSelection < 0 || userSelection > 2 || isNaN(userSelection)) {
            console.log('%cSelect a valid number! (0, 1 or 2)', 'color: red');
        } else {
            isuserSelectionValid = true;
        }

    }

    return userSelection;
}

function getWinner(userSelection, computerSelection) {
    let winner = "";

    if(userSelection == 2 && computerSelection == 0) {
        winner = "computer";
    } else if(userSelection == 0 && computerSelection == 2) {
        winner = "user";
    } else if (userSelection < computerSelection) {
        winner = "computer";
    } else if(userSelection > computerSelection){
        winner = "user";
    } 

    return winner;
}

function playRound(userSelection, computerSelection, userScore, computerScore) {

    let winner = getWinner(userSelection, computerSelection);
    let result = ""
 
    if(winner == "user") {
        userScore += 1;
        result = `You win! ${game_options[userSelection]["name"]} beats ${game_options[computerSelection]["name"]}`;
    } else if(winner == "computer") {
        computerScore += 1;
        result = `You loose! ${game_options[computerSelection]["name"]} beats ${game_options[userSelection]["name"]}`;
    } else {
        result = "It's a draw";
    }

    let round = {
        userScore: userScore,
        computerScore: computerScore,

        printMessage:  `
        Computer chose 
        ${game_options[computerSelection]["art"]}
        User chose
        ${game_options[userSelection]["art"]}
        ${result}
        User score: ${userScore}, Computer Score: ${computerScore}
        ` 
    };

    return round;

}

function game() {
    let userScore = 0;
    let computerScore = 0;

    let userSelection;
    let computerSelection;

    let finalColorMessage;

    for(let i = 0; i < 5; i++) {
        console.log(`%cGame Number: ${i+1}`, 'color: green')

        computerSelection = playComputer();
        userSelection = playUser(); 

        round = playRound(userSelection, computerSelection, userScore, computerScore);

        userScore = round.userScore;
        computerScore = round.computerScore;

        console.log(round.printMessage);
    }

    if(userScore > computerScore) {
        finalColorMessage = "green";
    } else if(userScore < computerScore){
        finalColorMessage = "red";
    } else {
        finalColorMessage = "orange";
    }

    console.log(`%cFinal Score: User score: ${userScore}, Computer Score: ${computerScore}`, `color: ${finalColorMessage}`);
}


document.getElementById('start').addEventListener('click', game)