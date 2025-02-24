const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    default: "+1 Jogador Um"
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    default: "+1 Jogador Dois"
}

const resetButton = document.querySelector('#reset');
const trucoButton = document.querySelector('#truco');

let winningScore = 12;
let isGameOver = false;
let trucoValue = 1;

function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score += trucoValue;
        player.display.textContent = player.score;

        if (player.score >= winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            trucoButton.disabled = true;
        }

        resetTruco();
    }
}

p1.button.addEventListener('click', function () {
    updateScore(p1, p2);
});

p2.button.addEventListener('click', function () {
    updateScore(p2, p1);
});

trucoButton.addEventListener('click', function () {
    if (trucoValue === 1) {
        trucoValue = 3;
        trucoButton.textContent = "Dobrar! (6 pontos)";
    } else if (trucoValue === 3) {
        trucoValue = 6;
        trucoButton.textContent = "Triplicar! (9 pontos)";
    } else if (trucoValue === 6) {
        trucoValue = 9;
        trucoButton.textContent = "ALL-WIN";
    } else if (trucoValue === 9) {
        trucoValue = 12;
        trucoButton.textContent = "Truco!";
        trucoButton.disabled = true;
    }

    updateTrucoButtons();
});

resetButton.addEventListener('click', function () {
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
    isGameOver = false;
    trucoButton.disabled = false;
    resetTruco();
});

function updateTrucoButtons() {
    p1.button.innerHTML = `+${trucoValue} Jogador Um &#9824;`;
    p2.button.innerHTML = `+${trucoValue} Jogador Dois &#9827;`;
}

function resetTruco() {
    trucoValue = 1;
    trucoButton.textContent = "Truco!";
    if (!isGameOver) {
        trucoButton.disabled = false;
    }
}

const themeToggle = document.querySelector("#switchRoundedInfo");
const html = document.documentElement;

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