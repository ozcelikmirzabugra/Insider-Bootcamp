let countdown;
let countdownValue;

document.getElementById("startBtn").addEventListener("click", function () {
  const inputValue = document.getElementById("countdownInput").value;
  countdownValue = parseInt(inputValue);
  if (isNaN(countdownValue) || countdownValue <= 0) {
    alert("Lütfen geçerli bir sayı girin.");
    return;
  }

  clearInterval(countdown);
  countdown = setInterval(updateCountdown, 1000);
});

function updateCountdown() {
  if (countdownValue > 0) {
    document.getElementById("timerDisplay").textContent = countdownValue;
    countdownValue--;
  } else {
    document.getElementById("timerDisplay").textContent = "Süre doldu!";
    clearInterval(countdown);
  }
}

document.getElementById("resetBtn").addEventListener("click", function () {
  clearInterval(countdown);
  document.getElementById("timerDisplay").textContent = "0";
});
