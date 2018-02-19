let skaicius, //tuscias skaicius
    masyvas = [], //tuscias masyvas
    visoVidurkis = 'dalyba iš nulio :(', //pradine reiksme, neivedus jokiu skaiciu
    visoSuma = 0; //pradine reiksme, neivedus jokiu skaiciu
skaicius = +prompt('Iveskite skaiciu'); //pirmas skaiciaus prasymas
while (isFinite(skaicius) && skaicius != null && skaicius != "") { //jei tai skaicius, nelygus Cancel paspaudimui (null), ir nelygus tusciam ok paspaudimui ("")
    masyvas.push(skaicius); //dedam skaiciu i array
    skaicius = +prompt('Iveskite skaiciu'); //ir prasom naujo skaiciaus
}

let visoSkaiciu = masyvas.length; //suskaiciuojam masyvo ilgi (ty kiek skaiciu ivesta)

if (masyvas.length !== 0) { //jei buvo ivesta skaiciu
    const sumuotojas = (accumulator, currentValue) => accumulator + currentValue; //sumavimui naudosime funkcija su dviem parametrais
    visoSuma = masyvas.reduce(sumuotojas); //ir ja naudosime metodui reduce

    visoVidurkis = visoSuma / visoSkaiciu; //tada suskaiciuojam vidurki

}
//ir atspausdinam rezultata
document.getElementById('viso').innerHTML = 'Viso ivesta  ' + visoSkaiciu + ' skaiciu';
document.getElementById('vidurkis').innerHTML = 'Ju vidurkis yra: ' + visoVidurkis;
document.getElementById('suma').innerHTML = 'Ju bendra suma yra: ' + visoSuma;