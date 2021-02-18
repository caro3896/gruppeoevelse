//Konstanter for restdb
const url = "https://faellespassion-9f07.restdb.io/rest/faellespassion";
const medieurl = "";
const options = {
    headers: {
        'x-apikey': "602e60ce5ad3610fb5bb6312"
    }
};

//Lytter efter om DOM er loaded
window.addEventListener("DOMContentLoaded", start);

//Opretter variabler
let sange;
let filter = "alle";
const header = document.querySelector("#sortering h3");

//Første funktion der kaldes efter DOM er loaded
function start() {
    console.log("DOM er loaded");
    const filterKnapper = document.querySelectorAll("#genre button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerGenre));
    //    document.querySelector(".sorter").addEventListener("click", toggleMenu);
    hentData();
}

////Eventlistener til burgermenu
//function toggleMenu() {
//    console.log("toggleMenu");
//
//    document.querySelector("#filtre").classList.toggle("show");
//
//    let erVist = document.querySelector("#filtre").classList.contains("show");
//
//    if (erVist == true) {
//        document.querySelector(".sorter").textContent = "Sorter efter ▴";
//    } else {
//        document.querySelector(".sorter").textContent = "Sorter efter ▾";
//    }
//}

//Eventlistener knyttet til knapperne der vælger det aktive filter
function filtrerGenre() {
    console.log("Klikket på genre");
    filter = this.dataset.kategori;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    visSange();
    header.textContent = this.textContent;
}


//Henter data fra restdb
async function hentData() {
    console.log("Data fra restdb hentes");
    const respons = await fetch(url, options);
    sange = await respons.json();
    visSange();
}

//Opretter konstanter for templaten
const dest = document.querySelector("#oversigt");
const template = document.querySelector("template").content;

//Funktion der viser sange i liste view
function visSange() {
    console.log(sange);

    dest.textContent = "";

    sange.forEach(sang => {
        console.log("Genre", sang.genre);
        if (filter == sang.genre || filter == "alle") {

            const klon = template.cloneNode(true);
            klon.querySelector(".billede").src = medieurl + sang.billede;
            klon.querySelector(".navn").textContent = sang.navn;
            klon.querySelector(".kunstner").textContent = sang.kunstner;

            klon.querySelector(".sang").addEventListener("click", () => visDetaljer(sang));
            dest.appendChild(klon);
        }
    })
}

function visDetaljer(hvad) {
    location.href = `detaljer.html?id=${hvad._id}`;
}
hentData();
