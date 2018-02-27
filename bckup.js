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


    if (typeof result == 'undefined' || typeof result.id == 'undefined' && document.getElementById('img').value == "") { //jei nera irasu - kuriam naujus

        if (document.getElementById('img').value == "") { //jei nera paveiksliuko pasirinkimo/ pushinam i nauja irasa default.png

            dataArray.push({
                id: uuidv4(),
                name: inputName,
                property1: inputProperty1,
                property2: inputProperty2,
                image: 'images/default.png'
            });
        } else { // jei yra paveiksliuko pasirinkinmas  pushinam i nauja irasa pasirinkima
            dataArray.push({
                id: uuidv4(),
                name: inputName,
                property1: inputProperty1,
                property2: inputProperty2,
                image: 'images/' + document.getElementById('img').files[0].name
            });
        }


    } else { //jei yra irasas - atnaujinam seno iraso propercius

        result.name = inputName;
        result.property1 = inputProperty1;
        result.property2 = inputProperty2;


        if (document.getElementById('img').value != "") {
            result.image = 'images/' + document.getElementById('img').files[0].name;
        }
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
`
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
}


//funkcija seno irasyto ID istrynimui kai kuriamas naujas irasas
function clearID() {
    targetID = ''
}

// jei yra duomenu data arrayjuje = juos paparsinam ir atspausdinam per print f-ja
function render() {
    if (dataArray) {
               printInput();
    }
}
// render();

//f-ja modalinio lango uzpildymui
function populateModal(uniqueNo) { //panaudojam funkcijos parametro value atitikmens paieskai dataArray'uje
    targetID = uniqueNo;
    dataArray = JSON.parse(localStorage.getItem('dataArray'));

    document.getElementById('promptModalTitle').innerText = 'Įrašo redagavimas';

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

}



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
            // console.log(dataArray);
            render();
        })
    });
}