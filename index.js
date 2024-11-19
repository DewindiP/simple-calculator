const display = document.getElementById("display");
const historyModal = document.getElementById("historyModal");
const historyRows = document.getElementById("historyRows");
let history = [];
let shouldClearDisplay = false;

function appendToDisplay(input) {
    if (shouldClearDisplay) {
        display.value = "";
        shouldClearDisplay = false; // Reset the flag
    }
    
    display.value += input;
}

function clearDisplay() {
    display.value = "";
    shouldClearDisplay = false;
}

function calculate() {
    try {
        const expression = display.value;
        const result = eval(expression);
        const historyEntry = `${expression} = ${result}`;
        
        history.push(historyEntry);
        
        display.value = `${expression} = ${result}`;
        
        shouldClearDisplay = true;
    } catch (error) {
        display.value = "Error";
        shouldClearDisplay = true;
    }
}

// Shows the history in the modal popup
function showHistory() {
    historyModal.style.display = historyModal.style.display === "none" ? "block" : "none";
    
    if (historyModal.style.display === "block") {
        historyRows.innerHTML = ""; 

        if (history.length === 0) {
            const noHistoryMessage = document.createElement("div");
            noHistoryMessage.textContent = "No history available.";
            historyRows.appendChild(noHistoryMessage);
        } else {
            history.forEach(entry => {
                const historyRow = document.createElement("div");
                historyRow.textContent = entry;
                historyRow.classList.add("history-row"); // Optional styling
                historyRows.appendChild(historyRow);
            });
        }
    }
}

// Closes the history
function closeHistory() {
    historyModal.style.display = "none";
}

// Adds a backspace remove the last character
function backspace() {
    display.value = display.value.slice(0, -1);
}