let currentStep = 1;

function showStep(step) {
    document.querySelectorAll(".step").forEach(s => s.classList.add("hidden"));
    document.querySelector(`.step-${step}`).classList.remove("hidden");

    // Update Progress Bar
    document.querySelectorAll(".step-circle").forEach((circle, index) => {
        if (index < step) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
    });
}

function nextStep(step) {
    if (validateStep(step)) {
        currentStep++;
        if (currentStep === 3) {
            showSummary();
        }
        showStep(currentStep);
    }
}

function prevStep(step) {
    currentStep--;
    showStep(currentStep);
}

function validateStep(step) {
    const fields = document.querySelectorAll(`.step-${step} input, .step-${step} select`);
    for (let field of fields) {
        if (!field.value) {
            alert(`${field.name} is required`);
            return false;
        }
        if (field.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value)) {
            alert("Invalid email format");
            return false;
        }
    }
    return true;
}

function showSummary() {
    const formData = new FormData(document.getElementById("multiStepForm"));
    let summaryText = "";
    for (let [key, value] of formData.entries()) {
        summaryText += `<strong>${key}:</strong> ${value}<br>`;
    }
    document.getElementById("summary").innerHTML = summaryText;
}