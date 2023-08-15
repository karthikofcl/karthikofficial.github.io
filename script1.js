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

function cubeRoot() {
  outputScreen.value = Math.cbrt(eval(outputScreen.value));
}

function sine() {
  outputScreen.value = Math.sin(eval(outputScreen.value));
}

function cosine() {
  outputScreen.value = Math.cos(eval(outputScreen.value));
}

function tangent() {
  outputScreen.value = Math.tan(eval(outputScreen.value));
}

function logarithm() {
  outputScreen.value = Math.log10(eval(outputScreen.value));
}
