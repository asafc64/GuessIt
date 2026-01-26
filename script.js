$(function () {
    const COLS = 6;
    const ROWS = 4;

    const imageUrls = [
        "images/1_Corey.jpg",
        "images/2_Rosario.jpg",
        "images/3_Susanne.jpg",
        "images/4_Ralph.jpg",
        "images/5_Doris.jpg",
        "images/6_Elmer.jpg",
        "images/7_Yolanda.jpg",
        "images/8_Richard.jpg",
        "images/9_Michele.jpg",
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
        "images/20_Clayton.jpg",
        "images/21_Celia.jpg",
        "images/22_Marcus.jpg",
        "images/23_Mayra.jpg",
        "images/24_Perry.jpg",
    ];
    const hebrewNames = ["אורית", "רועי", "רונית", "רפאל", "דורית", "אלעד", "יעל", "רון", "מיכל", "נדב", "סיגל", "יצחק", "תמר", "יואב", "שירה", "ברק", "שרון", "עומר", "קרן", "גלעד", "סיגל", "מורן", "מאיה", "פאר"];

    const faces = imageUrls.map((img, i) => ({
        id: i,
        name: img.match(/images\/\d+_(.+)\.jpg/)[1],
        altNames: {
            "en": img.match(/images\/\d+_(.+)\.jpg/)[1],
            "he": hebrewNames[i]
        },
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

            $.each(face.altNames, (lang, name) => {
                $label.attr(`data-lang`, "");
                $label.attr(`data-lang-${lang}`, name);
            });

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
        const $label = $("#picked-card-label");
        $label.text(pickedFace.name);
        $.each(pickedFace.altNames, (lang, name) => {
            $label.attr(`data-lang`, "");
            $label.removeData(`lang-${lang}`);
            $label.attr(`data-lang-${lang}`, name);
        });
        $label.trigger("langChange");

        $board.find(".card").removeClass("eliminated");
    }

    buildBoard();
    newGame();

    // expose newGame globally for the inline onclick in the HTML
    window.newGame = newGame;


});
