export default class Hud {
  constructor(characters) {
    this.characters = characters;
    this.charactersStatusEl = document.querySelector(".characters-status");
    this.showStats();
  }

  showStats() {
    while (this.charactersStatusEl.firstChild)
      this.charactersStatusEl.removeChild(this.charactersStatusEl.firstChild);

    this.characters.forEach((character) => {
      const char = document.createElement("div");
      const characterStats = document.createElement("div");
      const img = document.createElement("img");
      const name = document.createElement("p");
      const charClass = document.createElement("p");
      const hp = document.createElement("p");
      const dmg = document.createElement("p");
      const mana = document.createElement("p");

      name.innerText = character.name;
      charClass.innerText = character.constructor.name;
      img.src = `./Animations/${character.constructor.name}/${character.constructor.name}.gif`;
      hp.innerHTML = `Health points : <span>${character.hp}</span>`;
      dmg.innerHTML = `Strength : <span>${character.dmg}</span>`;
      mana.innerHTML = `Mana points : <span>${character.mana}</span>`;

      char.classList = `character c${character.id}`;
      name.classList.add("name");
      charClass.classList.add("class");
      hp.classList.add("hp");
      dmg.classList.add("dmg");
      mana.classList.add("mana");

      characterStats.appendChild(name);
      characterStats.appendChild(charClass);
      characterStats.appendChild(hp);
      characterStats.appendChild(dmg);
      characterStats.appendChild(mana);

      if (character.hp <= 0) char.classList.add("dead");

      char.appendChild(img);
      char.appendChild(characterStats);

      this.charactersStatusEl.appendChild(char);
    });
  }
}
