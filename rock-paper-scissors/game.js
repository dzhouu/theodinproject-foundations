const game_options = [
    {
        name: "Rock",
        icon: "🪨"
    },
    {
        name: "Paper",
        icon: "🧻"
    },
    {
        name: "Scissor",
        icon: "✂️"
    }
]

function resetScore(){
    userScore = 0;
    computerScore = 0;
}

function playComputer(){
    return Math.floor(Math.random() * 3);
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

    let userSelectionName = game_options[userSelection]["name"];
    let computerSelectionName = game_options[computerSelection]["name"];
    let userSelectionIcon = game_options[userSelection]["icon"]
    let computerSelectionIcon = game_options[computerSelection]["icon"]


 
    if(winner == "user") {
        userScore += 1;
        result = `You win! <b>${userSelectionName}</b> beats <b>${computerSelectionName}</b>`;
    } else if(winner == "computer") {
        computerScore += 1;
        result = `You loose! <b>${computerSelectionName}</b> beats <b>${userSelectionName}</b>`;
    } else {
        result = "It's a draw";
    }

    let round = {
        userScore: userScore,
        computerScore: computerScore,

        printMessage:  `${userSelectionIcon} vs ${computerSelectionIcon}
${result}
User score: ${userScore}, Computer Score: ${computerScore}` 
    };

    return round;

}

function game(e) {
    
    let userSelection = this.getAttribute('data-option')
    let computerSelection = playComputer();

    let finalColorMessage;
    let resultBox = document.querySelector("#result");

    if(resultBox.style.color != "black") {
        resultBox.style.color = "black";
    }

    
    // console.log(`%cGame Number: ${i+1}`, 'color: green')
    // userSelection = playUser(); 


    round = playRound(userSelection, computerSelection, userScore, computerScore);

    userScore = round.userScore;
    computerScore = round.computerScore;

    resultBox.innerHTML = round.printMessage;
    

    if(userScore === 5 || computerScore === 5) {

        if(userScore > computerScore) {
            finalColorMessage = "green";
        } else if(userScore < computerScore){
            finalColorMessage = "red";
        } else {
            finalColorMessage = "orange";
        }

        let result = resultBox.textContent.split("\n");
        result[2] = `Final Score: User score: ${userScore}, Computer Score: ${computerScore}`;

        resultBox.textContent = result.join("\n");
        resultBox.style.color = finalColorMessage;
        resetScore();
    }

    //
}

let userScore = 0;
let computerScore = 0;

let buttons = document.querySelectorAll('#options button');
buttons.forEach((btn) => {
    btn.addEventListener('click', game);
});