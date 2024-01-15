"use strict";
document.addEventListener("DOMContentLoaded", function () {
  // Selectors
  const userDayInput = document.getElementById("userDay");
  const userMonthInput = document.getElementById("userMonth");
  const userYearInput = document.getElementById("userYear");
  const arrowBtn = document.querySelector(".arrow__btn");
  const errMessages = document.querySelectorAll(".error__message");
  const errorYear = document.getElementById("yearError");
  const errorMonth = document.getElementById("monthError");
  const errorDay = document.getElementById("dayError");

  const labels = document.querySelectorAll("label");
  const inputs = document.querySelectorAll(".inputs");

  // Functions & Events
  arrowBtn.addEventListener("click", function (event) {
    event.preventDefault();
    validateInputs();
  });

  function validateInputs() {
    const valueRequired = "This field is required";
    const validDayTxt = "Must be a valid day";
    const validMonthTxt = "Must be a valid month";
    const validYearTxt = "Must be in the past";

    function showError(element, message) {
      element.style.opacity = 1;
      element.innerHTML = message;
      labels.forEach((label) => (label.style.color = "hsl(0, 100%, 67%)"));
      inputs.forEach(
        (input) => (input.style.borderColor = "hsl(0, 100%, 67%)")
      );
    }

    function resetErrors() {
      errMessages.forEach((err) => {
        err.style.opacity = 0;
        err.innerHTML = "";
        labels.forEach((label) => (label.style.color = ""));
        inputs.forEach((input) => (input.style.borderColor = ""));
      });
    }

    const day = parseInt(userDayInput.value.trim());
    const month = parseInt(userMonthInput.value.trim());
    const year = parseInt(userYearInput.value.trim());

    resetErrors();

    if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
      if (!day) showError(errorDay, valueRequired);
      if (!month) showError(errorMonth, valueRequired);
      if (!year) showError(errorYear, valueRequired);

      return;
    }

    if (!(1 <= day && day <= 31)) {
      showError(errorDay, validDayTxt);
    } else if (!(1 <= month && month <= 12)) {
      showError(errorMonth, validMonthTxt);
    } else if (!(1900 <= year && year <= new Date().getFullYear())) {
      showError(errorYear, validYearTxt);
    } else {
      resetErrors();

      const currentDate = new Date();
      const birthDate = new Date(year, month - 1, day);
      const timeDifference = currentDate - birthDate;
      const seconds = timeDifference / 1000;
      let days = Math.floor(
        (seconds % (30.44 * 24 * 60 * 60)) / (24 * 60 * 60)
      );
      let months = Math.floor(
        (seconds % (365.25 * 24 * 60 * 60)) / (30.44 * 24 * 60 * 60)
      );
      let years = Math.floor(seconds / (365.25 * 24 * 60 * 60));

      if (months === 0) {
        months++;
      }

      document.querySelector(".years__sp").textContent = years;
      document.querySelector(".months__sp").textContent = months;
      document.querySelector(".days__sp").textContent = days + 1;
    }
  }
});
