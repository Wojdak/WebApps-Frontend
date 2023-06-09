const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const driverID = urlParams.get('driverID');

getDriverInfo(driverID);

async function getDriverInfo(driverID){
    const url = `http://localhost:3000/drivers/${driverID}`;
    const response = await fetch(url);
    const data = await response.json();

    const imageElement = document.querySelector('.image img');
    imageElement.src = data.ImageLink;
    imageElement.alt = 'Driver Image'

    document.getElementById('nationality').innerHTML = data.Nationality;
    document.getElementById('team').innerHTML = data.Team;
    document.getElementById('racing-number').innerHTML = data.RacingNumber;
    document.getElementById('races-won').innerHTML = data.RacesWon;

    const detailsTitle = document.querySelector('.details-title');
    detailsTitle.innerHTML = data.Name;
}