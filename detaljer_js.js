//Opretter konstaner for restdb
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "https://faellespassion-9f07.restdb.io/rest/faellespassion";
const medieurl = "https://faellespassion-9f07.restdb.io/media/";
const options = {
    headers: {
        'x-apikey': "602e60ce5ad3610fb5bb6312"
    }
};

let sang;
console.log("ID", id);

//Lytter om DOM er loaded inden data hentes
document.addEventListener("DOMContentLoaded", hentData);

//Henter data fra restdb og kalder funktion visSang
async function hentData() {
    console.log("Data hentes");
    const respons = await fetch(`https://faellespassion-9f07.restdb.io/rest/faellespassion/${id}`, options);
    sang = await respons.json();
    visSang(sang);
}

//Funktion der indsætter data fra restdb i HTML'en
function visSang() {
    console.log("Sange", sang);
    document.querySelector(".billede").src = medieurl + sang.profilbillede;
    document.querySelector(".titel").textContent = sang.titel;
    document.querySelector(".kunstner").textContent = sang.band;
    document.querySelector(".album").textContent = `Album: ${sang.album}`;
    document.querySelector(".udgivelse").textContent = `Udgivelsesår: ${sang.udgivelsesår}`;
    document.querySelector(".land").textContent = `Land: ${sang.land}`;
    document.querySelector(".genre").textContent = `Genre: ${sang.genre}`;
    document.querySelector(".beskrivelse").textContent = sang.beskrivelse;
    document.querySelector("button").addEventListener("click", tilbage); //Lytter efter klik på tilbage knap og kalder funktion tilbage
}

//Går et step tilbage i historikken dvs. tilbage til oversigten
function tilbage() {
    history.back();
}
