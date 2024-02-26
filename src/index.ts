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
                console.log(event);
                const currentIndex = Array.from(inputs).indexOf(event.target as HTMLInputElement);
                // console.log(currentIndex);
                if (event.key === "ArrowRight") {
                    const nextInput = currentIndex + 1;
                    if(nextInput< inputs.length) inputs[nextInput].focus();
                }
                if (event.key === "ArrowLeft") {
                    const preInput = currentIndex - 1;
                    if(preInput >= 0) inputs[preInput].focus();
                }
            })
        })
    }
}
const inputGenerator = new generateInput();