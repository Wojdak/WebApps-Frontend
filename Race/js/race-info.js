const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const raceID = urlParams.get('raceID');

getRaceInfo(raceID);

async function getRaceInfo(raceID) {
  try {
    const response = await fetch(`http://localhost:3000/races/${raceID}`);
    const data = await response.json();

    const imageElement = document.querySelector('.image img');
    imageElement.src = data.ImageLink;
    imageElement.alt = 'Race Image';

    document.querySelector('.details-title').textContent = data.RaceName;
    document.getElementById('circuit-name').textContent = data.CircuitName;
    document.getElementById('country').textContent = data.Country;
    document.getElementById('number-of-laps').textContent = data.NumberOfLaps;
    document.getElementById('date').textContent = data.Date;

    if (data.WinnerID !=null) {
        const winnerResponse = await fetch(`http://localhost:3000/drivers/${data.WinnerID}`);
        const winnerData = await winnerResponse.json();
        document.getElementById('winner').innerHTML = `<a class="underline" href="../Driver/driver-info.html?driverID=${winnerData.ID}">${winnerData.Name}</a>`;
    } else {
        document.getElementById('winner').textContent = "The race hasn't determined the winner yet.";
    } 
    
  } catch (error) {
    console.error(error);
  }
}
