let displayValue = "0";
let firstOperand = null;
let firstOperator = null;
const buttons = document.querySelectorAll("button");

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x, y) {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
  }
}

function updateDisplay() {
  const display = document.getElementById('display');
  display.textContent = displayValue;
  if(displayValue.length > 10) {
      display.textContent = displayValue.substring(0, 10);
  }
}

for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  button.addEventListener("click", () => {
    switch (button.className) {
      case "digit":
        inputDigit(button.value);
        updateDisplay();
        break;

      case "clear":
        clear();
        updateDisplay();
        break;

      case "operator":
        inputOperator(button.value);
        updateDisplay();
        break;

      case "equals":
        equals();
        updateDisplay();
        break;
    }
  });
}

function inputDigit(digit) {
  if (firstOperator == null) {
    if (displayValue === "0") {
      displayValue = digit;
    } else {
      displayValue += digit;
    }
  } else if (firstOperand == null) {
    firstOperand = displayValue;
    displayValue = digit;
  } else {
    if (displayValue === "0") {
      displayValue = digit;
    } else {
      displayValue += digit;
    }
  }
}

function inputOperator(operator) {
  if (firstOperand == null) {
    firstOperator = operator;
  } else {
    equals();
    firstOperator = operator;
  }
}

function clear() {
  displayValue = "0";
  firstOperand = null;
  firstOperator = null;
}

function equals() {
  if (firstOperator == null) {
    return;
  } else {
    let result = operate(firstOperator, +firstOperand, +displayValue);
    firstOperand = null;
    displayValue = String(result);
  }
}