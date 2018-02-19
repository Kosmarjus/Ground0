const personazai = ['Jon Snow', 'Cersei Lannister', 'Daenerys Targaryen', 'Theon Greyjoy', 'Tyrion Lannister', 'Arya Stark']; // declare array 

let pasirinkimas = +prompt('Iveskite skaiciu nuo 1 iki 6'); //first prompt

while (isNaN(pasirinkimas) == true || pasirinkimas < 1 || pasirinkimas > 6) { //keep prompting, unless entry is a number  [1-6]
    pasirinkimas = +prompt('Iveskite SKAICIU NUO 1 iki 6');
}
console.log(personazai[pasirinkimas - 1]);
document.getElementById('personazas').innerHTML = 'Pasirinktas personazas yra: '+personazai[pasirinkimas - 1];