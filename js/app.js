/*jshint esversion: 6 */

let titleDiv = document.getElementById("title");
let formDiv = document.getElementById("form");
let dailyAverageWriting = document.getElementById("daily-average-writing");
let tBW = document.getElementById("tbw");
let multiplication = document.getElementById("multiplication");
let calculateButton = document.getElementById("calculate-button");
let hr = document.getElementById("hr");
let resultDiv = document.getElementById("result");
let resultYears = document.getElementById("result-years");
let popupWindow = document.getElementById("popup-window");
let popupWindowTop = document.getElementById("popup-window-top");
let popupWindowMessage = document.getElementById("popup-window-message");
let okButton = document.getElementById("ok-button");

function isValidInputs() {
    if (!dailyAverageWriting.value) {
        showPopupWindow("warning", "Nem adtad meg, hogy mennyi <br>a napi átlagos írás!<br>Ellenőrizd!");
        okButton.addEventListener("click", function () {
            hidePopupWindow("daily-average-writing");
        });
        return false;

    } else if (!tBW.value) {
        showPopupWindow("warning", "Nem adtad meg a gyártó által megadott írhatóságot!<br>Ellenőrizd!");
        okButton.addEventListener("click", function () {
            hidePopupWindow("tbw");
        });
        return false;

    } else if (!multiplication.value) {
        multiplication.value = "1";
    }

    // Change dots to commas
    if (String(dailyAverageWriting.value).includes(",")) {
        dailyAverageWriting.value = String(dailyAverageWriting.value).replace(",", ".");
    } else if (String(tBW.value).includes(",")) {
        tBW.value = String(tBW.value).replace(",", ".");
    } else if (String(multiplication.value).includes(",")) {
        multiplication.value = String(multiplication.value).replace(",", ".");
    }

    if (isNaN(dailyAverageWriting.value) || parseFloat(dailyAverageWriting.value) <= 0) {
        showPopupWindow("error", "Hibás az általad beírt napi átlagos írás értéke!<br>Ellenőrizd!");
        okButton.addEventListener("click", function () {
            hidePopupWindow("daily-average-writing");
        });
        return false;

    } else if (isNaN(tBW.value) || tBW.value === "0" || parseFloat(tBW.value) < 1) {
        showPopupWindow("error", "Hibás az általad beírt TBW értéke!<br>Ellenőrizd!");
        okButton.addEventListener("click", function () {
            hidePopupWindow("tbw");
        });
        return false;

    } else if (isNaN(multiplication.value) || parseFloat(multiplication.value) <= 0) {
        showPopupWindow("error", "Hibásan adtad meg azt, hogy hogyan számoljak a gyári értékkel! Ellenőrizd!");
        okButton.addEventListener("click", function () {
            hidePopupWindow("multiplication");
        });
        return false;
    }
    return true;
}

function calculate() {
    if (isValidInputs()) {
        let tBWFloat = parseFloat(tBW.value);
        let dailyAverageWritingFloat = parseFloat(dailyAverageWriting.value);
        let multiplicationFloat = parseFloat(multiplication.value);
        let result = (tBWFloat * 1024 / dailyAverageWritingFloat / 365 * multiplicationFloat).toFixed(2);

        if (result > 99999) {
            resultYears.textContent = "99999+";
        } else {
            resultYears.textContent = result;
        }

        resultDiv.style.visibility = "visible";
    }
}

function showPopupWindow(type, text) {
    titleDiv.style.opacity = 0.1;
    formDiv.style.opacity = 0.1;
    resultDiv.style.opacity = 0.1;
    hr.style.opacity = 0.1;
    popupWindow.style.visibility = "visible";
    dailyAverageWriting.disabled = true;
    tBW.disabled = true;
    multiplication.disabled = true;
    calculateButton.disabled = true;

    if (type === "warning") {
        popupWindowTop.textContent = "Figyelem!";
        popupWindow.classList.add("popup-window-warning");
        popupWindowMessage.classList.add("popup-window-message-warning");
        popupWindowTop.classList.add("popup-window-top-warning");
        okButton.classList.add("ok-button-warning");
    } else if (type == "error") {
        popupWindowTop.textContent = "Hiba!";
        popupWindow.classList.add("popup-window-error");
        popupWindowMessage.classList.add("popup-window-message-error");
        popupWindowTop.classList.add("popup-window-top-error");
        okButton.classList.add("ok-button-error");
    }

    popupWindowMessage.innerHTML = text;
}

function hidePopupWindow(focusItemId) {
    titleDiv.style.opacity = 1;
    formDiv.style.opacity = 1;
    resultDiv.style.opacity = 1;
    hr.style.opacity = 1;
    popupWindow.style.visibility = "hidden";
    formDiv.disabled = false;
    dailyAverageWriting.disabled = false;
    tBW.disabled = false;
    multiplication.disabled = false;
    calculateButton.disabled = false;
    popupWindow.classList.remove("popup-window-error");
    popupWindow.classList.remove("popup-window-warning");
    popupWindowMessage.classList.remove("popup-window-message-error");
    popupWindowMessage.classList.remove("popup-window-message-warning");
    popupWindowTop.classList.remove("popup-window-top-error");
    popupWindowTop.classList.remove("popup-window-top-warning");
    okButton.classList.remove("ok-button-error");
    okButton.classList.remove("ok-button-warning");
    document.getElementById(focusItemId).focus();
}

calculateButton.addEventListener("click", calculate);