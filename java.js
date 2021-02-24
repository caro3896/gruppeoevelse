//Opretter konstanter for restdb
const url = "https://faellespassion-9f07.restdb.io/rest/faellespassion";
const medieurl = "https://faellespassion-9f07.restdb.io/media/";
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
let nav = document.querySelector("nav");
let sticky = nav.offsetTop; //Får positionen af navbaren

//Første funktion der kaldes efter DOM er loaded
function start() {
    console.log("DOM er loaded");
    //Oprettelse af filterknapper
    const filterKnapper = document.querySelectorAll("#genre .btn");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerGenre)); // - lytter efter klik på hver knap
    window.addEventListener("scroll", stickyNav); //Lytter efter scroll på siden og kalder funktionen stickyNav
    hentData();
}

//Funktion der gør navbaren sticky når der scrolles forbi den oprindelige position
function stickyNav() {
    if (window.pageYOffset >= sticky) {
        nav.classList.add("sticky")
    } else {
        nav.classList.remove("sticky");
    }
}

//Funktion der filtrerer sangene efter det aktive/valgte filter og kalder på funktion visSange (så sange for valgte filter vises)
function filtrerGenre() {
    console.log("Klikket på genre");
    filter = this.dataset.genre;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    visSange();
    header.textContent = this.textContent; //Udskriver det valgte filter i headeren (h3)
}


//Henter data fra restdb og kalder funktionen visSange
async function hentData() {
    console.log("Data fra restdb hentes");
    const respons = await fetch(url, options);
    sange = await respons.json();
    visSange();
}

//Opretter konstanter for templaten
const dest = document.querySelector("#oversigt");
const template = document.querySelector("template").content;

//Funktion der viser sange i liste view - sætter hver enkelt sang ind i HTML'en
function visSange() {
    console.log("Sange vises");

    let loadingAnimation = document.querySelector('.preload');
    loadingAnimation.style.display = 'none';
    console.log("animation slut");

    dest.textContent = ""; //Templaten tømmes for indhold før der tilføjes nyt

    //For hver sang tilføjes bl.a. billede, titel, kunstner osv. (data hentes fra restdb) og indsættes i HTML'en via templaten
    sange.forEach(sang => {
        console.log("Genre", sang.genre);
        if (filter == sang.genre || filter == "alle") {

            const klon = template.cloneNode(true); //Templaten klones og fyldes med indhold
            klon.querySelector(".billede").src = medieurl + sang.profilbillede;
            klon.querySelector(".titel").textContent = sang.titel;
            klon.querySelector(".kunstner").textContent = sang.band;

            klon.querySelector(".sang").addEventListener("click", () => visDetaljer(sang)); //Lytter efter klik på specifik sang og kalder visDetaljer for sangen
            dest.appendChild(klon); //Tilføjer klonen til DOM
        }
    })
}

//Kalder på en ny html side (detaljer.html) for at se single view af den valgte sang
function visDetaljer(hvad) {
    location.href = `detaljer.html?id=${hvad._id}`;
}
//hentData();
