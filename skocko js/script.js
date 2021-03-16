//----------------------------------------------ARRAY OF OBJECTS----------------------------------------------//

const objects = [
    //smiley
    smiley = {
        img: "smiley.png",
        element: document.querySelector('#smiley'),
        value: 1
    },
    //heart
    heart = {
        img: "heart.png",
        element: document.querySelector('#heart'),
        value: 2
    },
    //diamond
    diamond = {
        img: "diamond.png",
        element: document.querySelector('#diamond'),
        value: 3
    },
    //spade
    spade = {
        img: "spade.png",
        element: document.querySelector('#spade'),
        value: 4
    },
    //club
    club = {
        img: "clubs.png",
        element: document.querySelector('#clubs'),
        value: 5
    }
];

//--------------------------------------------------VARIABLES--------------------------------------------------//

//pokupi sve div elemente sa klasom '.pictureElement'
const arrayOfSymbols = document.querySelectorAll('.pictureElement');

//delete button
const btn = document.querySelector('#btn');

//pokupi sve elemente slike
const arrayOfPictures = document.querySelectorAll('.imgClass');

//pokupi sve div elemente sa klasom '.td'
const arrayOfBoxes = document.querySelectorAll('.td');

//counter for rows
let rowCounter = 1;

//counter for cols 
let columnCounter = 0;

//alfa i omega!!!
let index_left = 0;

//pokupi sve div elemente sa klasom result
const arrayOfResults = document.querySelectorAll('.result');

//brojac za desnu tabelu
let rightIndex = 0;

//count yellow hits
let hit_yellow = 0;

//count red hits
let hit_red = 0;

//users combination
let combination_user = [];


//----------------------------------------------------DELETE---------------------------------------------------//

const delete_object = () => {

    //prevent deleting after result check
    switch (index_left) {
        case 0:
            return;
            break;
        case 4:
            return;
            break;
        case 8:
            return;
            break;
        case 12:
            return;
            break;
        case 16:
            return;
            break;
        case 20:
            return;
            break;
        default:
            //delete last added
            arrayOfBoxes[index_left - 1].innerHTML = '';
            index_left--;
            break;
    }
}

//--------------------------------------------DROP RANDOM COMBINATION--------------------------------------------//

//drops random numbers between 1 and 5
const symbol_1 = objects[Math.floor(Math.random() * 5)];
const symbol_2 = objects[Math.floor(Math.random() * 5)];
const symbol_3 = objects[Math.floor(Math.random() * 5)];
const symbol_4 = objects[Math.floor(Math.random() * 5)];

//put those objects in array
const combination = [symbol_1, symbol_2, symbol_3, symbol_4];

//copy of combination array to modify
let combination_cpu = [symbol_1, symbol_2, symbol_3, symbol_4];

console.log(symbol_1.value + '-' + symbol_2.value + '-' + symbol_3.value + '-' + symbol_4.value + ' :CPU')

//--------------------------------------------------ADD ELEMENT--------------------------------------------------//

//go through elements of div-elements
arrayOfSymbols.forEach(element => {

    element.addEventListener('click', () => {

        for (let index = 0; index < arrayOfBoxes.length; index++) {
            //check if div is empty
            var stringFromHTML = arrayOfBoxes[index].innerHTML.trim();

            if (stringFromHTML == '') {
                //update objects picture in left table
                arrayOfBoxes[index].innerHTML = `${element.innerHTML}`;
                index_left++;

                //update user combination array
                combination_user[columnCounter] = getObject(element);
                columnCounter++;

                //when user reach the end of array check result
                if (index_left !== 0 && index_left % 4 === 0) {
                    updateResult();
                    emptyArray(combination_user);
                    combination_cpu = [symbol_1, symbol_2, symbol_3, symbol_4];
                    columnCounter = 0;
                    rowCounter++;
                    hit_yellow = 0;
                    hit_red = 0;
                }
                break;
            }
        }
    })
});

//------------------------------------------------EMPTY AN ARRAY----------------------------------------------//

const emptyArray = (array) => {
    for (let index = array.length; index >= 0; index--) {
        array.splice(index, 1);
    }
}

//-------------------------------------------GET VALUE FROM ELEMENT-------------------------------------------//

const getObject = (element) => {
    switch (element.id) {
        case 'smiley':
            return objects[0]
            break;
        case 'heart':
            return objects[1]
            break;
        case 'diamond':
            return objects[2]
            break;
        case 'spade':
            return objects[3]
            break;
        case 'clubs':
            return objects[4]
            break;
        default:
            return -1;
            break;
    }
}

//-------------------------------------------------DELETE BUTTON-------------------------------------------------//

btn.addEventListener('click', delete_object());

//-------------------------------------------------CALCULATE HITS------------------------------------------------//

const calculate = () => {
    //checking red hits
    for (let i = 0; i < combination_user.length; i++) {
        for (let j = 0; j < combination_cpu.length; j++) {
            //red hit
            if (i == j && combination_user[i] == combination_cpu[j]) {
                combination_cpu[j] = -1
                combination_user[i] = -1
                hit_red++;
                break;
            }

        }
    }
    //checking yellow hits
    for (let i = 0; i < combination_user.length; i++) {
        for (let j = 0; j < combination_cpu.length; j++) {
            //dont check red
            if (combination_cpu[j] != -1 && combination_user[i] != -1) {
                //yellow hit
                if (combination_cpu[j] === combination_user[i]) {
                    combination_cpu[j] = -1;
                    hit_yellow++;
                    break;
                }
            }
        }
    }

    console.log('red:' + hit_red)
    console.log('yellow:' + hit_yellow)
}

//-------------------------------------------------UPDATE RESULTS------------------------------------------------//
const updateResult = () => {
    calculate();
}


