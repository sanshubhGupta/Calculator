let num1 = 0;
let num2 = 0;
let flag = 0;
//flag = 0 represents that operator not entered, i.e, only one number on display
let checkIfNum2Entered = 0;
//checkIfNum2Entered = 0 represents that num2 has not been started entering, operator may have been entered
let decimal = 0;
let ans = 0;
let operator = '';
let displayText = "0";

let display = document.querySelector('.display');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let equals = document.querySelector('.equals');
let clearAll = document.querySelector('.clear');
let del = document.querySelector('.del');
display.innerHTML = displayText;

//functions to perform specific operations
function add(num1, num2){
    let ans = parseFloat(num1) + parseFloat(num2);
    operator = '';
    return ans;
}
function subtract(num1, num2){
    operator = '';
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2){
    if(checkIfNum2Entered == 0){
        return num1;
    }
    operator = '';
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2){
    if(num2 == 0 && checkIfNum2Entered!=0){
        alert("Don't you know division by 0 is forbidden???");
        operator = '';
        return num1;
    }
    operator = '';
    return parseFloat(num1) / parseFloat(num2);
}

//function for general operation
function operate(num1, num2, operator){
    if(checkIfNum2Entered == 0){
        return num1;
    }
    if(operator == '+'){
        let sum = add(num1, num2);
        return sum;
    }
    else if(operator == '-'){
        let difference = subtract(num1, num2);
        return difference;
    }
    else if(operator == '*'){
        let product = multiply(num1, num2);
        return product;
    }
    else if(operator == '/'){
        let division = divide(num1, num2);
        return division;
    }
}

//Event listeners for buttons

numbers.forEach(number=>{
    number.addEventListener('click', function(){
        let num = number.textContent;
        if(num == '.' && decimal == 0 || num != '.'){
            displayText = (displayText!=0) ? displayText + num : num;
            display.innerHTML = displayText;
        }
        if(num == '.'){
            if(decimal == 0){
                decimal++;
            }
        }
        else if(decimal > 0){
            if(flag == 0){
                num = num/(10**decimal);
                decimal++;
                num1 = parseFloat(num1) + parseFloat(num);
            }
            else{
                num = num/(10**decimal);
                decimal++;
                num2 = parseFloat(num2) + parseFloat(num);
                checkIfNum2Entered = 1;
            }
        }
        else{
            if(flag == 0){
                num1 = (num1*10) + parseFloat(num);
            }
            else{
                num2 = (num2*10) + parseFloat(num);
                checkIfNum2Entered = 1;
            }
        }
    });
});

operators.forEach(oper=>{
    oper.addEventListener('click', function(){
        if(flag == 0){
            operator = oper.textContent;
            displayText += ` ${operator} `;
            display.innerHTML = displayText;
            flag = 1;
            decimal = 0;
        }
        else{
            num1 = operate(num1, num2, operator);
            num1 = Number.isInteger(num1) ? num1 : num1.toFixed(3);
            operator = oper.textContent;
            displayText = `${num1} ${operator} `;
            display.innerHTML = displayText;
            num2 = 0;
        }
    });  
});

equals.addEventListener('click', function(){
    flag = 0;
    console.log(num1);
    console.log(num2);
    if(operator!=''){
        num1 = operate(num1, num2, operator);
        console.log(num1);
    }
    num1 = Number.isInteger(num1) ? num1 : num1.toFixed(4);
    decimal = Number.isInteger(num1) ? 0 : 4;
    displayText = `${num1}`;
    display.innerHTML = displayText;
    checkIfNum2Entered = 0;
    num2 = 0;
});

clearAll.addEventListener('click', function(){
    num1 = 0;
    num2 = 0;
    flag = 0;
    checkIfNum2Entered = 0;
    ans = 0;
    operator = '';
    displayText = "0";
    display.innerHTML = displayText;
    decimal = 0;
});

