const API_KEY = "c8095e560d9a4cb38de491e11fe0aa66"; // Substitua 'YOUR_API_KEY' pela sua chave da API RAWG
const BASE_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const gamesContainer = document.getElementById("games-container");
const searchInput = document.getElementById("search-input");

// Função para buscar os jogos
async function fetchGames(query = "") {
  try {
    let url = BASE_URL;
    if (query) {
      url = `${BASE_URL}&search=${query}`; // Adiciona o parâmetro de busca
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar jogos");
    }
    const data = await response.json();
    displayGames(data.results);
  } catch (error) {
    gamesContainer.innerHTML = `<p>Erro: ${error.message}</p>`;
  }
}

// Função para exibir os jogos na página
function displayGames(games) {
  gamesContainer.innerHTML = ""; // Limpa o container antes de exibir os jogos
  if (games.length === 0) {
    gamesContainer.innerHTML = "<p>Nenhum jogo encontrado.</p>";
    return;
  }
  games.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
      <img src="${game.background_image}" alt="${game.name}">
      <h2>${game.name}</h2>
      <p>Rating: ${game.rating}/5</p>
    `;
    gamesContainer.appendChild(gameCard);
  });
}

// Função para buscar os jogos com base no texto da busca
function searchGames() {
  const query = searchInput.value.trim(); // Captura o valor do input
  fetchGames(query);
}

// Chama a função para buscar os jogos ao carregar a página
fetchGames();
