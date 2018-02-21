let dataArray = [],
    targetID = '',
    counter,
    checkArray = [];


function storeInput() {
    let inputName = document.getElementById('input').value;
    let inputProperty1 = document.getElementById('property1').value;
    let inputProperty2 = document.getElementById('property2').value;
    // jei dataArray[targetID] = "" // push // else splice? array.splice(4+1, 1, 'kuo keiciam');

    console.log(targetID)
    if (localStorage.getItem('dataArray')) {
        checkArray = JSON.parse(localStorage.getItem('dataArray'));
       } else {
        checkArray = [];
    }

    if (typeof checkArray[targetID] == 'undefined') {
   
        dataArray.push({
            id: _.uniqueId(),
            name: inputName,
            property1: inputProperty1,
            property2: inputProperty2
        });
        localStorage.setItem('dataArray', JSON.stringify(dataArray));
        $('#promptModal').modal('hide');

    } else {

        dataArray[targetID].name = inputName;
        dataArray[targetID].property1 = inputProperty1;
        dataArray[targetID].property2 = inputProperty2;
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

        //todo print a li for every non empty property?

    }
    destination.innerHTML = printOut;


}

function clearInputs() {
    document.getElementById('input').value = "";
    document.getElementById('property1').value = "";
    document.getElementById('property2').value = "";
}


function render() {
    if (localStorage.getItem('dataArray')) {
        dataArray = JSON.parse(localStorage.getItem('dataArray'));

        counter = +dataArray[dataArray.length-1].id;

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

    let activeItem = dataArray.filter(function(item){
        return item.id == targetID;
    })[0];

    document.getElementById('input').value = activeItem.name;
    document.getElementById('property1').value = activeItem.property1;
    document.getElementById('property2').value = activeItem.property2;
}

function getID(e) {
    targetID = e.target.id;
    console.log(targetID);
}

document.querySelector('.main').addEventListener('mouseover', getID, false);
document.querySelector('.main').addEventListener('focus', getID, true);

function clearID() {
    targetID = ''
}


function deleteCard() {

    let confirmation = confirm('Ar tikrai norite ištrinti šią kortelę?');

    if (confirmation == true) {
        console.log('taip');
        dataArray.splice(targetID, 1);
        localStorage.setItem('dataArray', JSON.stringify(dataArray));
    }
    console.log(dataArray);
    $('#promptModal').modal('hide');
    render();

}