del.addEventListener('click', function(){
    if(flag == 0){
        if(decimal == 0){
            num1 = (num1 - num1 % 10) / 10;
            displayText = displayText.substring(0, displayText.length - 1);
            display.innerHTML = displayText;
            if(num1 == 0){
                num1 = 0;
                num2 = 0;
                flag = 0;
                checkIfNum2Entered = 0;
                ans = 0;
                operator = '';
                displayText = "0";
                display.innerHTML = displayText;
            }
        }
        //for deletion of numbers after decimal
        else if(displayText[displayText.length - 1] != '.'){
            let dig = parseInt(displayText[displayText.length - 1]);
            displayText = displayText.substring(0, displayText.length - 1);
            display.innerHTML = displayText;
            num1 -= dig/(10 ** (decimal - 1));
            num1 = num1.toFixed(decimal - 1);
            decimal--;
        }
        //for deletion of decimal point
        else{
            displayText = displayText.substring(0, displayText.length - 1);
            display.innerHTML = displayText;
            num1 = parseInt(num1);
            decimal--;
        }
        console.log(num1);
        console.log(decimal);
    }
    else{
        let check1 = displayText[displayText.length - 2];//to check if the last char is operator
        let check2 = displayText[displayText.length - 3];//to check if 2nd last operator is operator, or only one dig num left in num2
        if(decimal ==  0){
            if(!isNaN(check1)){
                num2 = (num2 - num2 % 10) / 10;
                displayText = displayText.substring(0, displayText.length - 1);
                display.innerHTML = displayText;
                if(isNaN(check2)){
                    checkIfNum2Entered = 0;
                }
            }
            else{
                flag = 0;
                operator = '';
                displayText = displayText.substring(0, displayText.length - 3);
                display.innerHTML = displayText;
            }
        }
        //for deletion of numbers after decimal
        else if(displayText[displayText.length - 1] != '.'){
            let dig = parseInt(displayText[displayText.length - 1]);
            displayText = displayText.substring(0, displayText.length - 1);
            display.innerHTML = displayText;
            num2 -= dig/(10 ** (decimal - 1));
            num2 = num2.toFixed(decimal - 1);
            decimal--;
        }
        //for deletion of decimal point
        else{
            console.log('here');
            displayText = displayText.substring(0, displayText.length - 1);
            display.innerHTML = displayText;
            num2 = parseInt(num1);
            decimal--;
            if(isNaN(check2)){
                checkIfNum2Entered = 0;
            }
        }
        console.log(num2);
        console.log(decimal);
    }
});




//Event listener for keyboard
document.addEventListener('keydown', function (event) {
    const key = event.key;
    if(!isNaN(key)){
        let num = key;
        if(flag == 0){
            num1 = (num1*10) + parseFloat(num);
        }
        else{
            num2 = (num2*10) + parseFloat(num);
            checkIfNum2Entered = 1;
        }
        displayText = (displayText!=0) ? displayText + num : num;
        display.innerHTML = displayText;
    }
    if(key == '+' || key == '-' || key == '*' || key == '/'){
        if(flag == 0){
            operator = key;
            displayText += ` ${operator} `;
            display.innerHTML = displayText;
            flag = 1;
        }
        else{
            num1 = operate(num1, num2, operator);
            num1 = Number.isInteger(num1) ? num1 : num1.toFixed(3);
            operator = key;
            displayText = `${num1} ${operator} `;
            display.innerHTML = displayText;
            num2 = 0;
        }
    }
    if(key == '=' || key == 'Enter'){
        flag = 0;
        if(operator!=''){
            num1 = operate(num1, num2, operator);
        }
        num1 = Number.isInteger(num1) ? num1 : num1.toFixed(3);
        displayText = `${num1}`;
        display.innerHTML = displayText;
        num2 = 0;
    }
    if(key == 'Delete'){
        num1 = 0;
        num2 = 0;
        operator;
        displayText = "0";
        display.innerHTML = displayText;
        flag = 0;
        checkIfNum2Entered = 0;
    }
    if(key == 'Backspace'){
        if(flag == 0){
            num1 = (num1 - num1 % 10) / 10;
            displayText = displayText.substring(0, displayText.length - 1);
            display.innerHTML = displayText;
            if(num1 == 0){
                num1 = 0;
                num2 = 0;
                flag = 0;
                checkIfNum2Entered = 0;
                ans = 0;
                operator = '';
                displayText = "0";
                display.innerHTML = displayText;
            }
        }
        else{
            let check1 = displayText[displayText.length - 2];//to check if the last char is operator
            let check2 = displayText[displayText.length - 3];//to check if 2nd last operator is operator, or only one dig num left in num2
            if(!isNaN(check1)){
                num2 = (num2 - num2 % 10) / 10;
                displayText = displayText.substring(0, displayText.length - 1);
                display.innerHTML = displayText;
                if(isNaN(check2)){
                    checkIfNum2Entered = 0;
                }
            }
            else{
                flag = 0;
                operator = '';
                displayText = displayText.substring(0, displayText.length - 3);
                display.innerHTML = displayText;
            }
        }
    }
});