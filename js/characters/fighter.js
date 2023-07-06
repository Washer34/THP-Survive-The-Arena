import Character from "../character.js";
import { display } from "../utils.js";

export default class Fighter extends Character {
  constructor({ name, hp = 12, dmg = 4, mana = 40, game } = {}) {
    super({ name, hp, dmg, mana, game });
    this.special = false;
    this.specialAttack = {
      name: "Dark Vision",
      action: this.specialAttackAction,
      cost: 20,
      hover: `Cost 20mp\n Damages reduce by 50% for next turn\nDeals 5 damages`,
    };
  }

  specialAttackAction() {
    super.specialAttackAction();

    this.special = true;

    display({
      text: `${this.name} cast his special attack : Dark Vision\nAttacks against him are reduce.`,
      options: [
        {
          text: "Continue",
          action: () => this.attack({ dmg: 5 }),
        },
      ],
    });
  }

  takeDamage(damage) {
    if (this.special) damage -= 2;

    super.takeDamage(damage);
  }
}
