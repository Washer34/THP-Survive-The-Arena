import Character from "../character.js";
import { display } from "../utils.js";

export default class Assassin extends Character {
  constructor({ name, hp = 6, dmg = 6, mana = 20 } = {}) {
    super({ name, hp, dmg, mana });
    this.special = false;
    this.specialAttack = {
      name: "Shadow Hit",
      action: this.specialAttackAction,
      cost: 20,
      hover: `Cost 20mp\nImmune to damage for the next turn\nDeals 7 damages`,
    };
  }

  specialAttackAction() {
    super.specialAttackAction();

    this.special = true;

    display({
      text: `${this.name} cast his special attack : Shadow Hit\n
      attacks against ${this.name} won't deal any damage next turn.`,
      options: [
        {
          text: "Continue",
          action: () => this.attack({ dmg: 7 }),
        },
      ],
    });
  }

  takeDamage(damage) {
    if (this.special) {
      display({
        text: `Shadow hit prevent ${this.name} from taking damages.`,
        options: [
          {
            text: "Continue",
            action: () => this.turn.nextTurn(),
          },
        ],
      });
      return;
    }

    super.takeDamage(damage);
  }
}
