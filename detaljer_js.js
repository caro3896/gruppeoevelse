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

//Henter data fra restdb
async function hentData() {
    console.log("Hent data");
    const respons = await fetch(`https://faellespassion-9f07.restdb.io/rest/faellespassion/${id}`, options);
    sang = await respons.json();

    console.log("Sange", sang);
    visSang(sang);
}

function visSang() {
    console.log(id);
    //    document.querySelector(".billede").src = medieurl + sang.profilbillede;
    document.querySelector(".titel").textContent = sang.titel;
    document.querySelector(".kunstner").textContent = sang.band;
    document.querySelector(".album").textContent = sang.album;
    document.querySelector(".udgivelse").textContent = sang.udgivelsesår;
    document.querySelector(".land").textContent = sang.land;
    document.querySelector(".genre").textContent = sang.genre;
    document.querySelector("button").addEventListener("click", tilbage);
}

function tilbage() {
    history.back();
}
