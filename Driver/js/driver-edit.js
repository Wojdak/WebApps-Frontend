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
  document.getElementById("racing-number").value = driver.RacingNumber;

  const teamSelect = document.getElementById("team");
  const teamsResponse = await fetch("http://localhost:3000/teams");
  const teams = await teamsResponse.json();

  teams.forEach((team) => {
    const option = document.createElement("option");
    option.value = team.ID;
    option.textContent = team.Name;

    if (team.ID === driver.TeamID) {
      option.selected = true;
    }

    teamSelect.appendChild(option);
  });
}

form.addEventListener("submit", updateDriver);

async function updateDriver(event) {
  event.preventDefault();

  const imageLink = document.getElementById("image-link").value;
  const name = document.getElementById("name").value;
  const nationality = document.getElementById("nationality").value;
  const team = parseInt(document.getElementById("team").value);
  const racingNumber = document.getElementById("racing-number").value;


  const updatedDriver = {
    Name: name,
    Nationality: nationality,
    TeamID: team,
    RacingNumber: racingNumber,
    ImageLink: imageLink,
  };

  if(validateDriver(updatedDriver)){
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
  
}

function validateDriver(driver) {
  if (!driver.ImageLink || !driver.Name || !driver.Nationality || !driver.RacingNumber) {
    alert("Please fill in all required fields.");
    return false;
  }

  if (!isValidImageLink(driver.ImageLink)) {
    alert("Invalid image link. Please enter a valid URL.");
    return false;
  }

  if (!isValidNumber(driver.RacingNumber)) {
    alert("Invalid racing number. Please enter a numeric value.");
    return false;
  }

  return true
}
