let editButton = document.querySelector(".edit-button-submit");
let addButton = document.querySelector(".add-button-submit");

if(addButton != null){
    addButton.addEventListener("click", ()=>{
        alert("New item added");
    })
}

if(editButton != null) {
    editButton.addEventListener("click", ()=>{
        alert("Edit was successful");
    })    
}


