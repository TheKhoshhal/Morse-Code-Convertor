"use strict";

const dotBtn = document.querySelector("[data-dot]");
const dashBtn = document.querySelector("[data-dash]");
const slashBtn = document.querySelector("[data-slash]");
const spaceBtn = document.querySelector("[data-space]");
const trashBtn = document.querySelector("[data-trash]");
const backSpaceBtn = document.querySelector("[data-backSpace]");
const morseInput = document.querySelector("[data-morse]");
const resultInput = document.querySelector("[data-result]");
const translateBtn = document.querySelector(".btn-translate");

let repeat = 0;

let dict = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
};

//// Events ////
dotBtn.addEventListener("click", () => {
  if (repeat < 5) {
    morseInput.value += dotBtn.innerHTML;
    repeat++;
  }
});

dashBtn.addEventListener("click", () => {
  if (repeat < 5) {
    morseInput.value += dashBtn.innerHTML;
    repeat++;
  }
});

slashBtn.addEventListener("click", () => {
  if (morseInput.value != "") {
    if (morseInput.value.charAt(morseInput.value.length - 1) != "/") {
      if (morseInput.value.charAt(morseInput.value.length - 1) != " ") {
        morseInput.value += slashBtn.innerHTML;
        repeat = 0;
      }
    }
  }
});

spaceBtn.addEventListener("click", () => {
  if (morseInput.value != "") {
    if (morseInput.value.charAt(morseInput.value.length - 1) != "/") {
      if (morseInput.value.charAt(morseInput.value.length - 1) != " ") {
        morseInput.value += " ";
        repeat = 0;
      }
    }
  }
});

translateBtn.addEventListener("click", () => {
  try {
    let result = translate(morseInput.value);

    resultInput.value = result;
  } catch (error) {
    resultInput.value = "Error!!!";
  }
});

trashBtn.addEventListener("click", () => {
  morseInput.value = "";
  resultInput.value = "";
  repeat = 0;
});

backSpaceBtn.addEventListener("click", () => {
  if (morseInput.value != "") {
    if (morseInput.value.charAt(morseInput.value.length - 1) != "/") {
      if (morseInput.value.charAt(morseInput.value.length - 1) != " ") {
        let back = morseInput.value;
        back = back.slice(0, -1);
        morseInput.value = back;
        if (repeat > 0) {
          repeat--;
        }
      }
    }
  }
});

window.addEventListener("load", () => {
  morseInput.value = "";
  resultInput.value = "";
});

window.addEventListener("keypress", (e) => {
  let pressed = e.key;
  if (repeat < 5) {
    if (pressed == ".") {
      morseInput.value += String(pressed);
      repeat++;
    } else if (pressed == "-") {
      morseInput.value += String(pressed);
      repeat++;
    }
  }

  if (pressed == "/") {
    if (morseInput.value != "") {
      if (morseInput.value.charAt(morseInput.value.length - 1) != "/") {
        if (morseInput.value.charAt(morseInput.value.length - 1) != " ") {
          morseInput.value += pressed;
          repeat = 0;
        }
      }
    }
  }

  if (pressed == " ") {
    if (morseInput.value != "") {
      if (morseInput.value.charAt(morseInput.value.length - 1) != "/") {
        if (morseInput.value.charAt(morseInput.value.length - 1) != " ") {
          morseInput.value += " ";
          repeat = 0;
        }
      }
    }
  }

  if (pressed == "Enter") {
    try {
      let result = translate(morseInput.value);

      resultInput.value = result;
    } catch (error) {
      resultInput.value = "Error!!!";
    }
  }

  console.log(pressed);
});

//// Functions ////
function translate(str) {
  str = String(str);
  return str
    .split("/")
    .map((word) =>
      word
        .split(" ")
        .map((letter) => dict[letter])
        .join("")
    )
    .join(" ");
}
