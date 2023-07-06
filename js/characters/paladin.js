import Character from "../character.js";
import { display } from "../utils.js";

export default class Paladin extends Character {
  constructor({ name, hp = 16, dmg = 3, mana = 160 } = {}) {
    super({ name, hp, dmg, mana });
    this.specialAttack = {
      name: "Healing Light",
      action: this.specialAttackAction,
      cost: 40,
      hover: `Cost 40mp\nHeals 5 hp\nDeals 4 damages`,
    };
  }

  specialAttackAction() {
    this.hp += 5;

    super.specialAttackAction();

    const hp = document.querySelector(`.c${this.id} .hp`);

    hp.classList.add("positive");

    setTimeout(() => {
      hp.classList.remove("positive");
    }, 2000);

    display({
      text: `${this.name} cast his special : Healing Light, he gains 5 hp.\nHe has now ${this.hp} hp.`,
      options: [
        {
          text: "Continue",
          action: () => this.attack({ dmg: 4 }),
        },
      ],
    });
  }
}
