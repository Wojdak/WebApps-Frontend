getRaces();

async function getRaces() {
  try {
    const response = await fetch("http://localhost:3000/races");
    const data = await response.json();
    displayRaces(data);
  } catch (error) {
    console.error(error);
  }
}

function displayRaces(races) {
  const imageContainer = document.querySelector(".items-container");

  races.forEach((race) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const img = document.createElement("img");
    img.src = race.ImageLink;
    itemDiv.appendChild(img);

    const link = document.createElement("a");
    link.href = `race-info.html?raceID=${race.ID}`;
    const h3 = document.createElement("h3");
    h3.textContent = race.RaceName;
    link.appendChild(h3);
    itemDiv.appendChild(link);

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "item-icons";
    itemDiv.appendChild(iconsDiv);

    const editSpan = document.createElement("span");
    editSpan.className = "edit-icon";
    const editLink = document.createElement("a");
    editLink.href = `race-edit.html?raceID=${race.ID}`;
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
      deleteRace(race.ID);
    });

    imageContainer.appendChild(itemDiv);
  });
}

async function deleteRace(raceID) {
  try {
    const response = await fetch(`http://localhost:3000/races/${raceID}`, {
      method: "DELETE"
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
    console.error("An error occurred while deleting the race:", error);
  }
}
