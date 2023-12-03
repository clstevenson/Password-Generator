// Assignment Code: button to generate password
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  /*
  * Prompt user for character types:
  * Include lowercase, uppercase, numeric, and/or special characters?
  * Ideally this is one dialog box with maybe checkboxes or other ways to indicate choice
  * But I think we need jQuery for that, .prompt won't do it, so I think we need a series of prompts
  * */

  var length = 0;
  var firstPrompt = true;

  // collect desired password length
  // re-prompt if necessary; allow user to cancel the process
  while (length < 8 || length > 128) {
    if (firstPrompt) {
      length = window.prompt("Length of password (8-128 chars)?");
      firstPrompt = false;
    } else {
      length = window.prompt("Please specify a length between 8 and 128 characters:");
    }
    if (length === null) {
      return null;
    }
  }

  // set initial values (all lowercase, no numeric, no special chars)
  var lowerChars = true;
  var upperChars = false;
  var numericChars = false;
  var specialChars = false;

  // prompt for user choices, showing the default values
  answer = window.prompt("Include lowercase characters? Y/N", "Y").toUpperCase();
  if (answer === null) {
    return null;
  } else if (answer !== "Y") {
    lowerChars = false;
  }
  answer = window.prompt("Include uppercase characters? Y/N", "N").toUpperCase();
  if (answer === null) {
    return null;
  } else if (answer !== "N") {
    upperChars = true;
  }
  answer = window.prompt("Include numeric characters? Y/N", "N").toUpperCase();
  if (answer === null) {
    return null;
  } else if (answer !== "N") {
    numericChars = true;
  }
  answer = window.prompt("Include special characters? Y/N", "N").toUpperCase();
  if (answer === null) {
    return null;
  } else if (answer !== "N") {
    specialChars = true;
  }

  // TODO: check if the user selects NO options, which isn't allowed

  // After collecting information, confirm the user's choices.
  // If OK then generate password, otherwise quit
  answer = window.prompt("You selected length: " + length +
    "\nLowercase characters: " + lowerChars +
    "\nUppercase characters: " + upperChars +
    "\nNumeric characters: " + numericChars +
    "\nSpecial characters: " + specialChars +
    "\nContinue? (Y/N)", "Y").toUpperCase();
  if (answer == null || answer === "N") {
    return null;
  }

  // the generatePassword function will return the password that meets the criteria
  // the critera are passed as arguments to the function
  var password = generatePassword(length, lowerChars, upperChars, numericChars, specialChars);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

  return true;    // to verify function reaches end
}

// generatePassword returns a password that meets user-selected criteria (passed as arguments)
function generatePassword(length, lowerChars, upperChars, numericChars, specialChars) {
  var password = "";

  // generate strings of lowercase, uppercase, numeric, and special characters
  const special = ' !\"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~';
  const letters = 'abcsdefhijklmnopqrstuvwxyz';
  const upper = letters.toUpperCase();
  const numbers = '0123456789';
  var comboString = "";
  var randomIndex;

  // randomly choose from each string the correct number of values
  // need to leave enough room for each type

  // randomly add one of each of the character types that was requested

  // then for the remaining characters, randomly choose from any of them
  if (lowerChars) {
    randomIndex = randomInteger(letters.length);
    password = password + letters.substring(randomIndex, randomIndex + 1);
    comboString = letters;
  }
  if (upperChars) {
    randomIndex = randomInteger(upper.length);
    password = password + upper.substring(randomIndex, randomIndex + 1);
    comboString = comboString + upper;
  }
  if (numericChars) {
    randomIndex = randomInteger(numbers.length);
    password = password + numbers.substring(randomIndex, randomIndex + 1);
    comboString = comboString + numbers;
  }
  if (specialChars) {
    randomIndex = randomInteger(special.length);
    password = password + special.substring(randomIndex, randomIndex + 1);
    comboString = comboString + special;
  }

  // now from the combination string add the balance number of characters
  for (var i = password.length; i < length; i++) {
    randomIndex = randomInteger(comboString.length);
    password = password + comboString.substring(randomIndex, randomIndex + 1);
  }

  // finally scramble the password before returning it
  // using method from W3 schools https://www.w3schools.com/js/js_array_sort.asp
  var passwordArray = Array.from(password);
  passwordArray.sort(function () { return 0.5 - Math.random() });

  return passwordArray.join("");
}

function randomInteger(max) {
  // generates a random integer between 0 and max-1
  return Math.floor(Math.random() * max);
}

// Add event listener to generate button
// button calls the writePassword function when clicked
generateBtn.addEventListener("click", writePassword);
