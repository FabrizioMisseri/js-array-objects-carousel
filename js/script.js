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

// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

// BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.

// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.

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

alert("benvenuto nella game roulette!");


// PSEUDO CODE
// prendo le variabili globali che mi servono
const containerTop = document.getElementById("container-top");
const containerThumbs = document.getElementById("container-thumbs");
let cardsImg = "";
let cardsThumb = "";
let itemSelector = 0;
let switcherFlag = true;
let autoplayFlag = true;

// scorrere l' arrayImgs ciclo FOR; creare elemento e inserirlo nel html con classi e ID
// mettere foto con DIV foto; title e text in DIV description
// nascondere tutti gli elementi con classe hidden, tranne il primo classe active
for(let i = 0; i < arrayImgs.length; i++) {
    const object = arrayImgs[i];
    cardsImg += `
        <div class="card-image hidden"
        style= "
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

// fare la stessa cosa con THUMBS
for(let i = 0; i < arrayImgs.length; i++) {
    const object = arrayImgs[i];
    cardsThumb += `
        <div class="interactive-tumbnail"
        style= "
        background-image: url(${object["image"]});
        background-position: center;
        background-size: cover;
        width: calc(100% / 5);
        height: 100%;
        position: relative;
        ">
            <div class="veil dark-veil"></div>
        </div>
    `;
}

// aggiungere i btns all' HTML
containerThumbs.innerHTML = cardsThumb;
containerThumbs.innerHTML += `
    <span id="next-btn">
        <i class="fa-solid fa-chevron-right"></i>
    </span>

    <span id="prev-btn">
        <i class="fa-solid fa-chevron-left"></i>
    </span>
`;

// seleziono i bottoni
let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("prev-btn");

// sleziono tutti gli item card-image
const cardsImage = document.getElementsByClassName("card-image");
cardsImage[itemSelector].classList.add("active");
cardsImage[itemSelector].classList.remove("hidden");

// seleziono tutti thumbs veil
const veil = document.getElementsByClassName("veil");

// al primo img-thumb rimuovo il velo oscurante 
veil[itemSelector].classList.remove("dark-veil");
veil[itemSelector].classList.add("border-green");

// scrivere funzione per i BTNS che rimuovano classe active e la addano alla foto succ. o prec.
// next-btn
nextBtn.addEventListener("click", stepNext);

// prev-btn
prevBtn.addEventListener("click", stepPrev);

// prelevo i btns della console
const invertBtn = document.getElementById("invert-btn");
const stopBtn = document.getElementById("stop-btn");

// aggiungo eventi al click ai btns della console switch
invertBtn.addEventListener("click", switchSlideshow);
stopBtn.addEventListener("click", stopSlideshow);

// dopo 3 secondi switch dell' immagine a destra o a sinistra
setInterval(switcher, 150);

// costruisco l' array miniature prendendo tutte le carte miniature e aggiungo interazione
const thumbnails = document.getElementsByClassName("interactive-tumbnail");

for(let i = 0; i < thumbnails.length; i++) {
    const thisThumbnail = thumbnails[i];
    thisThumbnail.addEventListener("click", function(){
        moveToImage(i);
    });
}




// FUNCTIONS

/** STEP-NEXT BTN
 * Description: passa alla foto successiva
 */
function stepNext() {
    cardsImage[itemSelector].classList.remove("active");
    cardsImage[itemSelector].classList.add("hidden");
    veil[itemSelector].classList.add("dark-veil");
    veil[itemSelector].classList.remove("border-green");

    if(itemSelector < cardsImage.length - 1){
        itemSelector++;
    } else {
        itemSelector = 0;
    }

    cardsImage[itemSelector].classList.add("active");
    cardsImage[itemSelector].classList.remove("hidden");
    veil[itemSelector].classList.remove("dark-veil");
    veil[itemSelector].classList.add("border-green");
}


/** STEP-PREV BTN
 * Description: passa alla foto precedente
 */
function stepPrev() {
    cardsImage[itemSelector].classList.remove("active");
    cardsImage[itemSelector].classList.add("hidden");
    veil[itemSelector].classList.add("dark-veil");
    veil[itemSelector].classList.remove("border-green");
    
    if(itemSelector >  0){
        itemSelector--;
    } else {
        itemSelector = cardsImage.length - 1;
    }

    cardsImage[itemSelector].classList.add("active");
    cardsImage[itemSelector].classList.remove("hidden");
    veil[itemSelector].classList.remove("dark-veil");
    veil[itemSelector].classList.add("border-green");
}


/** SWITCHER
 * Description: funzione che switcha le slide a destra o a sinistra
 */
function switcher() {
    if(autoplayFlag === true) {
        if (switcherFlag === true) {
            stepNext();
        } else {
            stepPrev();
        }
    }
}


/** SWITCH SLIDESHOW
 * Description: cambia lo stato del flag che decide l' ordine di scorrimento (se verso dx o sx)
 */
function switchSlideshow() {
    if (switcherFlag === true) {
        switcherFlag = false;
    } else if (switcherFlag === false){
        switcherFlag = true;
    }
}


/** STOP SLIDESHOW
 * Description: semplice bottone di start/stop dell' autoplay
 */
function stopSlideshow() {
    if(autoplayFlag === true){
        autoplayFlag = false;
    } else {
        autoplayFlag = true;
    }
}


/** MOVE TO IMAGE
 * Description: al click della minatura ci si sposta alla relativa immagine
 * @param {number} i: è il parametro contatore che gli passiamo dal ciclo for
 */
function moveToImage(i) {
    cardsImage[itemSelector].classList.remove("active");
    cardsImage[itemSelector].classList.add("hidden");
    veil[itemSelector].classList.add("dark-veil");
    veil[itemSelector].classList.remove("border-green");

    itemSelector = i;

    cardsImage[itemSelector].classList.add("active");
    cardsImage[itemSelector].classList.remove("hidden");
    veil[itemSelector].classList.remove("dark-veil");
    veil[itemSelector].classList.add("border-green");
}
