let displayValue = "0";
let lastOperand = null;
let lastOperator = null;
const buttons = document.querySelectorAll("button");

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return Math.round(x * y * 10000) / 10000;
}

function divide(x, y) {
  if (y === 0) {
    alert("Can't divide by 0!");
    return x;
  }
  return Math.round(x / y * 10000) / 10000;
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
  if (displayValue.length > 12) {
      display.style.fontSize = `${72 / displayValue.length}em`;
  } else {
    display.style.fontSize = "6em";
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

      case "delete":
        deleteDigit();
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
      
      case "decimal":
        inputDecimal();
        updateDisplay();
        break;
    }
  });
}

function inputDigit(digit) {
  if (lastOperator == null) {
    if (displayValue === "0") {
      displayValue = digit;
    } else {
      displayValue += digit;
    }
  } else if (lastOperand == null) {
    lastOperand = displayValue;
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
  if (lastOperand == null) {
    lastOperator = operator;
  } else {
    equals();
    lastOperator = operator;
  }
}

function inputDecimal() {
  if (!(displayValue.split("").includes("."))) {
    displayValue += ".";
  }
}

function clear() {
  displayValue = "0";
  lastOperand = null;
  lastOperator = null;
}

function deleteDigit() {
  if (!(displayValue === "0")) {
    displayValue = displayValue.substring(0, displayValue.length - 1);
    if (displayValue === "") {
      displayValue = "0";
    }
  }
}

function equals() {
  if (lastOperator == null) {
    return;
  } else {
    let result = operate(lastOperator, +lastOperand, +displayValue);
    lastOperand = null;
    lastOperator = null;
    displayValue = String(result);
  }
}