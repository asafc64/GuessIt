// --- Configuration ---
const COLS = 6;
const ROWS = 4;

const imageUrls = [
    "images/10_Vince.jpg",
    "images/11_Violet.jpg",
    "images/12_Isaac.jpg",
    "images/13_Tiffany.jpg",
    "images/14_Joey.jpg",
    "images/15_Sabrina.jpg",
    "images/16_Bernard.jpg",
    "images/17_Charlene.jpg",
    "images/18_Hugo.jpg",
    "images/19_Kelli.jpg",
    "images/1_Corey.jpg",
    "images/20_Clayton.jpg",
    "images/21_Celia.jpg",
    "images/22_Marcus.jpg",
    "images/23_Mayra.jpg",
    "images/24_Perry.jpg",
    "images/2_Rosario.jpg",
    "images/3_Susanne.jpg",
    "images/4_Ralph.jpg",
    "images/5_Doris.jpg",
    "images/6_Elmer.jpg",
    "images/7_Yolanda.jpg",
    "images/8_Richard.jpg",
    "images/9_Michele.jpg",
];

// Temporary placeholder faces (replace with real character images later)
const faces = imageUrls.map((img, i) => ({
    id: i,
    name: img.match(/images\/\d+_(.+)\.jpg/)[1],
    img: img,
    eliminated: false
}));

const boardEl = document.getElementById("board");
const boardWrapperEl = document.getElementById("boardWrapper");

function buildBoard() {
    boardEl.style.setProperty("--cols", COLS);
    boardEl.style.setProperty("--rows", ROWS);

    faces.forEach(face => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = face.id;

        const img = document.createElement("img");
        img.src = face.img;
        img.alt = face.name;

        const label = document.createElement("div");
        label.className = "label";
        label.textContent = face.name;

        const overlay = document.createElement("div");
        overlay.className = "overlay";

        card.appendChild(img);
        card.appendChild(overlay);
        card.appendChild(label);

        card.addEventListener("click", () => toggleEliminated(face.id));

        boardEl.appendChild(card);
    });
}

function toggleEliminated(id) {
    const face = faces.find(f => f.id === id);
    if (!face) return;

    face.eliminated = !face.eliminated;

    const cardEl = boardEl.querySelector(`.card[data-id="${id}"]`);
    if (!cardEl) return;

    if (face.eliminated) {
        cardEl.classList.add("eliminated");
    } else {
        cardEl.classList.remove("eliminated");
    }
}

function newGame() {
    const randomIndex = Math.floor(Math.random() * faces.length);
    const pickedFace = faces[randomIndex];
    const pickedCardEl = document.getElementById("picked-card-img");
    pickedCardEl.src = pickedFace.img;
    const pickedCardLabelEl = document.getElementById("picked-card-label");
    pickedCardLabelEl.textContent = pickedFace.name;
    document.querySelectorAll(".card").forEach(cardEl => {
        cardEl.classList.remove("eliminated");
    });
}

buildBoard();
newGame();
