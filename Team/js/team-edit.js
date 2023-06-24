const form = document.querySelector(".add-form");
const urlParams = new URLSearchParams(window.location.search);
const teamID = urlParams.get("teamID");

getTeamDetails(teamID);

async function getTeamDetails(teamID) {
  const response = await fetch(`http://localhost:3000/teams/${teamID}`);
  const team = await response.json();

  document.getElementById("logo-image-link").value = team.LogoImageLink;
  document.getElementById("team-principallogo-image-link").value = team.TeamChiefImageLink;
  document.getElementById("team-name").value = team.Name;
  document.getElementById("team-principal-name").value = team.TeamChief;
}

form.addEventListener("submit", updateTeam);

async function updateTeam(event) {
  event.preventDefault();

  const logoImageLink = document.getElementById("logo-image-link").value;
  const teamchiefImageLink = document.getElementById("team-principallogo-image-link").value;
  const name = document.getElementById("team-name").value;
  const teamChief = document.getElementById("team-principal-name").value;

  const updatedTeam = {
    Name: name,
    TeamChief: teamChief,
    LogoImageLink: logoImageLink,
    TeamChiefImageLink: teamchiefImageLink
  };

  if(validateTeam(updatedTeam)) {
    try {
      const response = await fetch(`http://localhost:3000/teams/${teamID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTeam),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        window.location.href = "team.html";
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("An error occurred while updating the team:", error);
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