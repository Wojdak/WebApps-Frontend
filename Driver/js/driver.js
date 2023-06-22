getDrivers();

async function getDrivers() {
  try {
    const response = await fetch("http://localhost:3000/drivers");
    const data = await response.json();
    displayDrivers(data);
  } catch (error) {
    console.error(error);
  }
}

const filterButton = document.getElementById("filter-button");
const removeFilterButton = document.getElementById("remove-filter-button");

filterButton.addEventListener("click", filterDrivers);

removeFilterButton.addEventListener("click", ()=>{
  document.getElementById("filter-value").value="";
  getDrivers();
  filterButton.classList.remove("invisible");
  removeFilterButton.classList.add("invisible");
});

async function filterDrivers() {
  const nationality = document.getElementById("filter-value").value;
  //console.log(nationality);

  if(nationality == "") {
    alert("Nationality cannot be null.");
    window.location.href = 'driver.html';
  }

  filterButton.classList.add("invisible");
  removeFilterButton.classList.remove("invisible");

  try {
    const response = await fetch(`http://localhost:3000/drivers?nationality=${nationality}`);
    const data = await response.json();
    displayDrivers(data);
  } catch (error) {
    console.error(error);
  }
}

function displayDrivers(drivers) {
  const imageContainer = document.querySelector(".items-container");
  imageContainer.innerHTML = "";

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

    deleteSpan.addEventListener("click", () => {
      deleteDriver(driver.ID);
    });

    imageContainer.appendChild(itemDiv);
  });
}

async function deleteDriver(driverID) {
  try {
    const response = await fetch(`http://localhost:3000/drivers/${driverID}`, {
      method: "DELETE"
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
    console.error("An error occurred while deleting the driver:", error);
  }
}