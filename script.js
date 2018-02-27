let dataArray = [],
    targetID = '';

    //Sukuriu mygtuko "issaugoti" listeneri - iraso sukurimo scenarijui, paspaudus ant sukurti mygtuko
    function createListener() {
        document.getElementById('saveButton').addEventListener('click', createNewEntry);
    }
    
    //f-ja irasu kurimui
function createNewEntry() {

    let inputName = document.getElementById('input').value; //pasiimame modalinio lango inputu reiksmes
    let inputProperty1 = document.getElementById('property1').value;
    let inputProperty2 = document.getElementById('property2').value;

    let newEntry = {}; //naujas kintamas kuri kelsim i db ir jo parametrai
    newEntry.name = inputName;
    newEntry.property1 = inputProperty1;
    newEntry.property2 = inputProperty2;

    if (document.getElementById('img').value == "") { //jei nera paveiksliuko pasirinkimo/ pushinam i nauja irasa default.png
        newEntry.image = 'images/default.png';

    } else { // jei yra paveiksliuko pasirinkinmas  pushinam i nauja irasa pasirinkima
        newEntry.image = 'images/' + document.getElementById('img').files[0].name;
    }

    fetch("http://localhost:3000/albums", { // pushinam nauja irasa i db
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newEntry)
    }).then(function (data) {
        console.log("Įrašas sukurtas sekmingai");
        loadServerData();
    }).catch(function (error) {
        console.log("Įrašo nepavyko išsaugoti", error);
    });

    clearInputs();  //išvalom laukus
    $('#promptModal').modal('hide'); //ir paslepiap modalini langa 
}

//f-ja irasu spausdinimui i .main klase
function printInput() {
    let destination = document.querySelector('.main');
    let printOut = '';
    for (const entry of dataArray) {

        printOut += `
        <div class="cardContainer">
        <a class="containerBox" data-toggle="modal" href="#promptModal" onclick="populateModal('${entry.id}')"><div> 
        <ul>Atlikėjas: ${entry.name}
            <li> Albumas: ${entry.property1}</li>
            <li> Metai: ${entry.property2}</li>
            <div class="imageContainer"><img src="${entry.image}"></div>
        </ul>
        </div>
        </a>
        </div>
`;
    }
    destination.innerHTML = printOut;
}

//funkcija modalinio lango lauku isvalymui 
function clearInputs() {
    document.getElementById('input').value = "";
    document.getElementById('property1').value = "";
    document.getElementById('property2').value = "";
    document.getElementById('img').value = "";
    document.getElementById('deleteButton').style.visibility = 'hidden'; //tuo paciu paslepiam delete mygtuka jei nekoreguojam seno iraso
    document.getElementById('showimage').style.visibility = 'hidden'; //paslepiam modalinio paveiksliuka
    document.getElementById('promptModalTitle').innerText = 'Naujas įrašas'; //isvalom modalinio pavadinima
    document.getElementById('searchOnYouTube').style.visibility = 'hidden'; //paslepiam modalinio mygtuka
       targetID = ''; //nuresetinam targetID (jei bus kuriamas naujas irasas)
    document.getElementById('saveButton').removeEventListener('click', createNewEntry); //pasalinam listenerius, kadangi naudojame viena mygtuka abiem atvejais
    document.getElementById('saveButton').removeEventListener('click', updateEntry);
}



// jei yra duomenu db = juos atspausdinam per print f-ja
function render() {
    if (dataArray) {
        printInput();
    }
}

//f-ja modalinio lango uzpildymui
function populateModal(uniqueNo) { //panaudojam funkcijos parametro value atitikmens paieskai db
    targetID = uniqueNo;
    
    document.getElementById('promptModalTitle').innerText = 'Įrašo redagavimas'; //pakeičiam pavadinimą jei redaguojam įrašą

    var result = dataArray.filter(function (obj) { //f-ja objekto atrinkimui pagal dabartini ID
        return obj.id == targetID;
    })[0];

    document.getElementById('input').value = result.name; //priskiriame inputams vertes is dataArray
    document.getElementById('property1').value = result.property1;
    document.getElementById('property2').value = result.property2;
    document.getElementById('showimage').src = result.image;
    document.getElementById('deleteButton').style.visibility = 'visible'; //redaguojant irasa - padarome mygtuka delete matoma
    document.getElementById('showimage').style.visibility = 'visible'; //redaguojant irasa - paveiksliukas matomas


    let getYoutubelink = document.getElementById('searchOnYouTube'); //locate the search on Youtube button
    getYoutubelink.style.visibility = 'visible';
    let url = 'https://www.youtube.com/results?search_query=' + result.name + ' ' + result.property1; // generate search query
    getYoutubelink.href = url;
    getYoutubelink.target = '_blank'; 

    document.getElementById('saveButton').addEventListener('click', updateEntry); //priskiriam listeneri save mygtukui - kad vaziuotu redagavimo scenarijus
}


//iraso keitimo f-ja
function updateEntry() {

    let inputName = document.getElementById('input').value; 
    let inputProperty1 = document.getElementById('property1').value;
    let inputProperty2 = document.getElementById('property2').value;
    let newEntry = {};

    newEntry.name = inputName;
    newEntry.property1 = inputProperty1;
    newEntry.property2 = inputProperty2;

    if (document.getElementById('img').value != "") { //paveiksliuko keitimas truputi kitaip nei iraso kurime - jei pasirenkame paveiksliuka - ji ir pusiname
        newEntry.image = 'images/' + document.getElementById('img').files[0].name;
    }

    fetch("http://localhost:3000/albums/" + targetID, { //patch metodas, su nuoroda i iraso ID (pagal json db API)
        method: "PATCH",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newEntry)
    }).then(function (data) {
        console.log("Atnaujinta sekmingai");
        loadServerData();
        clearInputs();
    }).catch(function (error) {
        console.log("nepavyko Atnaujinti", error);
    });
    $('#promptModal').modal('hide');
    document.getElementById('saveButton').removeEventListener('click', updateEntry); //po pakeitimo pasaliname event listeneri
}


//trynimo mygtuko funkcija
function deleteCard() {

    let confirmation = confirm('Ar tikrai norite ištrinti šią kortelę?');
    if (confirmation == true) {

        fetch("http://localhost:3000/albums/" + targetID, { //DELETE metodas iraso trynimui
            method: "DELETE"
        }).then(function (data) {
            console.log("Ištrinta sekmingai");
            loadServerData();
            clearInputs();

        }).catch(function (error) {
            console.log("nepavyko ištrinti", error);
        });
     }
    $('#promptModal').modal('hide'); //slepiam modalini langa po mygtuko paspaudimo
}

//funkcija automatiniam paveiksliuko rodymui kai jis pasirenkamas
function renderImage(input) {
    if (input.files && input.files[0]) {

        document.getElementById('showimage').style.visibility = 'visible';
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#showimage')
                .attr('src', e.target.result)
                .width(256)
                .height(256);
        };

        reader.readAsDataURL(input.files[0]);
    }
}





//search filter tired of making it work with native JS, adapted some stack overflow JSON black magic
$("#searchInput").on("keyup", function () {
    var g = $(this).val().toLowerCase();
    $(".main div a div ul").each(function () {
        var s = $(this).text().toLowerCase();
        $(this).closest('.cardContainer')[s.indexOf(g) !== -1 ? 'show' : 'hide']();
    });
});


loadServerData();

function loadServerData() {
    fetch("http://localhost:3000/albums").then(function (response) {
        response.json().then(function (data) {
            dataArray = data;
            render();
        });
    });
}