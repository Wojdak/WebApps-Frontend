const form = document.querySelector(".add-form");
const urlParams = new URLSearchParams(window.location.search);
const driverID = urlParams.get("driverID");

getDriverDetails(driverID);

async function getDriverDetails(driverID) {
  const response = await fetch(`http://localhost:3000/drivers/${driverID}`);
  const driver = await response.json();

  document.getElementById("image-link").value = driver.ImageLink;
  document.getElementById("name").value = driver.Name;
  document.getElementById("nationality").value = driver.Nationality;
  document.getElementById("races-won").value = driver.RacesWon;
  document.getElementById("racing-number").value = driver.RacingNumber;
  document.getElementById("team").value = driver.Team;

}

form.addEventListener("submit", updateDriver);

async function updateDriver(event) {
  event.preventDefault();

  const imageLink = document.getElementById("image-link").value;
  const name = document.getElementById("name").value;
  const nationality = document.getElementById("nationality").value;
  const team = document.getElementById("team").value;
  const racingNumber = document.getElementById("racing-number").value;
  const racesWon = document.getElementById("races-won").value;

  const updatedDriver = {
    ID:parseInt(driverID),
    ImageLink: imageLink,
    Name: name,
    Nationality: nationality,
    Team: team,
    RacingNumber: racingNumber,
    RacesWon: racesWon,
  };

  try {
    const response = await fetch(`http://localhost:3000/drivers/${driverID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDriver),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      window.location.href = "driver.html";
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  } catch (error) {
    console.error("An error occurred while updating the driver:", error);
  }
}
