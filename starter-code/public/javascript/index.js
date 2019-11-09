const charactersAPI = new APIHandler('http://localhost:8000');

const seedCharacterstoDiv = (chars) => {
  const charContainer = document.querySelector(".characters-container");
  charContainer.innerHTML = "";
  for (char of chars) {
    const charDiv = document.createElement("div");
    charDiv.classList.add("character-info");
    for (attribute in char) {
      let div = document.createElement("div");
      div.classList.add(`${attribute}`);
      div.innerText = char[attribute];
      charDiv.appendChild(div);
    };
    charContainer.appendChild(charDiv);
  };
}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList()
    .then(data => {
      chars = data["data"];
      seedCharacterstoDiv(chars);
    });
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const id = document.querySelector("#character-id-find").value;
    charactersAPI.getOneRegister(id)
    .then(char => {
      chars = [ char["data"] ];
      seedCharacterstoDiv(chars);
    });
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const id = document.querySelector("#character-id-delete").value;
    charactersAPI.deleteOneRegister(id)
    .then(deletedChar => {
      console.log(deletedChar);
    });
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    const id = document.querySelector("#edit-char-id").value;
    const name = document.querySelector("#edit-char-name").value;
    const occupation = document.querySelector("#edit-char-occupation").value;
    const weapon = document.querySelector("#edit-char-weapon").value;
    const cartoon = document.querySelector("#edit-char-cartoon").value;
    charactersAPI.updateOneRegister({ name, occupation, weapon, cartoon } , id)
    .then(updatedChar => {
      console.log(updatedChar);
    });
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    const name = document.querySelector("#new-char-name").value;
    const occupation = document.querySelector("#new-char-occupation").value;
    const weapon = document.querySelector("#new-char-weapon").value;
    const cartoon = document.querySelector("#new-char-cartoon").value;
    charactersAPI.createOneRegister({ name, occupation, weapon, cartoon })
    .then(newChar => {
      console.log(newChar);
    });
  });
});
