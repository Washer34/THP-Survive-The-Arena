import { display } from "./utils.js";
export default class Character {
  constructor({ name, hp, dmg, mana }) {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.turn;
    this.status = "playing";
    this.id = Date.now() - Math.floor(Math.random() * 1000);
  }

  takeDamage(damage) {
    this.hp -= damage;

    this.turn.game.hud.showStats();

    const victimImg = document.querySelector(`.c${this.id} img`);
    const victimHp = document.querySelector(`.c${this.id} .hp`);
    const victimAudio = new Audio(
      `./Sounds/${this.constructor.name}/${this.constructor.name}_takehit.ogg`
    );
    victimAudio.play();

    victimImg.src = `./Animations/${this.constructor.name}/${this.constructor.name}_takehit.gif`;
    victimImg.classList.add("hurt");
    victimHp.classList.add("hurt");

    setTimeout(() => {
      victimImg.classList.remove("hurt");
      victimHp.classList.remove("hurt");
      victimImg.src = `./Animations/${this.constructor.name}/${this.constructor.name}.gif`;
    }, 2000);

    if (this.hp <= 0) {
      const victimDeathAudio = new Audio(
        `./Sounds/${this.constructor.name}/${this.constructor.name}_death.ogg`
      );
      victimDeathAudio.play();
      victimImg.src = `./Animations/${this.constructor.name}/${this.constructor.name}_death.gif`;
      this.status = "loser";
      this.hp = 0;
    }

    const text =
      this.hp > 0
        ? `He has ${this.hp}hp left`
        : `${this.name} is DEAD 💀💀💀💀`;

    display({
      text: `${this.name} lost ${damage}hp.\n` + text,
      options: [
        {
          text: "Continue",
          action: () => this.turn.nextTurn(),
        },
      ],
    });
  }

  dealDamage({ victim, dmg = this.dmg } = {}) {
    victim.takeDamage(dmg);
    const attackerAudio = new Audio(
      `./Sounds/${this.constructor.name}/${this.constructor.name}_attack.ogg`
    );
    attackerAudio.play();

    const attackerImg = document.querySelector(`.c${this.id} img`);
    attackerImg.src = `./Animations/${this.constructor.name}/${this.constructor.name}_attack.gif`;

    setTimeout(() => {
      attackerImg.src = `./Animations/${this.constructor.name}/${this.constructor.name}.gif`;
    }, 2000);

    if (victim.status === "loser") this.mana += 20;
  }

  attack({ dmg = this.dmg } = {}) {
    const options = [];

    this.turn.characters.forEach((character) => {
      if (character !== this) {
        options.push({
          text: character.name,
          action: () => this.dealDamage({ victim: character, dmg }),
          deactivated: character.status !== "playing",
        });
      }
    });

    return display({ text: "Attack: ", options });
  }

  activateSpecial = () => {
    return this.mana < this.specialAttack.cost;
  };

  specialAttackAction() {
    this.mana -= this.specialAttack.cost;
    this.turn.game.hud.showStats();
    const attackerSpecialAudio = new Audio(
      `./Sounds/${this.constructor.name}/${this.constructor.name}_special.ogg`
    );
    attackerSpecialAudio.play();

    const mana = document.querySelector(`.c${this.id} .mana`);
    const attackerImg = document.querySelector(`.c${this.id} img`);
    attackerImg.src = `./Animations/${this.constructor.name}/${this.constructor.name}_special.gif`;

    mana.classList.add("negative");

    setTimeout(() => {
      mana.classList.remove("negative");
      attackerImg.src = `./Animations/${this.constructor.name}/${this.constructor.name}.gif`;
    }, 2000);
  }
}
