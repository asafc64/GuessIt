$(function () {
    const COLS = 6;
    const ROWS = 4;

    const imageUrls = [
        "generator/output/1_Alice.png",
        "generator/output/2_Bob.png",
        "generator/output/3_Charlie.png",
        "generator/output/4_Diana.png",
        "generator/output/5_Ethan.png",
        "generator/output/6_Fiona.png",
        "generator/output/7_George.png",
        "generator/output/8_Hannah.png",
        "generator/output/9_Ian.png",
        "generator/output/10_Jasmine.png",
        "generator/output/11_Kevin.png",
        "generator/output/12_Lily.png",
        "generator/output/13_Mike.png",
        "generator/output/14_Nora.png",
        "generator/output/15_Oscar.png",
        "generator/output/16_Penelope.png",
        "generator/output/17_Quentin.png",
        "generator/output/18_Rachel.png",
        "generator/output/19_Sam.png",
        "generator/output/20_Tina.png",
        "generator/output/21_Ulysses.png",
        "generator/output/22_Victoria.png",
        "generator/output/23_William.png",
        "generator/output/24_Zoe.png",
    ];

    const hebrewNames = ["אורית", "רועי", "רונית", "רפאל", "דורית", "אלעד", "יעל", "רון", "מיכל", "נדב", "סיגל", "יצחק", "תמר", "יואב", "שירה", "ברק", "שרון", "עומר", "קרן", "גלעד", "סיגל", "מורן", "מאיה", "פאר"];

    const faces = imageUrls.map((img, i) => ({
        id: i,
        name: img.match(/generator\/output\/\d+_(.+)\.png/)[1],
        altNames: {
            "en": img.match(/generator\/output\/\d+_(.+)\.png/)[1],
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
