// script.js

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let displayValue = '';
let firstValue = '';
let operator = '';
let secondValue = '';
let result = '';

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const { target } = event;
        const { number } = target.dataset;
        const { operator: op } = target.dataset;

        if (number) {
            handleNumber(number);
        } else if (op) {
            handleOperator(op);
        } else if (target.id === 'clear') {
            clearDisplay();
        } else if (target.id === 'backspace') {
            handleBackspace();
        } else if (target.id === 'equals') {
            calculate();
        } else if (target.id === 'decimal') {
            handleDecimal();
        }
    });
});

function handleNumber(number) {
    if (result) {
        clearDisplay();
    }
    displayValue += number;
    updateDisplay();
}

function handleOperator(op) {
    if (displayValue && !operator) {
        firstValue = displayValue;
        operator = op;
        displayValue += ` ${operator} `;
        updateDisplay();
    } else if (operator && displayValue.split(' ').length < 3) {
        operator = op;
        displayValue = displayValue.slice(0, -2) + ` ${operator} `;
        updateDisplay();
    }
}

function clearDisplay() {
    displayValue = '';
    firstValue = '';
    operator = '';
    secondValue = '';
    result = '';
    updateDisplay();
}

function handleBackspace() {
    if (displayValue) {
        if (displayValue.endsWith(' ')) {
            displayValue = displayValue.slice(0, -3);
        } else {
            displayValue = displayValue.slice(0, -1);
        }
        updateDisplay();
    }
}

function handleDecimal() {
    if (operator) {
        const parts = displayValue.split(' ');
        if (!parts[2].includes('.')) {
            displayValue += '.';
            updateDisplay();
        }
    } else {
        if (!displayValue.includes('.')) {
            displayValue += '.';
            updateDisplay();
        }
    }
}

function calculate() {
    const parts = displayValue.split(' ');
    if (parts.length === 3) {
        firstValue = parts[0];
        operator = parts[1];
        secondValue = parts[2];
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(secondValue);

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }

        displayValue = result.toString();
        updateDisplay();
        operator = '';
        firstValue = '';
        secondValue = '';
    }
}

function updateDisplay() {
    display.textContent = displayValue;
}
