const form = document.querySelector('.add-form');

form.addEventListener("submit", addTeam);

async function addTeam(event) {
  event.preventDefault();

  const logoImageLink = document.getElementById("logo-image-link").value;
  const teamChiefImageLink = document.getElementById("team-principal-logo-image-link").value;
  const teamNameInput = document.getElementById("team-name").value;
  const teamChiefNameInput = document.getElementById("team-principal-name").value;

  const newTeam = {
    LogoImageLink: logoImageLink,
    TeamChiefImageLink: teamChiefImageLink,
    Name: teamNameInput,
    TeamChief: teamChiefNameInput,
  };

  if(validateTeam(newTeam)) {
    try {
      const response = await fetch("http://localhost:3000/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        window.location.href = 'team.html';
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("An error occurred while adding the team:", error);
    }
  }
}

function validateTeam(team) {
  if (!team.LogoImageLink || !team.TeamChiefImageLink || !team.Name || !team.TeamChief) {
    alert("Please fill in all required fields.");
    return false;
  }

  if (!isValidImageLink(team.LogoImageLink) || !isValidImageLink(team.TeamChiefImageLink)) {
    alert("Invalid image link. Please enter a valid URL.");
    return false;
  }

  return true
}
