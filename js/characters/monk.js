import Character from "../character.js";
import { display } from "../utils.js";

export default class Monk extends Character {
  constructor({ name, hp = 8, dmg = 2, mana = 200 } = {}) {
    super({ name, hp, dmg, mana });
    this.specialAttack = {
      name: "Heal",
      action: this.specialAttackAction,
      cost: 25,
      hover: `Cost 25mp\nHeals 8hp`,
    };
  }

  specialAttackAction() {
    this.hp += 8;

    super.specialAttackAction();

    const hp = document.querySelector(`.c${this.id} .hp`);

    hp.classList.add("positive");

    setTimeout(() => {
      hp.classList.remove("positive");
    }, 2000);

    display({
      text: `${this.name} cast his special : Heal, and gain 8hp.\nHe has now ${this.hp} hp.`,
      options: [
        {
          text: "Continue",
          action: () => this.turn.nextTurn(),
        },
      ],
    });
  }
}
