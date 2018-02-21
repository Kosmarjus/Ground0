let dataArray = [];

function storeInput() {
    let inputName = document.getElementById('input').value;
    let inputProperty1 = document.getElementById('property1').value;
    let inputProperty2 = document.getElementById('property2').value;
    dataArray.push({
        name: inputName,
        property1: inputProperty1
    });
    localStorage.setItem('dataArray', JSON.stringify(dataArray));
}

function printInput() {
    let destination = document.querySelector('.main');
    let printOut = '';
    for (const entry of dataArray) {

        printOut += `
    <div>
        <ul> Pavadinimas:            ${entry.name}
            <li> Propertis1: ${entry.property1}</li>
            <li> Propertis2: ${entry.property2}</li>
        </ul>
    </div>
`

        //todo print a li for every non empty property?

    }
    destination.innerHTML = printOut;
}


function render() {
    if (localStorage.getItem('dataArray')) {
        dataArray = JSON.parse(localStorage.getItem('dataArray'));
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