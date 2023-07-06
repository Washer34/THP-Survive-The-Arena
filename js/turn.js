import Game from "./game.js";
import { display } from "./utils.js";

export default class Turn {
  constructor({ turnNumber, characters, game }) {
    this.turnNumber = turnNumber;
    this.characters = characters;
    this.game = game;
    this.turnOfId = 0;
    characters.forEach((c) => {
      if (c.special) c.special = false;
      c.turn = this;
    });
    display({
      text: `It's now turn n°${this.turnNumber} !`,
      options: [
        {
          text: "Continue",
          action: this.startTurn.bind(this),
        },
      ],
    });
  }

  startTurn() {
    this.shuffleCharacters();
    this.nextTurn();
  }

  nextTurn() {
    console.log(this.characters);
    if (this.game.checkForWin()) return this.game.endGame();

    this.game.hud.showStats();

    if (this.turnOfId === this.characters.length) return this.game.newTurn();

    const character = this.characters[this.turnOfId];
    this.turnOfId += 1;

    if (character.status === "playing") {
      this.turnOf(character);
    } else {
      this.nextTurn();
    }
  }

  shuffleCharacters() {
    return this.characters.sort(() => Math.random() - 0.5);
  }

  turnOf(character) {
    const characterImg = document.querySelector(`.c${character.id} img`);
    characterImg.classList.add("turn");

    display({
      text: `It's ${character.name} turn !`,
      options: [
        {
          text: "Attack",
          action: character.attack.bind(character),
          hover: `Deals ${character.dmg} damages`,
        },
        {
          text: character.specialAttack.name,
          action: character.specialAttack.action.bind(character),
          deactivated: character.activateSpecial(),
          hover: character.specialAttack.hover,
          deactivatedHover: "Out of mana",
        },
      ],
    });
  }

  attack({ character, victim }) {
    character.dealDamage({ victim });

    this.turnOfId += 1;

    display({
      text: "Click to continue",
      options: [
        { text: "Continue", action: this.turnOf(characters[this.turnOfId]) },
      ],
    });
  }

  endGame() {
    display({
      text: `Game Over the winner is : ${this.characters
        .filter((c) => c.status === "playing")
        .map((c) => c.name)
        .join(", ")} !`,
      options: [
        {
          options: {
            text: "Play again",
            action: () => new Game({ turnLeft: 10 }),
          },
        },
      ],
    });
  }
}
