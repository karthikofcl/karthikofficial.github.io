let outputScreen = document.getElementById("outputScreen");
let isScientificMode = false;
let sciButton = document.getElementById("shiftButton");
let scientificButtons = document.getElementById("scientificButtons"); // Add this line

function display(num) {
  outputScreen.value += num;
}

function calculate() {
  try {
    outputScreen.value = eval(outputScreen.value);
  } catch (err) {
    alert("Invalid input!");
  }
}

function clearInput() {
  outputScreen.value = "";
}

function del() {
  outputScreen.value = outputScreen.value.slice(0, -1);
}

function switchToScientificMode() {
  isScientificMode = !isScientificMode;
  if (isScientificMode) {
    document.querySelector(".calculator").style.gridTemplateColumns = "repeat(6, 69px)";
    document.querySelector("#outputScreen").style.gridColumn = "span 6";
    document.querySelector("#outputScreen").style.width = "360px";
    scientificButtons.style.display = "grid"; // Display scientific buttons
    sciButton.textContent = "Cal";
  } else {
    document.querySelector(".calculator").style.gridTemplateColumns = "repeat(4, 69px)";
    document.querySelector("#outputScreen").style.gridColumn = "span 4";
    document.querySelector("#outputScreen").style.width = "250px";
    scientificButtons.style.display = "none"; // Hide scientific buttons
    sciButton.textContent = "Sci";
  }
}

function squareRoot() {
  outputScreen.value = Math.sqrt(eval(outputScreen.value));
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function sine() {
  outputScreen.value = Math.sin(degreesToRadians(eval(outputScreen.value)));
}

function cosine() {
  outputScreen.value = Math.cos(degreesToRadians(eval(outputScreen.value)));
}

function tangent() {
  let inputValue = eval(outputScreen.value);
  if (isScientificMode) {
    inputValue = degreesToRadians(inputValue);
  }
  
  // Check if the angle is a multiple of 90 degrees
  if (Math.abs(inputValue) % (Math.PI / 2) === 0) {
    outputScreen.value = "Infinity";
  } else {
    outputScreen.value = Math.tan(inputValue);
  }
}
function logarithm() {
  outputScreen.value = Math.log10(eval(outputScreen.value));
}
