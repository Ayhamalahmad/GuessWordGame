// Setting Game name
let gameName: string = "Guess Word Game";
// console.log(gameName);
let gameHeader = document.querySelector("h1") as HTMLHeadingElement;
gameHeader.innerHTML = gameName;
let footer = document.querySelector("footer") as HTMLElement;
let messageArea = document.querySelector(".message") as HTMLDivElement;
const guessButton = document.querySelector(".check") as HTMLButtonElement;

// console.log(footer instanceof HTMLElement);
footer.innerHTML = `${gameName} Created By Ayham Alahmad`;
// Setting Game options
let numbersOfTries: number = 6;
let numbersOfLetters: number = 6;
let currentTry: number = 1;
// Manage Words
let wordToGuess: string = "";
const words: string[] =
    ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordToGuess);
class generateInput {
    static InputsContainer = document.querySelector(".inputs") as HTMLDivElement;
    constructor() {
        // console.log(generateInput.InputsContainer);
        // Create Main Try Div
        for (let i: number = 1; i <= numbersOfTries; i++) {
            const tryDiv: HTMLDivElement = document.createElement("div");
            tryDiv.classList.add(`try-${i}`);
            tryDiv.innerHTML = `<span>Try ${i}</span>`;


            if (i !== 1) tryDiv.classList.add("disabled-inputs");

            // Create Inputs
            for (let j: number = 1; j <= numbersOfLetters; j++) {
                const input: HTMLInputElement = document.createElement("input");
                input.type = "text";
                input.id = `guess-${i}-letter-${j}`;
                input.setAttribute("maxLength", '1');
                tryDiv.appendChild(input);
            }

            generateInput.InputsContainer.appendChild(tryDiv);
        }
        // console.log(generateInput.InputsContainer.children[0].children[1]);
        // focus on first element in the Try
        (generateInput.InputsContainer.children[0].children[1] as HTMLInputElement).focus();
        // Disable All inputs Except first one
        const inputInDisabledDiv: NodeListOf<HTMLInputElement> = document.querySelectorAll(".disabled-inputs input");
        // console.log(inputInDisabledDiv);
        inputInDisabledDiv.forEach((input) => (input.disabled = true));

        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");

        inputs.forEach((input, index) => {
            input.addEventListener("input", function () {
                this.value = this.value.toUpperCase();
                // console.log(index);

                const nextInput = inputs[index + 1];
                nextInput?.focus();
            });

            input.addEventListener("keydown", function (event) {
                // console.log(event);
                const currentIndex = Array.from(inputs).indexOf(event.target as HTMLInputElement);
                // console.log(currentIndex);
                if (event.key === "ArrowRight") {
                    const nextInput = currentIndex + 1;
                    if (nextInput < inputs.length) inputs[nextInput].focus();
                }
                if (event.key === "ArrowLeft") {
                    const preInput = currentIndex - 1;
                    if (preInput >= 0) inputs[preInput].focus();
                }
            })
        })
    }
}
class handleGuess {
    constructor() {
        let successGuess = true;
        console.log("successGuess", successGuess);
        for (let i = 1; i <= numbersOfLetters; i++) {
            const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`) as HTMLInputElement;
            const letter = inputField.value.toLocaleLowerCase();
            // console.log(letter);
            const actualLetter = wordToGuess[i - 1];
            console.log(actualLetter);
            // logic 
            if (letter === actualLetter) {
                // letter correct and in place 
                inputField.classList.add("yes-in-place");
            } else if (wordToGuess.includes(letter) && letter !== "") {
                // letter correct and not in place 
                inputField.classList.add("not-in-place");
                successGuess = false;
            } else {
                inputField.classList.add("no");
            }
        }

        // chek if the user win or lose
        if (successGuess) {
            messageArea.innerHTML = `you win the word is <span>${wordToGuess}</span>`;
            // add disabled class on all try divs
            let allTries: NodeListOf<HTMLDivElement> = document.querySelectorAll(".inputs > div");
            allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
            // disabled guess Button
            guessButton.disabled = true;
        } else {
            (document.querySelector(`.try-${currentTry}`) as HTMLDivElement)?.classList.add("disabled-inputs");
            const currentTryInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(`.try-${currentTry} input`);
            currentTryInputs.forEach((input) => input.disabled = true);

            currentTry++;

            const nextTryInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(`.try-${currentTry} input`);
            nextTryInputs.forEach((input) => input.disabled = false);

            let element = document.querySelector(`.try-${currentTry}`) as HTMLDivElement;
            if (element) {
                (document.querySelector(`.try-${currentTry}`) as HTMLDivElement)?.classList.remove("disabled-inputs");
                (element.children[1] as HTMLInputElement).focus();
            } else {
                // disabled guess Button
                guessButton.disabled = true;
                messageArea.innerHTML = `you lose the word is <span>${wordToGuess}</span>`;
            }

        }

    }
}
guessButton.addEventListener("click", () => {
    new handleGuess();
});

const inputGenerator = new generateInput();