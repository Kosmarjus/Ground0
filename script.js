let dataArray = [],
    targetID = '';

//random ID generatorius (specialiai Andriui vietoje timestamp'o)
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

//f-ja irasu issaugojimui i localstorage
function storeInput() {
    let inputName = document.getElementById('input').value;
    let inputProperty1 = document.getElementById('property1').value;
    let inputProperty2 = document.getElementById('property2').value;

    var result = dataArray.filter(function (obj) { //f-ja objekto atrinkimui pagal dabartini ID
        return obj.id == targetID;
    })[0];


    if (typeof result == 'undefined' || typeof result.id == 'undefined') { //jei nera irasu - kuriam naujus
        dataArray.push({
            id: uuidv4(),
            name: inputName,
            property1: inputProperty1,
            property2: inputProperty2
        });

    } else { //jei yra irasas - atnaujinam seno iraso propercius

        result.name = inputName;
        result.property1 = inputProperty1;
        result.property2 = inputProperty2;


    }

    localStorage.setItem('dataArray', JSON.stringify(dataArray)); //stumiam i localstorage
    $('#promptModal').modal('hide'); //ir paslepiap modalini langa 
}


//f-ja irasu spausdinimui i .main klase
function printInput() {
    let destination = document.querySelector('.main');
    let printOut = '';
    for (const entry of dataArray) {

        printOut += `
        <a class="containerBox" data-toggle="modal" href="#promptModal" onclick="populateModal()" id="${entry.id}"><div> 
        <ul> Pavadinimas:            ${entry.name}
            <li> Propertis1: ${entry.property1}</li>
            <li> Propertis2: ${entry.property2}</li>
        </ul>
        </div>
        </a>
`
    }
    destination.innerHTML = printOut;
}


//funkcija modalinio lango lauku isvalymui 
function clearInputs() {
    document.getElementById('input').value = "";
    document.getElementById('property1').value = "";
    document.getElementById('property2').value = "";
    document.getElementById('deleteButton').style.visibility = 'hidden'; //tuo paciu paslepiam delete mygtuka jei nekoreguojam seno iraso
}

// jei yra duomenu data arrayjuje = juos paparsinam ir atspausdinam per print f-ja
function render() {
    if (localStorage.getItem('dataArray')) {
        dataArray = JSON.parse(localStorage.getItem('dataArray'));
        printInput();
    }
}
render();


//f-ja modalinio lango uzpildymui
function populateModal() {

    dataArray = JSON.parse(localStorage.getItem('dataArray'));

    var result = dataArray.filter(function (obj) { //f-ja objekto atrinkimui pagal dabartini ID
        return obj.id == targetID;
    })[0];

    document.getElementById('input').value = result.name; //priskiriame inputams vertes is dataArray
    document.getElementById('property1').value = result.property1;
    document.getElementById('property2').value = result.property2;

    document.getElementById('deleteButton').style.visibility = 'visible'; //redaguojant irasa - padarome mygtuka delete matoma
}


//funkcija targetID paemimui
function getID(e) {
    targetID = e.target.id;
}
//targetID trigeriai
document.querySelector('.main').addEventListener('mouseover', getID, false);
document.querySelector('.main').addEventListener('focus', getID, true);




//trynimo mygtuko funkcija
function deleteCard() {

    let confirmation = confirm('Ar tikrai norite ištrinti šią kortelę?');
    if (confirmation == true) {

        var result = dataArray.filter(function (obj) { //f-ja objekto atrinkimui pagal dabartini ID
            return obj.id == targetID;
        })[0];

        dataArray.splice(dataArray.findIndex(p => p.id == result.id), 1); //trinam irasa surasdami jo pozicija arrajuje pagal jame esancio ID verte (haha!)
        localStorage.setItem('dataArray', JSON.stringify(dataArray)); //irasom nauja arraju
    }
    $('#promptModal').modal('hide'); //slepiam modalini langa po mygtuko paspaudimo
    render(); //atnaujinam ekrana
}


//search filter JSON black magic
$("#searchInput").on("keyup", function () {
    var g = $(this).val().toLowerCase();
    $(".main a div ul").each(function () {
        var s = $(this).text().toLowerCase();
        $(this).closest('.containerBox')[s.indexOf(g) !== -1 ? 'show' : 'hide']();
    });
});