let dataArray = [],
    targetID = '',
    checkArray = [];

function storeInput() {
    let inputName = document.getElementById('input').value;
    let inputProperty1 = document.getElementById('property1').value;
    let inputProperty2 = document.getElementById('property2').value;


    if (localStorage.getItem('dataArray')) {
        checkArray = JSON.parse(localStorage.getItem('dataArray'));
    } else {
        checkArray = [];
    }

    var result = dataArray.filter(function (obj) {
        return obj.id == targetID;
    })[0];


    if (typeof result == 'undefined' || typeof result.id == 'undefined') { //store new input
        dataArray.push({
            id: Date.now(),
            name: inputName,
            property1: inputProperty1,
            property2: inputProperty2
        });
        localStorage.setItem('dataArray', JSON.stringify(dataArray));
        $('#promptModal').modal('hide');

    } else { //update current input
        console.log('aktyus senas' + result.id);
        result.name = inputName;
        result.property1 = inputProperty1;
        result.property2 = inputProperty2;
        localStorage.setItem('dataArray', JSON.stringify(dataArray));
        $('#promptModal').modal('hide');
    }
}

function printInput() {
    let destination = document.querySelector('.main');
    let printOut = '';
    for (const entry of dataArray) {

        printOut += `
        <a data-toggle="modal" href="#promptModal" onclick="populateModal()" id="${entry.id}"><div> 
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

function clearInputs() {
    document.getElementById('input').value = "";
    document.getElementById('property1').value = "";
    document.getElementById('property2').value = "";
    document.getElementById('deleteButton').style.visibility = 'hidden';
}

function render() {
    if (localStorage.getItem('dataArray')) {
        dataArray = JSON.parse(localStorage.getItem('dataArray'));

        // counter = +dataArray[dataArray.length-1].id;

        printInput();
    }
}
render();

function search() {
    // let searchText = document.getElementById('searchInput').value;
    // dataArray =  JSON.parse(localStorage.getItem('dataArray'));

    // var results=dataArray.filter(function(item){
    // return item.VAL.indexOf(searchText)>-1;
    // });
    // console.log(results);
}

function populateModal() {
    console.log('i work');
    dataArray = JSON.parse(localStorage.getItem('dataArray'));


    var result = dataArray.filter(function (obj) {
        return obj.id == targetID;
    })[0];
    console.log('amagad' + result.id);

    document.getElementById('input').value = result.name;
    document.getElementById('property1').value = result.property1;
    document.getElementById('property2').value = result.property2;

    document.getElementById('deleteButton').style.visibility = 'visible';
}

function getID(e) {
    targetID = e.target.id;
    console.log(targetID);
}

document.querySelector('.main').addEventListener('mouseover', getID, false);
document.querySelector('.main').addEventListener('focus', getID, true);

function deleteCard() {

    let confirmation = confirm('Ar tikrai norite ištrinti šią kortelę?');

    if (confirmation == true) {
        console.log('taip');

        var result = dataArray.filter(function (obj) {
            return obj.id == targetID;
        })[0];
        console.log('pzpzpzppz' + result.id)
        dataArray.splice(dataArray.findIndex(p => p.id == result.id), 1);
        localStorage.setItem('dataArray', JSON.stringify(dataArray));
    }
    console.log(dataArray);
    $('#promptModal').modal('hide');
    render();

}