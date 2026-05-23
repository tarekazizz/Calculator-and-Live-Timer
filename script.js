// ==================== Calculator ====================
const calcDisplay = document.getElementById("calcDisplay");
const operators = ["+", "-", "*", "/"];

function appendValue(value) {
  const current = calcDisplay.value;
  const lastChar = current.slice(-1);

  if (current === "Error") {
    calcDisplay.value = /[0-9.]/.test(value) ? value : "";
    return;
  }

  if (operators.includes(value)) {
    if (!current) return;

    if (operators.includes(lastChar)) {
      calcDisplay.value = current.slice(0, -1) + value;
      return;
    }
  }

  if (value === ".") {
    const parts = current.split(/[-+*/]/);
    const lastPart = parts[parts.length - 1];

    if (lastPart.includes(".")) return;

    if (!current || operators.includes(lastChar)) {
      calcDisplay.value += "0.";
      return;
    }
  }

  calcDisplay.value += value;
}

function clearDisplay() {
  calcDisplay.value = "";
}

function deleteLast() {
  if (calcDisplay.value === "Error") {
    calcDisplay.value = "";
    return;
  }

  calcDisplay.value = calcDisplay.value.slice(0, -1);
}

function calculateResult() {
  try {
    let expression = calcDisplay.value.trim();

    if (!expression) return;

    if (/[+\-*/.]$/.test(expression)) {
      expression = expression.slice(0, -1);
    }

    if (!expression) {
      calcDisplay.value = "";
      return;
    }

    const result = Function("return " + expression)();

    if (!Number.isFinite(result)) {
      calcDisplay.value = "Error";
      return;
    }

    calcDisplay.value = Number.isInteger(result)
      ? String(result)
      : String(Number(result.toFixed(10)));
  } catch {
    calcDisplay.value = "Error";
  }
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  const allowed = "0123456789+-*/.";

  if (allowed.includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

// ==================== Live Clock ====================
const liveClock = document.getElementById("liveClock");

function updateLiveClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  liveClock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateLiveClock, 1000);
updateLiveClock();

// ==================== Countdown Timer ====================
const timerDisplay = document.getElementById("timerDisplay");

let totalSeconds = 0;
let timerInterval = null;

function updateTimerDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  timerDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

function setTimer() {
  const minutes =
    parseInt(document.getElementById("minutesInput").value, 10) || 0;

  const seconds =
    parseInt(document.getElementById("secondsInput").value, 10) || 0;

  totalSeconds = Math.max(0, minutes * 60 + Math.min(seconds, 59));
  updateTimerDisplay();
}

function startTimer() {
  if (timerInterval !== null || totalSeconds <= 0) return;

  timerInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateTimerDisplay();
    }

    if (totalSeconds === 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Time is up!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  totalSeconds = 0;

  updateTimerDisplay();

  document.getElementById("minutesInput").value = "";
  document.getElementById("secondsInput").value = "";
}

updateTimerDisplay();