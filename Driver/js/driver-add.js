const form = document.querySelector('.add-form');

form.addEventListener("submit", addDriver);

async function populateTeamSelect() {
  try {
    const response = await fetch("http://localhost:3000/teams");
    const teams = await response.json();

    const teamSelect = document.getElementById("team");

    teams.forEach((team) => {
      const option = document.createElement("option");
      option.value = team.ID;
      option.textContent = team.Name;
      teamSelect.appendChild(option);
    });
  } catch (error) {
    console.error("An error occurred while fetching teams:", error);
  }
}

populateTeamSelect();

async function addDriver(event) {
  event.preventDefault();

  const imageLink = document.getElementById("image-link").value;
  const nameInput = document.getElementById("name").value;
  const nationalityInput = document.getElementById("nationality").value;
  const teamInput = parseInt(document.getElementById("team").value);
  const racingNumberInput = document.getElementById("racing-number").value;


  const newDriver = {
    Name: nameInput,
    Nationality: nationalityInput,
    TeamID: teamInput,
    RacingNumber: racingNumberInput,
    ImageLink: imageLink
  };

  if(validateDriver(newDriver)){
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
