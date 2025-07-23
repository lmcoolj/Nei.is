
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");
  form.addEventListener("submit", handleFormSubmit);
});

function handleFormSubmit(event) {
  event.preventDefault();

  const email = getInputValue(".Email-place");
  const password = getInputValue(".Password-place");
  const dob = getInputValue(".DOB-place");

  if (isFormValid(email, password, dob)) {
    goToHomePage();
  } else {
    showError();
  }
}

function getInputValue(selector) {
  const input = document.querySelector(selector);
  return input ? input.value.trim() : "";
}

function isFormValid(email, password, dob) {
  return email !== "" && password !== "" && dob !== "";
}

function goToHomePage() {
  window.location.href = "home.html";
}

function showError() {
  alert("Please fill out all fields before signing up.");
}
