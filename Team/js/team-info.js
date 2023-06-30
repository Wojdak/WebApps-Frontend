const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const teamID = urlParams.get('teamID');

getTeamInfo(teamID);

async function getTeamInfo(teamID) {
  const url = `http://localhost:3000/teams/${teamID}`;
  const response = await fetch(url);
  const data = await response.json();

  const teamNameElement = document.querySelector('.details-title');
  teamNameElement.innerHTML = data.Name;

  const principalName = document.querySelector('.principal-name');
  principalName.innerHTML = data.TeamChief;

  const teamChiefImageElement = document.querySelector('.principal-image img');
  teamChiefImageElement.src = data.TeamChiefImageLink;
  teamChiefImageElement.alt = 'Team Principal Image';

  const driverImagesContainer = document.querySelector('.driver-images');

  const driversResponse = await fetch('http://localhost:3000/drivers');
  const drivers = await driversResponse.json();

  const teamDrivers = drivers.filter((driver) => driver.TeamID === parseInt(teamID));

  if (teamDrivers.length > 0) {
    teamDrivers.forEach((driver) => {
      const driverLink = document.createElement('a');
      driverLink.href = `../Driver/driver-info.html?driverID=${driver.ID}`;

      const driverImage = document.createElement('img');
      driverImage.src = driver.ImageLink;
      driverImage.alt = `Driver ${driver.ID}`;

      driverLink.appendChild(driverImage);
      driverImagesContainer.appendChild(driverLink);
    });
  } else {
    const noDriversText = document.createElement('p');
    noDriversText.textContent = 'No drivers in this team.';
    driverImagesContainer.appendChild(noDriversText);
  }
}
