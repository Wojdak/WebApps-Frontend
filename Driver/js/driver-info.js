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

  if (data.Team && data.Team.ID != null) {
    document.getElementById('team').innerHTML = `<a href="../Team/team-info.html?teamID=${data.Team.ID}">${data.Team.Name}</a>`;
  } else {
    document.getElementById('team').innerHTML = `The driver is not part of any team.`;
  }
  
 

  const detailsTitle = document.querySelector('.details-title');
  detailsTitle.innerHTML = data.Name;

  const racesWonContainer = document.getElementById("races-won");

  if ( data.RacesWon.length > 0) {
    data.RacesWon.forEach((race) => {
      const raceLink = document.createElement("a");
      raceLink.classList.add("underline");
      raceLink.href = `../Race/race-info.html?raceID=${race.ID}`;
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