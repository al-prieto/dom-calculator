let currentInput = null;
let storedNumber = null;
let selectedOperator = null;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "CANNOT DIVIDE BY 0";
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);

    default:
      return "ERROR";
  }
}

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const display = document.querySelector("#display");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.value === "." && currentInput.includes(".")) {
      return;
    } else if (!currentInput || currentInput === "0") {
      currentInput = button.value;
    } else {
      currentInput += button.value;
    }
    display.textContent = currentInput;
    console.log("Current Input:", currentInput);
  });
});

function handleNumberInput(value) {
  if (value === "." && currentInput.includes(".")) {
    return;
  } else if (!currentInput || currentInput === "0") {
    currentInput = value;
  } else {
    currentInput += value;
  }
  display.textContent = currentInput;
  console.log("Current Input:", currentInput);
}

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (storedNumber && currentInput && selectedOperator) {
      storedNumber = operate(
        selectedOperator,
        Number(storedNumber),
        Number(currentInput)
      );
      display.textContent = storedNumber;
      currentInput = null;
    } else if (!storedNumber) {
      storedNumber = currentInput;
      currentInput = null;
    }
    selectedOperator = button.value;
    console.log("Operator selected: ", selectedOperator);
  });
});

equals.addEventListener("click", () => {
  if (!storedNumber || !currentInput || !selectedOperator) {
    display.textContent = "ERROR ayayai";
    return;
  }
  display.textContent = operate(
    selectedOperator,
    Number(storedNumber),
    Number(currentInput)
  );

  storedNumber = display.textContent;
  currentInput = null;
  selectedOperator = null;
});

clear.addEventListener("click", () => {
  storedNumber = null;
  currentInput = null;
  selectedOperator = null;
  display.textContent = "0";
});

backspace.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1) || "0";
  display.textContent = currentInput;
});

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    handleNumberInput(e.key);
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    operatorButtons.forEach((button) => {
      if (button.value === e.key) button.click();
    });
  } else if (e.key === ".") {
    handleNumberInput(e.key);
  } else if (e.key === "Enter") {
    equals.click();
  } else if (e.key === "Backspace") {
    backspace.click();
  } else if (e.key === "Escape") {
    clear.click();
  }
});
