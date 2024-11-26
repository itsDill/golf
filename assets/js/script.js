const API_KEY = "03664d8b42msh77373c6a1450ca0p1e857ejsn71a29df15875"; // Replace with your Live Golf Data API key
const API_HOST = "live-golf-data.p.rapidapi.com";

async function loadGolfData(tour) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = "Loading...";

  let endpoint;
  switch (tour) {
    case 'pga':
      endpoint = "leaderboard/pga"; // Adjust as per the API documentation
      break;
    case 'lpga':
      endpoint = "leaderboard/lpga";
      break;
    case 'liv':
      endpoint = "leaderboard/liv";
      break;
    default:
      contentDiv.innerHTML = "Invalid tour selection.";
      return;
  }

  try {
    const response = await fetch(`https://${API_HOST}/${endpoint}`, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    displayGolfData(data, contentDiv);
  } catch (error) {
    contentDiv.innerHTML = "Error loading data. Please try again later.";
    console.error(error);
  }
}

function displayGolfData(data, contentDiv) {
  contentDiv.innerHTML = ""; // Clear previous content

  // Example structure: Update this based on actual API response
  const leaderboard = document.createElement('div');
  leaderboard.innerHTML = `<h2>Leaderboard</h2>`;
  data.players.forEach(player => {
    const playerInfo = document.createElement('p');
    playerInfo.textContent = `${player.position}: ${player.name} - ${player.score}`;
    leaderboard.appendChild(playerInfo);
  });

  const fixtures = document.createElement('div');
  fixtures.innerHTML = `<h2>Upcoming Fixtures</h2>`;
  data.fixtures.forEach(fixture => {
    const fixtureInfo = document.createElement('p');
    fixtureInfo.textContent = `${fixture.date}: ${fixture.event}`;
    fixtures.appendChild(fixtureInfo);
  });

  contentDiv.appendChild(leaderboard);
  contentDiv.appendChild(fixtures);
}
