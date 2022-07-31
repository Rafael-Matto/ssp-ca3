"use strict";
// Dom elements
const form = document.querySelector("form");
const jobTitle = document.querySelector("#jobTitle");
const jobType = document.querySelector("#jobType");
const loc = document.querySelector("#loc");
const salary = document.querySelector("#salary");
const years = document.querySelector("#years");
const cName = document.querySelector("#cName");
const email = document.querySelector("#email");
const description = document.querySelector("#description");

// Event listener to submit form
form.addEventListener("submit", (e) => {
  if (handleInput()) {
    form.submit();
  } else {
    e.preventDefault();
  }
});

// What to do with inputs ?
function handleInput() {
  // Values from dom elements ( input )
  const jobTitleValue = jobTitle.value.trim();
  const jobTypeValue = jobType.value.trim();
  const locationValue = loc.value.trim();
  const salaryValue = salary.value.trim();
  const yearsValue = years.value.trim();
  const cNameValue = cName.value.trim();
  const emailValue = email.value.trim();
  const descriptionValue = description.value.trim();

  //  Checking for jobTitle
  if (jobTitleValue === "") {
    setErrorFor(jobTitle, "Job Title cannot be blank");
    return false;
  } else {
    setSuccessFor(jobTitle);
  }

  //  Checking for jobType
  if (jobTypeValue === "") {
    setErrorFor(jobType, "Job Type cannot be blank");
    return false;
  } else {
    setSuccessFor(jobType);
  }

  //  Checking for loc
  if (locationValue === "") {
    setErrorFor(loc, "Location cannot be blank");
    return false;
  } else {
    setSuccessFor(loc);
  }

  //  Checking for salary
  if (salaryValue === "") {
    setErrorFor(salary, "Salary cannot be blank");
    return false;
  } else if (salaryValue < 500) {
    setErrorFor(salary, "Salary must be greater than 500$");
    return false;
  } else {
    setSuccessFor(salary);
  }

  //  Checking for years
  if (yearsValue === "") {
    setErrorFor(years, "Years cannot be blank");
    return false;
  } else if (yearsValue <= 0) {
    setErrorFor(years, "Year must be greater than 0");
    return false;
  } else {
    setSuccessFor(years);
  }

  //  Checking for cName
  if (cNameValue === "") {
    setErrorFor(cName, "Company name cannot be blank");
    return false;
  } else {
    setSuccessFor(cName);
  }

  // Checking for email
  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
    return false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
    return false;
  } else {
    setSuccessFor(email);
  }

  //  Checking for description
  if (descriptionValue === "") {
    setErrorFor(description, "Description cannot be blank");
    return false;
  } else {
    setSuccessFor(description);
  }

  return true;
}

// If there is some error, than what we want to do with input ?
function setErrorFor(input, message) {
  let formControl = input.parentElement;
  formControl.className = "form-group app-label mt-2 error1";
  let small = formControl.querySelector("small");
  small.innerText = message;
}

// If there is no error, than what we want to do with input ?
function setSuccessFor(input) {
  let formControl = input.parentElement;
  formControl.className = "form-group app-label mt-2 success";
}

// To check if email is valid or not ?
function isEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
