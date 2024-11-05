
  // Select the screen element to display values
  const screen = document.getElementById("screen");

  // Initialize variables to store numbers and operator
  let currentInput = "0";
  let firstOperand = null;
  let secondOperand = false;
  let operator = null;

  // Function to update the screen
  function updateScreen() {
    screen.value = currentInput;
  }

  // Function to handle number inputs
  function inputNumber(number) {
    if (secondOperand) {
      currentInput = number;
      secondOperand = false;
    } else {
      currentInput = currentInput === "0" ? number : currentInput + number;
    }
  }

  // Function to handle operator inputs
  function inputOperator(op) {
    if (operator && secondOperand) {
      operator = op;
      return;
    }

    if (firstOperand === null) {
      firstOperand = parseFloat(currentInput);
    } else if (operator) {
      const result = calculate(firstOperand, parseFloat(currentInput), operator);
      currentInput = `${parseFloat(result.toFixed(7))}`;
      firstOperand = result;
    }

    secondOperand = true;
    operator = op;
  }

  // Function to calculate based on operator
  function calculate(first, second, operator) {
    if (operator === "+") return first + second;
    if (operator === "-") return first - second;
    if (operator === "×") return first * second;
    if (operator === "÷") return first / second;
    return second;
  }

  // Function to handle decimal input
  function inputDecimal() {
    if (!currentInput.includes(".")) {
      currentInput += ".";
    }
  }

  // Function to handle all-clear (AC) button
  function resetCalculator() {
    currentInput = "0";
    firstOperand = null;
    secondOperand = false;
    operator = null;
  }

  // Function to handle +/- button
  function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
  }

  // Function to handle percentage button
  function inputPercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
  }

  // Event listeners for each button
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const value = event.target.textContent;

      if (!isNaN(value)) {
        inputNumber(value);
      } else if (value === "AC") {
        resetCalculator();
      } else if (value === "+/-") {
        toggleSign();
      } else if (value === "%") {
        inputPercentage();
      } else if (value === ".") {
        inputDecimal();
      } else if (value === "=") {
        if (operator && !secondOperand) {
          currentInput = `${parseFloat(
            calculate(firstOperand, parseFloat(currentInput), operator).toFixed(7)
          )}`;
          operator = null;
          firstOperand = null;
        }
      } else {
        inputOperator(value);
      }

      updateScreen();
    });
  });

  updateScreen();
