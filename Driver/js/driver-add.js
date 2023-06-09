const form = document.querySelector('.add-form');

form.addEventListener("submit", addDriver);

async function addDriver(event) {
  event.preventDefault();

  const imageLink = document.getElementById("image-link");
  const nameInput = document.getElementById("name");
  const nationalityInput = document.getElementById("nationality");
  const teamInput = document.getElementById("team");
  const racingNumberInput = document.getElementById("racing-number");
  const racesWonInput = document.getElementById("races-won");

  const newDriver = {
    ID: null,
    Name: nameInput.value,
    Nationality: nationalityInput.value,
    Team: teamInput.value,
    RacingNumber: racingNumberInput.value,
    RacesWon: racesWonInput.value,
    ImageLink: imageLink.value
  };

  try {
    const response = await fetch("http://localhost:3000/drivers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDriver),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      window.location.href = 'driver.html';
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  } catch (error) {
    console.error("An error occurred while adding the driver:", error);
  }
}
