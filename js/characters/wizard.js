import Character from "../character.js";
import { display } from "../utils.js";

export default class Wizard extends Character {
  constructor({ name, hp = 10, dmg = 2, mana = 200 } = {}) {
    super({ name, hp, dmg, mana });
    this.special = false;
    this.specialAttack = {
      name: "Fireball",
      action: this.specialAttackAction,
      cost: 25,
      hover: `Cost 25mp\nDeals 7 damages`,
    };
  }

  specialAttackAction() {
    super.specialAttackAction();

    display({
      text: `${this.name} cast his special attack: Fireball`,
      options: [
        {
          text: "Continue",
          action: () => this.attack({ dmg: 7 }),
        },
      ],
    });
  }
}
