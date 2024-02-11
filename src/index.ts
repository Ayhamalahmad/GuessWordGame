// Setting Game name
let gameName: string = "Guess Word Game";
console.log(gameName);
let gameHeader = document.querySelector("h1") as HTMLHeadingElement;
gameHeader.innerHTML = gameName;
let footer = document.querySelector("footer") as HTMLElement;
console.log(footer instanceof HTMLElement);
footer.innerHTML = `${gameName} Created By Ayham Alahmad`;
// Setting Game options
let numbersOfTries: number = 6;
let numbersOfLetters: number = 6;
let currentTry: number = 1;
class generateInput {
    static InputsContainer = document.querySelector(".inputs") as HTMLDivElement;
    constructor() {
        console.log(generateInput.InputsContainer);
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
        (generateInput.InputsContainer.children[0].children[1] as HTMLInputElement).focus();
    }
}
const inputGenerator = new generateInput();