import Character from "../character.js";
import { display } from "../utils.js";

export default class Berzerker extends Character {
  constructor({ name, hp = 8, dmg = 4, mana = 0 } = {}) {
    super({ name, hp, dmg, mana });
    this.specialAttack = {
      name: "Rage",
      action: this.specialAttackAction,
      cost: 0,
      hover: `Cost 1hp\nGain 1 damage`,
    };
  }

  specialAttackAction() {
    this.dmg++;

    super.specialAttackAction();

    const dmg = document.querySelector(`.c${this.id} .dmg`);

    dmg.classList.add("positive");

    setTimeout(() => {
      dmg.classList.remove("positive");
    }, 2000);

    display({
      text: `${this.name} cast his special : Rage, he increase his damage by 1.\nHe has now ${this.dmg} damages.`,
      options: [
        {
          text: "Continue",
          action: () => this.turn.nextTurn(),
        },
      ],
    });
  }
}
