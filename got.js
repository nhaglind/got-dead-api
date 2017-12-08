// alert("Uh, this is all spoilers. I'd probably just close this now is you don't want to know who dies in Game of Thrones."); 

const app = document.getElementById('root');
const wall = document.createElement('img');
wall.src = 'wall.jpeg';

const container = document.createElement('div');
container.setAttribute('class', 'container');
const message = document.createElement('p');
message.setAttribute('class', 'message');
message.textContent = "Who's alive?";

app.appendChild(wall);
app.appendChild(message);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://anapioficeandfire.com/api/characters?pageSize=100', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(character => {
      if (character.name != "") {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = character.name;

      const p = document.createElement('p');

      if (character.died != "") {
        p.textContent = `Died: ${character.died}`;
        p.setAttribute('class', 'dead');
      } else {
        p.textContent = "Alive";
      };

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      }

    });
  } else {
    console.log("Error, but likely just hit API cap.")
  }
}

request.send();