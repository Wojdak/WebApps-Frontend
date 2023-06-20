getTeams();

async function getTeams() {
  try {
    const response = await fetch("http://localhost:3000/teams");
    const data = await response.json();
    displayTeams(data);
  } catch (error) {
    console.error(error);
  }
}

function displayTeams(teams) {
  const imageContainer = document.querySelector(".items-container");

  teams.forEach((team) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const img = document.createElement("img");
    img.src = team.LogoImageLink;
    itemDiv.appendChild(img);

    const link = document.createElement("a");
    link.href = `team-info.html?teamID=${team.ID}`;
    const h3 = document.createElement("h3");
    h3.textContent = team.Name;
    link.appendChild(h3);
    itemDiv.appendChild(link);

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "item-icons";
    itemDiv.appendChild(iconsDiv);

    const editSpan = document.createElement("span");
    editSpan.className = "edit-icon";
    const editLink = document.createElement("a");
    editLink.href = `team-edit.html?teamID=${team.ID}`;
    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square";
    editLink.appendChild(editIcon);
    editSpan.appendChild(editLink);
    iconsDiv.appendChild(editSpan);

    const deleteSpan = document.createElement("span");
    deleteSpan.className = "delete-icon";
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash";
    deleteSpan.appendChild(deleteIcon);
    iconsDiv.appendChild(deleteSpan);

    deleteSpan.addEventListener("click", () => {
      deleteTeam(team.ID);
    });

    imageContainer.appendChild(itemDiv);
  });
}

async function deleteTeam(teamID) {
  try {
    const response = await fetch(`http://localhost:3000/teams/${teamID}`, {
      method: "DELETE"
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
    console.error("An error occurred while deleting the team:", error);
  }
}