// Consegna:
// Dato un array di oggetti letterali con:
//  - url dell’immagine
//  - titolo
//  - descrizione
// Creare un carosello come nella foto allegata. Attenzione! Le immagini nello screenshot sono differenti da quelli  che vi invio, ma il layout non cambia.

// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.

// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

// Milestone 2:
// Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.

const arrayImgs = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];


// PSEUDO CODE
// prendo le variabili globali che mi servono
const containerTop = document.getElementById("container-top");
const containerThumbs = document.getElementById("container-thumbs");
let cardsImg = "";
let cardsThumbs = "";

// scorrere l' arrayImgs ciclo FOR; creare elemento e inserirlo nel html con classi e ID
// mettere foto con DIV foto; title e text in DIV description
for(let i = 0; i < arrayImgs.length; i++) {
    const object = arrayImgs[i];
    cardsImg += `
        <div style= "
        background-image: url(${object["image"]});
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        position: relative;
        ">
            <div class="img-description">
                <h2>${object["title"]}</h2>
                <p>${object["text"]}</p>
            </div>
        </div>
    `
}

containerTop.innerHTML = cardsImg;

// nascondere tutti gli elementi con classe hidden, tranne il primo classe active
// fare la stessa cosa con THUMBS
// scrivere funzione per i BTNS che rimuovano classe active e la addano alla foto succ. o prec.