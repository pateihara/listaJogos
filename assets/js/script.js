const API_KEY = "c8095e560d9a4cb38de491e11fe0aa66"; // Substitua pela sua API Key válida
const BASE_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const gamesContainer = document.getElementById("games-container");

// Lista fixa de 10 jogos brasileiros (nomes a serem buscados na API)
const jogosBrasileiros = [
  "Horizon Chase Turbo",
  "Wonderbox: The Adventure Maker",
  "Knights of Pen & Paper",
  "Chroma Squad",
  "Blazing Chrome",
  "Vengeful Guardian: Moonrider",
  "A Lenda do Herói",
  "99Vidas",
  "No Heroes Here",
  "Dandy Ace",
  "O Menino e o Mundo",
  "Aritana and the Harpy's Feather",
  "Celeste",
  "The Path of Motus",
  "Dungeon Land",
  "Angry Birds Rio",
  "Space Runner",
  "Magicka 2",
  "Tales of the Neon Sea",
  "Lords of the Fallen",
  "Children of Morta",
  "Injustice: Gods Among Us (versão brasileira)",
  "Battle Arena: Ragnarok",
  "Cuphead (parcialmente brasileiro)",
  "Guacamelee 2",
  "Jotun",
  "Goner",
  "Out There: Ω Edition",
  "Just Dance 2020 (com músicas brasileiras)",
  "Starlight Alliance",
  "Jungle Strike",
  "Bloodstained: Ritual of the Night",
  "Bomber Crew",
  "Vikings: Wolves of Midgard",
  "The Swords of Ditto",
  "Chronicon",
  "Dead Toast Entertainment",
  "Escape from Tarkov (jogadores brasileiros)",
  "Critical Ops",
  "League of Legends (servidores no Brasil)",
  "Valorant (servidores no Brasil)",
  "World of Warcraft (servidores no Brasil)",
  "Max Payne 3 (desenvolvedores brasileiros)",
  "Far Cry 3 (desenvolvedores brasileiros)",
  "Watch Dogs 2 (conteúdo brasileiro)",
  "Lords of the Fallen (alguns desenvolvedores brasileiros)",
  "Metal Gear Solid V: The Phantom Pain (dublagem em português brasileiro)",
  "The Witcher 3: Wild Hunt (dublagem em português brasileiro)",
  "Spider-Man (2018) (com dublagem em português brasileiro)",
  "Gears 5 (dublagem em português brasileiro)",
  "Assassin's Creed Odyssey (dublagem em português brasileiro)",
  "Rocket League (com servidores no Brasil)",
  "Street Fighter V (dublagem em português brasileiro)",
  "Call of Duty: Warzone (servidores no Brasil)",
  "Minecraft (dublagem em português brasileiro)",
  "Counter-Strike: Global Offensive (servidores no Brasil)",
  "Apex Legends (servidores no Brasil)",
  "Overwatch (com servidores no Brasil)",
  "Tom Clancy's Rainbow Six Siege (com servidores no Brasil)",
  "GTA V (com servidores no Brasil)",
  "Battlefield 1 (com servidores no Brasil)",
  "For Honor (servidores no Brasil)",
];

// Variável global para armazenar todos os jogos
let allGames = [];

// Função para buscar informações dos jogos na API
async function fetchBrazilianGames() {
  try {
    const promises = jogosBrasileiros.map(async (gameName) => {
      const url = `${BASE_URL}&search=${encodeURIComponent(gameName)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao buscar jogo: " + gameName);
      const data = await response.json();
      return data.results[0] || { name: gameName, image: null }; // Retorna o primeiro jogo encontrado ou dados mínimos
    });

    // Aguarda todos os jogos serem buscados
    allGames = await Promise.all(promises);
    displayGames(allGames); // Exibe todos os jogos ao carregar a página
  } catch (error) {
    gamesContainer.innerHTML = `<p>Erro: ${error.message}</p>`;
  }
}

function displayGames(games) {
  gamesContainer.innerHTML = ""; // Limpa o container antes de exibir os jogos

  // Limita a exibição aos 10 primeiros jogos
  const limitedGames = games.slice(0, 10);

  if (limitedGames.length === 0) {
    gamesContainer.innerHTML = "<p>Nenhum jogo encontrado.</p>";
    return;
  }

  limitedGames.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
<div class="card">
  <img src="${
    game.background_image || "https://via.placeholder.com/200"
  }" class="card-img-top game-card-img" alt="${game.name}">
  <div class="card-body text-center card-body-flex">
    <h4>${game.name}</h4>
    <p class="card-text">
      ${
        game.rating ? `Avaliação: ${game.rating}/5` : "Sem avaliação disponível"
      }
    </p>
    <div class="card-price">
      <p class="btn btn-secondary fw-semibold">R$ 00,00</p>
      <a href="#" class="btn btn-link card-btn">Saiba mais</a>
    </div>
  </div>
</div>


    `;
    gamesContainer.appendChild(gameCard);
  });
}

// Função para buscar jogos com base na pesquisa
function searchGames() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filteredGames = allGames.filter((game) =>
    game.name.toLowerCase().includes(searchInput)
  );

  displayGames(filteredGames); // Exibe os jogos filtrados pela pesquisa
}

// Busca inicial dos 10 jogos brasileiros ao carregar a página
fetchBrazilianGames();
