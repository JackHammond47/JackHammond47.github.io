const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 570;
let dy = 1;

const words = [
    "unkind", "pirate", "vainly", "female", "guitar", "replay", "redeem", "meddle", "friend", "pollen",
    "cavity", "gospel", "bright", "harass", "easily", "timber", "intent", "spoilt", "prince", "severe",
    "agenda", "seldom", "absurd", "sitcom", "bother", "aghast", "stairs", "gurgle", "jacket", "filled",
    "degree", "unique", "craggy", "ascend", "island", "people", "exhume", "magnet", "loaves", "midget",
    "napkin", "ceased", "unlock", "sticky", "depict", "sleepy", "damage", "worked", "equity", "owning",
    "employ", "cougar", "bounty", "career", "hollow", "quartz", "rocket", "radish", "barrel", "square",
    "polite", "lotion", "podunk", "whoops", "papers", "common", "catnip", "tongue", "proved", "lining",
    "quarry", "bronze", "nodded", "gentle", "twelve", "stanza", "mission", "stitch", "banana", "narrow",
    "aspect", "reduce", "cosmic"
];
let currentWord = "";
let userInput = "";
let score = 0;
let timer = 30;

let backgroundImage = new Image();
backgroundImage.src = "images/blackboard.png"

backgroundImage.onload = function() {
    ctx.globalAlpha = 0.5;
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Time: " + timer, 10, 50);
    ctx.fillText("Score: " + score, 10, 80);
    ctx.fillText("Typed: " + userInput, 10, 110);
};

function drawBox() {
    ctx.beginPath();
    ctx.rect(x, y, 100, 40);
    ctx.strokeStyle = "rgb(0 0 255 / 100%)";
    ctx.stroke();
    ctx.font = "20px Arial";
    ctx.fillStyle = "black"
    ctx.fillText(currentWord, x + 10, y + 25);
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image with transparency
    ctx.globalAlpha = 0.5; // Adjust opacity as needed (0 = fully transparent, 1 = fully opaque)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1; // Reset global alpha

    drawBox();
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Time: " + timer, 10, 50);
    ctx.fillText("Score: " + score, 10, 80);
    ctx.fillText("Typed: " + userInput, 10, 110);
    y += dy;
    checkInput();
    if (timer > 0 && y + 40< canvas.height) {
        requestAnimationFrame(draw);
    }
    else{
        endGame();
    }
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function checkInput() {
    if (userInput === currentWord) {
        score++;
        currentWord = getRandomWord();
        userInput = "";
        x = Math.floor(Math.random() * 601) + 100;
        y = canvas.height - 570;
    }
}

function startGame() {
    currentWord = getRandomWord();
    y = canvas.height - 570;
    timer = 30;
    setInterval(decrementTimer, 1000);
    requestAnimationFrame(draw);
    document.addEventListener("keydown", function(event) {
        if (event.key === "Backspace") {
            userInput = userInput.slice(0, -1);
        } else {
            userInput += event.key;
        }
    });;
}

function decrementTimer() {
    timer--;
}

function endGame() {
    alert("Game over! Your score: " + score);
    document.getElementById("runButton").disabled = false;
}
  
document.getElementById("runButton").addEventListener("click", function () {
    startGame();
    this.disabled = true;
});

//TODO
//add highscore functions
//add way to track students
//add x from 100 to 700

//DONE
//add real words dictionary
//add graphics
//get domain
//fix mobile function