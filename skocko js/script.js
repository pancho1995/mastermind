//------------------------------------------------GET FROM DOM------------------------------------------------//
const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e); 
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
    },
    //star
    star = {
        img: "star.png",
        element: document.querySelector('#star'),
        value: 6
    }
];
//--------------------------------------------------VARIABLES--------------------------------------------------//
const arrayOfSymbols = $$('.pictureElement'); //get all div objects of class pictureElement
const arrayOfResults = $$('.result');         //get all div objects of class result
const arrayOfPictures = $$('.imgClass');      //get all dom objects of class imgClass
const arrayOfBoxes = $$('.td');               //get all dom objects of class td
const btn_delete = $('#btn');                 //delete button

let row_counter = 1;                          //counter for rows
let column_counter = 0;                       //counter for cols 
let index_left = 0;                           //counter for left table 
let index_right = 0;                           //brojac za desnu tabelu
let hit_yellow = 0;                           //yellow hits counter
let hit_red = 0;                              //red hits counter
let combination_user = [];                    //users combination
//----------------------------------------------------DELETE---------------------------------------------------//
const deleteObject = function() {   
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
        case 24:
            return;
            break;
        default:
            //delete last added
            arrayOfBoxes[index_left-1].innerHTML = '';
            index_left--;
            break;
    }
}
//--------------------------------------------DROP RANDOM COMBINATION--------------------------------------------//
//drops random numbers between 1 and 5
const symbol_1 = objects[Math.floor(Math.random() * 6)];
const symbol_2 = objects[Math.floor(Math.random() * 6)];
const symbol_3 = objects[Math.floor(Math.random() * 6)];
const symbol_4 = objects[Math.floor(Math.random() * 6)];

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
                combination_user[column_counter] = getObject(element);
                column_counter++;

                //when user reach the end of array check result
                if (index_left !== 0 && index_left % 4 === 0) {
                    updateResult();
                    emptyArray(combination_user);
                    paint();  
                    combination_cpu = [symbol_1, symbol_2, symbol_3, symbol_4];
                    column_counter = 0;
                    row_counter++;
                    hit_yellow = 0;
                    hit_red = 0;
                }
                break;
            }
        }
    })
});

//------------------------------------------------EMPTY AN ARRAY----------------------------------------------//
const emptyArray = function(array) {
    for (let index = array.length; index >= 0; index--) {
        array.splice(index, 1);
    }
}
//--------------------------------------------GET VALUE FROM ELEMENT------------------------------------------//
const getObject = function(element) {
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
        case 'star':
            return objects[5]
            break;
        default:
            return -1;
            break;
    }
}
//-----------------------------------------------DELETE BUTTON------------------------------------------------//
btn_delete.addEventListener('click', deleteObject); 
//can call like this deleteObject as it is defined as method without arrow function
//-----------------------------------------------CALCULATE HITS-----------------------------------------------//
const calculate = function(){
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
}
//------------------------------------------------UPDATE RESULTS----------------------------------------------//
const updateResult = function() {
    calculate();
}
//-------------------------------------------------GAME WIN/OVER----------------------------------------------//

//--------------------------------------------------GAME RESET------------------------------------------------//
const resetGame = function() {
    
}
//----------------------------------------------------PAINT---------------------------------------------------//
const paint = function(){
    if(index_left !== 0 && index_left % 4 === 0){
        //check reds
        let i = 0;
        while(i < hit_red){
            arrayOfResults[index_right].style = "background-color: red";
            i++;
            index_right++;
        }
        //check yellows
        let j = 0;
        while(j < hit_yellow){
            arrayOfResults[index_right].style = "background-color: yellow";
            j++;
            index_right++
        }
        //check emptys
        let z = 0;
        while(z < 4 -(hit_yellow + hit_red)){
            index_right++;
            z++;
        }
    }
}



