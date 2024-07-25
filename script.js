class Calculator {
    constructor(prevDisplayElement, currDisplayElement) {
        this.prevDisplayElement = prevDisplayElement;
        this.currDisplayElement = currDisplayElement;
        this.clear();
    }

    clear() {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currOperand === '') return;
        if (this.prevOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    updateDisplay() {
        this.currDisplayElement.innerText = this.currOperand;
        if (this.operation != null) {
            this.prevDisplayElement.innerText = `${this.prevOperand} ${this.operation}`;
        } else {
            this.prevDisplayElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equal');
const deleteButton = document.querySelector('.delete');
const allClearButton = document.querySelector('.clear');
const prevDisplayElement = document.querySelector('.prev-display');
const currDisplayElement = document.querySelector('.curr-display');

const calculator = new Calculator(prevDisplayElement, currDisplayElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
