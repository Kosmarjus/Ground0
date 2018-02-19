let listButton = document.querySelector('.bigButton');
let taskButton = document.querySelector('.button');
let listCounter = 0;
let targetID = '';
let todo = [];


listButton.addEventListener('click', function () {
    createNewList();
});


if (localStorage.getItem('todolist')) {

    todo = JSON.parse(localStorage.getItem('todolist'));
    // listCounter = todo.length;
    for (entry in todo) {


        // let createDiv = document.createElement('div');
        // createDiv.id = 'div' + todo[entry].id;
        // document.querySelector('.container').insertBefore(createDiv, document.querySelector('.bigButton'));

        // let createUl = document.createElement('ul');
        // createUl.id = 'list' + todo[entry].id;
        // createUl.className = 'ul'
        // document.getElementById('div' + todo[entry].id).appendChild(createUl);

        // let createH3 = document.createElement('h3');
        // let taskListName = 'Task list #' + todo[entry].id; //TASKLISTO PAVADINIMAS

        // createH3.innerText = taskListName;
        // createUl.appendChild(createH3);

        createNewList(todo[entry].id)


    }


}





function createNewList(localID) {
    listCounter++; //padidinam counteri

    if (localID) {
        listCounter = localID
    };


    let createDiv = document.createElement('div');
    createDiv.id = 'div' + listCounter;
    document.querySelector('.container').insertBefore(createDiv, document.querySelector('.bigButton'));


    let createUl = document.createElement('ul');
    createUl.id = 'list' + listCounter;
    createUl.className = 'ul'
    document.getElementById('div' + listCounter).appendChild(createUl);


    let createH3 = document.createElement('h3');
    let taskListName = 'Task list #' + listCounter; //TASKLISTO PAVADINIMAS






    createH3.innerText = taskListName;
    createUl.appendChild(createH3);

    createH3.addEventListener("click", function () {
        if (createH3.style.textDecoration === 'line-through') {
            createH3.style.textDecoration = '';
        } else {
            createH3.style.textDecoration = 'line-through'
        }
    })



    createH3.addEventListener("dblclick", function () {
        createDiv.remove();
    })


    let createInput = document.createElement('input');
    createInput.id = 'input' + listCounter;
    createInput.type = 'text';
    createInput.placeholder = 'enter task here';
    document.getElementById('div' + listCounter).appendChild(createInput);

    let createDiv2 = document.createElement('div');
    document.getElementById('div' + listCounter).appendChild(createDiv2);


    let createButton = document.createElement('button');
    createButton.className = 'button';
    createButton.id = 'button' + listCounter;
    createButton.innerText = 'Add task';
    createDiv2.appendChild(createButton);
    let taskButton = document.getElementById('button' + listCounter);
    let input = document.getElementById('input' + listCounter);







    // for (task in todo[entry].items) {

    taskButton.addEventListener('click', function () {

        createNewTask(input.value);

    });
    // }


    //i feel bad for doing this


    function getID(e) {
        targetID = e.target.id.replace('button', '');
    }

    document.querySelector('.container').addEventListener('mouseover', getID, false);
    document.querySelector('.container').addEventListener('focus', getID, true);




    if (todo[entry].items.length > 0) {
        for (let c = 0; c < todo[entry].items.length; c++) {

            let createLi = document.createElement('li');
            let textInput = document.createTextNode(todo[entry].items[c]);
            createLi.appendChild(textInput);
            document.getElementById('list' + targetID).appendChild(createLi);
            input.value = '';
            createLi.addEventListener("click", function () {
                if (createLi.style.textDecoration === 'line-through') {
                    createLi.style.textDecoration = '';
                } else {
                    createLi.style.textDecoration = 'line-through'
                }
            })

            createLi.addEventListener("dblclick", function () {
                createLi.remove();
            })

        }









    }

    function createNewTask(text) {





        let currentList = todo.filter(function (item) {
            return item.id === +targetID;
        });


        currentList[0].items.push(text);




        let createLi = document.createElement('li');
        let textInput = document.createTextNode(text);
        createLi.appendChild(textInput);
        document.getElementById('list' + targetID).appendChild(createLi);
        input.value = '';
        createLi.addEventListener("click", function () {
            if (createLi.style.textDecoration === 'line-through') {
                createLi.style.textDecoration = '';
            } else {
                createLi.style.textDecoration = 'line-through'
            }
        })

        createLi.addEventListener("dblclick", function () {
            createLi.remove();
        })

    }











    if (listCounter > todo.length) {

        todo.push({
            id: listCounter,
            name: taskListName,
            items: []
        })
    }

    let todoJSON = JSON.stringify(todo);
    localStorage.setItem('todolist', todoJSON)


}