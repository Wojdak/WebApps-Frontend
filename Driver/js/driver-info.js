const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const driverID = urlParams.get('driverID');

getDriverInfo(driverID);

async function getDriverInfo(driverID) {
  const url = `http://localhost:3000/drivers/${driverID}`;
  const response = await fetch(url);
  const data = await response.json();

  const imageElement = document.querySelector('.image img');
  imageElement.src = data.ImageLink;
  imageElement.alt = 'Driver Image';

  document.getElementById('nationality').innerHTML = data.Nationality;
  document.getElementById('racing-number').innerHTML = data.RacingNumber;

  const teamResponse = await fetch(`http://localhost:3000/teams/${data.TeamID}`);
  const teamData = await teamResponse.json();
  document.getElementById('team').innerHTML = `<a href="team-info.html?teamID=${teamData.ID}">${teamData.Name}</a>`;

  const detailsTitle = document.querySelector('.details-title');
  detailsTitle.innerHTML = data.Name;

  const racesResponse = await fetch(`http://localhost:3000/races`);
  const races = await racesResponse.json();

  const racesWonContainer = document.getElementById("races-won");

  const racesWonByDriver = races.filter((race) => race.WinnerID === parseInt(driverID));
  console.log(racesWonByDriver);

  if (racesWonByDriver.length > 0) {
    racesWonByDriver.forEach((race) => {
      const raceLink = document.createElement("a");
      raceLink.href = `../../Race/race-info.html?raceID=${race.ID}`;
      raceLink.textContent = race.RaceName;

      const raceItem = document.createElement("li");
      raceItem.appendChild(raceLink);
      racesWonContainer.appendChild(raceItem);
    });
  } else {
    const noRacesWonText = document.createElement("p");
    noRacesWonText.textContent = "This driver hasn't won any races yet.";
    racesWonContainer.appendChild(noRacesWonText);
  }
}