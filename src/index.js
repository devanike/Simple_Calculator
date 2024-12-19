"use strict";
/*
    - display: The display screen element
    - inputValue: The current input value as a string
    */
const calculatorState = {
    display: document.getElementById('display'),
    inputValue: '0',
};
// updates the display with the current input value
const updateDisplay = () => {
    if (calculatorState.display) {
        calculatorState.display.textContent = calculatorState.inputValue;
    }
};
// Clears the display and updates it with 0
const clear = () => {
    calculatorState.inputValue = '0';
    updateDisplay();
};
// Removes the last character from the display
const backspace = () => {
    calculatorState.inputValue =
        calculatorState.inputValue.length === 1
            ? '0'
            : calculatorState.inputValue.slice(0, -1);
    updateDisplay();
};
// adds a character to the display
const appendCharacter = (char) => {
    calculatorState.inputValue =
        calculatorState.inputValue === '0' && char !== '.'
            ? char
            : calculatorState.inputValue + char;
    updateDisplay();
};
// calculates the result of the expression in the display
const calculate = () => {
    try {
        // uses Function to evaluate the expression
        const result = new Function('return ' + calculatorState.inputValue)();
        calculatorState.inputValue = Number.isInteger(result)
            ? result.toString()
            : result.toFixed(2);
        updateDisplay();
    }
    catch (error) {
        calculatorState.inputValue = 'Error';
        updateDisplay();
        setTimeout(clear, 1000);
    }
};
// handles button clicks
const handleButtonClick = (event) => {
    const element = event.target;
    if (element.tagName === 'BUTTON') {
        const action = element.dataset.action;
        const value = element.dataset.value;
        if (action === 'clear') {
            clear();
        }
        else if (action === 'calculate') {
            calculate();
        }
        else if (action === 'backspace') {
            backspace();
        }
        else if (value) {
            appendCharacter(value);
        }
    }
};
// handles keyboard input
const handleKeydown = (event) => {
    const key = event.key;
    if (/[\d.\+\-\*\/\(\)]/.test(key)) { //ensures only the characters needed are processed
        event.preventDefault();
        appendCharacter(key);
    }
    else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    }
    else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    }
};
// event listeners for button clicks and keyboard input
const calculatorElement = document.querySelector('.calculator');
if (calculatorElement) {
    calculatorElement.addEventListener('click', handleButtonClick);
}
document.addEventListener('keydown', handleKeydown);
// void - function does not return a value. NOTED!
