const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    default: "+1 Jogador Um"
};

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    default: "+1 Jogador Dois"
};

const players = [p1, p2];

const resetButton = document.querySelector('#reset');
const trucoButton = document.querySelector('#truco');
const themeToggle = document.querySelector("#switchRoundedInfo");
const html = document.documentElement;

let winningScore = 12;
let isGameOver = false;
let trucoValue = 1;

function updatePlayerButtonsText() {
    p1.button.innerHTML = `+${trucoValue} Jogador Um &#9824;`;
    p2.button.innerHTML = `+${trucoValue} Jogador Dois &#9827;`;
}

function updateResetButtonText() {
    resetButton.textContent = trucoValue > 1 ? "Cancelar truco" : "Zerar";
}

function updateTrucoButtonText() {
    if (trucoValue === 1) trucoButton.textContent = "Truco!";
    else if (trucoValue === 3) trucoButton.textContent = "Dobrar! (6 pontos)";
    else if (trucoValue === 6) trucoButton.textContent = "Triplicar! (9 pontos)";
    else if (trucoValue === 9) trucoButton.textContent = "ALL-WIN";
    else if (trucoValue === 12) trucoButton.textContent = "Truco!";
}

function updateUI() {
    updatePlayerButtonsText();
    updateResetButtonText();
    updateTrucoButtonText();
}

function updateScore(player, opponent) {
    if (isGameOver) return;

    player.score += trucoValue;
    player.display.textContent = player.score;

    if (player.score >= winningScore) {
        endGame(player, opponent);
    }

    resetTruco();
    updateUI();
}

function endGame(winner, loser) {
    isGameOver = true;
    winner.display.classList.add('has-text-success');
    loser.display.classList.add('has-text-danger');
    winner.button.disabled = true;
    loser.button.disabled = true;
    trucoButton.disabled = true;
}

function cancelTruco() {
    trucoValue = 1;
    updateUI();
    trucoButton.disabled = false;
}

function resetGame() {
    players.forEach(p => {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    });
    isGameOver = false;
    trucoButton.disabled = false;
    resetTruco();
    updateUI();
}

function resetTruco() {
    trucoValue = 1;
    if (!isGameOver) {
        trucoButton.disabled = false;
    }
    updatePlayerButtonsText();
    updateTrucoButtonText();
}

p1.button.addEventListener('click', () => updateScore(p1, p2));
p2.button.addEventListener('click', () => updateScore(p2, p1));

trucoButton.addEventListener('click', () => {
    if (trucoValue === 1) trucoValue = 3;
    else if (trucoValue === 3) trucoValue = 6;
    else if (trucoValue === 6) trucoValue = 9;
    else if (trucoValue === 9) {
        trucoValue = 12;
        trucoButton.disabled = true;
    }
    updateUI();
});

resetButton.addEventListener('click', () => {
    if (trucoValue > 1) cancelTruco();
    else resetGame();
});

function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    themeToggle.checked = theme === "dark";
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
});