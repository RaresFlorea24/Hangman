const btn = document.getElementById('btn');
const poza = document.getElementById('poza');
const litere = document.getElementById('litere');
const greseli = document.getElementById('greseli');

let cuvant;
let mistakes = 6;

document.addEventListener('DOMContentLoaded', onLoad);
document.addEventListener('keyup', onKeyUp);

function onLoad() {
    onReset();
    btn.addEventListener('click', onReset);
}
function onKeyUp(e) {
    let guess = e.key;
    if (e.keyCode < 65 || e.keyCode > 90) return;
    let empty = getEmptySlots();
    let ghicite = 0
    empty.forEach(l => {
        if (l.k == guess) {
            l.textContent = guess;
            delete l.k;
            ghicite++;
        }
    });
    if (ghicite == 0) {
        greseli.textContent = `${greseli.textContent} ${guess} | `;
        addPenalty(mistakes);
        mistakes--;
    }
    if (getEmptySlots().length == 0) {
        alert('ai castigat!');
    } else if (mistakes == 0) {
        alert('ai pierdut!');
    }
}
function onReset() {
    mistakes = 6;
    greseli.innerHTML = '';
    poza.querySelectorAll('[id]').forEach(x => x.style.display = "none");
    cuvant = alegeCuvant();
    deseneazaCuvant(cuvant);
}
function alegeCuvant() {
    let cuvinte = ['ceainic', 'balenozaur', 'cighiristan', 'pachiderm', 'rinoplastie'];
    let ndx = genereazaNumar(-1, cuvinte.length - 1);
    return cuvinte[ndx];
}
function deseneazaCuvant(cuvant) {
    let litera;
    litere.innerHTML = '';
    cuvant.split('').forEach((l, i) => {
        litera = document.createElement('span');
        if (i == 0 || i == cuvant.length - 1)
            litera.textContent = l;
        else
            litera.k = l;
        litere.appendChild(litera);
    });
}
function genereazaNumar(minValue, maxValue) {
    return Math.ceil(minValue + Math.random() * (maxValue - minValue));
}
function getEmptySlots() {
    return Array.from(litere.querySelectorAll('span')).filter(l => l.textContent == "");
}
function addPenalty(id) {
    poza.getElementById(`id${6 - id + 1}`).style.display = "inherit";
}