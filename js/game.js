import Assassin from "./characters/assassin.js";
import Berzerker from "./characters/berzerker.js";
import Fighter from "./characters/fighter.js";
import Monk from "./characters/monk.js";
import Paladin from "./characters/paladin.js";
import Wizard from "./characters/wizard.js";
import Hud from "./hud.js";
import Turn from "./turn.js";
import { display } from "./utils.js";

export default class Game {
  constructor({ turnLeft = 10 } = {}) {
    this.turnLeft = turnLeft;
    this.totalTurns = turnLeft;
    this.characters = this.selectCharacters();
    this.hud = new Hud(this.characters);

    display({
      text: "Welcome to Survive The Arena ",
      options: [
        {
          text: "Start",
          action: () => {
            const audio = document.getElementById("startSound");
            audio.play();
            this.newTurn();
          },
        },
      ],
    });
  }

  selectCharacters() {
    const selectedClasses = [];
    const classes = [
      (name) => new Fighter({ name }),
      (name) => new Paladin({ name }),
      (name) => new Monk({ name }),
      (name) => new Berzerker({ name }),
      (name) => new Assassin({ name }),
      (name) => new Wizard({ name }),
    ];

    while (selectedClasses.length < 5) {
      const randomClassIndex = Math.floor(Math.random() * classes.length);
      const selectedClass = classes[randomClassIndex];

      if (!selectedClasses.includes(selectedClass)) {
        selectedClasses.push(selectedClass);
      }
    }

    const characters = [];
    const names = ["Grace", "Ulder", "Moana", "Draven", "Carl"];

    for (let i = 0; i < 5; i++) {
      const randomNameIndex = Math.floor(Math.random() * names.length);
      const name = names[randomNameIndex];
      const characterClass = selectedClasses[i];

      characters.push(characterClass(name));

      names.splice(randomNameIndex, 1);
    }

    return characters;
  }

  newTurn() {
    if (this.turnLeft > 0) {
      this.turnLeft -= 1;
      return new Turn({
        turnNumber: this.totalTurns - this.turnLeft,
        characters: this.characters,
        game: this,
      });
    }
    return this.endGame();
  }

  checkForWin() {
    return this.characters.filter((c) => c.status === "playing").length <= 1;
  }

  endGame() {
    display({
      text: `Game over. The winner is : ${this.characters
        .filter((c) => c.status === "playing")
        .map((c) => c.name)
        .join(", ")} !`,
      options: [
        {
          text: "Play again",
          action: () => new Game(),
        },
      ],
    });
  }
}
