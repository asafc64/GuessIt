$(function () {
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

    const faces = imageUrls.map((img, i) => ({
        id: i,
        name: img.match(/images\/\d+_(.+)\.jpg/)[1],
        img: img,
        eliminated: false
    }));

    const $board = $("#board");

    function buildBoard() {
        // set CSS custom properties on the board element
        $board.get(0).style.setProperty("--cols", COLS);
        $board.get(0).style.setProperty("--rows", ROWS);

        faces.forEach(face => {
            const $card = $("<div>").addClass("card").attr("data-id", face.id);
            const $img = $("<img>").attr({ src: face.img, alt: face.name });
            const $label = $("<div>").addClass("label").text(face.name);
            const $overlay = $("<div>").addClass("overlay");

            $card.append($img, $overlay, $label);
            $card.on("click", () => toggleEliminated(face.id));

            $board.append($card);
        });
    }

    function toggleEliminated(id) {
        const face = faces.find(f => f.id === id);
        if (!face) return;

        face.eliminated = !face.eliminated;

        const $card = $board.find(`.card[data-id="${id}"]`);
        if (!$card.length) return;

        $card.toggleClass("eliminated", face.eliminated);
    }

    function newGame() {
        const randomIndex = Math.floor(Math.random() * faces.length);
        const pickedFace = faces[randomIndex];
        $("#picked-card-img").attr("src", pickedFace.img);
        $("#picked-card-label").text(pickedFace.name);
        $board.find(".card").removeClass("eliminated");
    }

    buildBoard();
    newGame();

    // expose newGame globally for the inline onclick in the HTML
    window.newGame = newGame;
});
