particlesJS("particles", {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.8,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                opacity_min: 0,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
        }
    },
    interactivity: {
        detectsOn: "canvas",
        events: {
            onHover: {
                enable: true,
                mode: "push"
            },
            onClick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});
//scrolling to the top
function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}

window.addEventListener('scroll', function () {
    var scrollTopButton = document.querySelector('.scroll-top');
    if (this.window.pageYOffset > 200) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});


// Open the Tic Tac Toe Popup
document.getElementById("play-tic-tac-toe").addEventListener("click", function () {
    document.getElementById("tic-tac-toe-popup").style.display = "flex";
    initializeBoard();
});

// Close the Tic Tac Toe Popup
function closeTicTacToe() {
    document.getElementById("tic-tac-toe-popup").style.display = "none";
    restartGame();
}

// Initialize the Tic Tac Toe Board
function initializeBoard() {
    const board = document.getElementById("tic-tac-toe-board");
    board.innerHTML = ""; // Clear previous cells

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

// Game Logic Variables
let currentPlayer = "X";
let gameActive = true;

// Handle Cell Clicks
function handleCellClick(event) {
    const cell = event.target;

    if (cell.classList.contains("taken") || !gameActive) {
        return; // Ignore clicks on already taken cells
    }

    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
    } else if (Array.from(document.querySelectorAll("#tic-tac-toe-board div")).every(cell => cell.classList.contains("taken"))) {
        alert("It's a draw!");
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch players
    }
}

// Restart the Game
function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    initializeBoard();
}

// Check for a Winner
function checkWinner() {
    const cells = document.querySelectorAll("#tic-tac-toe-board div");
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombos.some(combo => {
        return combo.every(index => cells[index].textContent === currentPlayer);
    });
}
