getDrivers();

async function getDrivers() {
  const response = await fetch("http://localhost:3000/drivers");
  const data = await response.json();

  displayDrivers(data);
  console.log(data);
}

function displayDrivers(drivers) {
  const imageContainer = document.querySelector(".items-container");

  drivers.forEach((driver) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const img = document.createElement("img");
    img.src = driver.ImageLink;
    itemDiv.appendChild(img);

    const link = document.createElement("a");
    link.href = `driver-info.html?driverID=${driver.ID}`;
    const h3 = document.createElement("h3");
    h3.textContent = driver.Name;
    link.appendChild(h3);
    itemDiv.appendChild(link);

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "item-icons";
    itemDiv.appendChild(iconsDiv);

    const editSpan = document.createElement("span");
    editSpan.className = "edit-icon";
    const editLink = document.createElement("a");
    editLink.href = `driver-edit.html?driverID=${driver.ID}`;
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

    imageContainer.appendChild(itemDiv);
  });
}
