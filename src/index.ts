// Setting Game name
let gameName: string = "Guess Word Game";
console.log(gameName);
let gameHeader = document.querySelector("h1") as HTMLHeadingElement;
gameHeader.innerHTML = gameName;
let footer = document.querySelector("footer") as HTMLElement;
console.log(footer instanceof HTMLElement);
footer.innerHTML = `${gameName} Created By Ayham Alahmad`;
