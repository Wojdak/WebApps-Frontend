const form = document.querySelector('.add-form');

form.addEventListener("submit", addRace);

async function addRace(event) {
  event.preventDefault();

  const imageLink = document.getElementById("image-link").value;
  const raceNameInput = document.getElementById("race-name").value;
  const circuitNameInput = document.getElementById("circuit-name").value;
  const countryInput = document.getElementById("country").value;
  const numberOfLapsInput = document.getElementById("number-of-laps").value;
  const dateInput = document.getElementById("date").value;
  //const winnerInput = parseInt(document.getElementById("winner").value);

  const newRace = {
    RaceName: raceNameInput,
    CircuitName: circuitNameInput,
    Country: countryInput,
    NumberOfLaps: numberOfLapsInput,
    Date: dateInput,
    //WinnerID: winnerInput,
    ImageLink: imageLink
  };

  try {
    const response = await fetch("http://localhost:3000/races", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRace),
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
    console.error("An error occurred while adding the race:", error);
  }
}
