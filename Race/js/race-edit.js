const form = document.querySelector(".add-form");
const urlParams = new URLSearchParams(window.location.search);
const raceID = urlParams.get("raceID");

getRaceDetails(raceID);

async function getRaceDetails(raceID) {
  const response = await fetch(`http://localhost:3000/races/${raceID}`);
  const race = await response.json();

  document.getElementById("image-link").value = race.ImageLink;
  document.getElementById("race-name").value = race.RaceName;
  document.getElementById("circuit-name").value = race.CircuitName;
  document.getElementById("country").value = race.Country;
  document.getElementById("number-of-laps").value = race.NumberOfLaps;
  document.getElementById("date").value = race.Date;

  const winnerSelect = document.getElementById("winner");
  const driversResponse = await fetch("http://localhost:3000/drivers");
  const drivers = await driversResponse.json();

  drivers.forEach((driver) => {
    const option = document.createElement("option");
    option.value = driver.ID;
    option.textContent = driver.Name;

    if (driver.ID === race.WinnerID) {
      option.selected = true;
    }

    winnerSelect.appendChild(option);
  });
}

form.addEventListener("submit", updateRace);

async function updateRace(event) {
  event.preventDefault();

  const imageLink = document.getElementById("image-link").value;
  const raceName = document.getElementById("race-name").value;
  const circuitName = document.getElementById("circuit-name").value;
  const country = document.getElementById("country").value;
  const numberOfLaps = document.getElementById("number-of-laps").value;
  const date = document.getElementById("date").value;
  const winner = parseInt(document.getElementById("winner").value);

  const updatedRace = {
    RaceName: raceName,
    CircuitName: circuitName,
    Country: country,
    NumberOfLaps: numberOfLaps,
    Date: date,
    WinnerID: winner,
    ImageLink: imageLink
  };

  if(validateRace(updatedRace)){
    try {
      const response = await fetch(`http://localhost:3000/races/${raceID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRace),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        window.location.href = "race.html";
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("An error occurred while updating the race:", error);
    }
  }
  }
 

function validateRace(race) {
  if (!race.CircuitName || !race.RaceName || !race.Country || !race.NumberOfLaps || !race.Date || !race.ImageLink) {
    alert("Please fill in all required fields.");
    return false;
  }

  if (!isValidImageLink(race.ImageLink)) {
    alert("Invalid image link. Please enter a valid URL.");
    return false;
  }

  if (!isValidNumber(race.NumberOfLaps)) {
    alert("Invalid racing number. Please enter a numeric value.");
    return false;
  }

  return true
}