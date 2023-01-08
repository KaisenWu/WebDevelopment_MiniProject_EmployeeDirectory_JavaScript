// Declare an empty array to store the employee info.
let infoArray = [];
// Get the modal element.
let modal = document.querySelector(".modal-container");
// Set the element as invisible.
modal.style.visibility='hidden';
// Declare an empty string to store the mocal html string.
let modalStr = "";

// Define the function to show modal.
function showModal() {
    // Set the modal visible.
    modal.style.visibility='visible';
    // Get index by selected card's id.
    let objId = this.id;
    // Extract employee's info from the array.
    let obj = infoArray[objId];
    // Get informarion.
    let modalImgUrl = obj.imgURL;
    let modalName = obj.name;
    let modalEmail = obj.email;
    let modalCity = obj.city;
    let modalPhone = obj.phone;
    let modalDob = obj.dob;
    let modalAddress = obj.address;
    // Replace the modal html by the new information.
    modal.innerHTML = `<div class="modal"><button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button><div class="modal-info-container"><img class="modal-img" src=${modalImgUrl} alt="profile picture"><h3 id="name" class="modal-name cap">${modalName}</h3><p class="modal-text">${modalEmail}</p><p class="modal-text cap">${modalCity}</p><hr><p class="modal-text">${modalPhone}</p><p class="modal-text">${modalAddress}</p><p class="modal-text">Birthday: ${modalDob}</p></div></div>`;
    // Get the close modal btn.
    let modalCloseBtn = document.querySelector("#modal-close-btn");
    // Add the close function to the btn.
    modalCloseBtn.addEventListener("click",blockModal);
}

// Define the function to close the modal.
function blockModal() {
    modal.style.visibility='hidden';
}

// Define the function to display the student from API.
async function showStudentCard() {
    // Defien an empty string to store the html content.
    let cardStr = "";
    // Define 12 cards.
    for(let i=0; i<12; i++) {
        // Get student data from the API URL.
        const stn = await getStudentData();
        let imgURL = stn.results[0].picture.large;
        let name = stn.results[0].name.first + " " + stn.results[0].name.last
        let email = stn.results[0].email
        let cityState = stn.results[0].location.city + ", " + stn.results[0].location.state;
        let dob = stn.results[0].dob.date.substring(0,10);
        let city = stn.results[0].location.city;
        let phone = stn.results[0].phone;
        let address = stn.results[0].location.street.number + " " + stn.results[0].location.street.name + ", " + cityState + " " + stn.results[0].location.postcode;
        let infoObj = {
                        "id":i,
                        "imgURL":imgURL,
                        "name": name,
                        "email": email,
                        "cityState": cityState,
                        "dob": dob,
                        "city": city,
                        "phone": phone,
                        "address": address
                    }
        // Push the student info to array.
        infoArray.push(infoObj);
        // Append the new html content to cards string.
        cardStr += `<div class="card" id=${i}><div class="card-img-container"><img class="card-img" src=${imgURL} alt="profile picture"></div><div class="card-info-container"><h3 id="name" class="card-name cap">${name}</h3><p class="card-text">${email}</p><p class="cardCity">${cityState}</p></div></div>` ;
    }
    // Replace the gallery html content by the new cards.
    document.querySelector(".gallery").innerHTML = cardStr;
    // Get all cards element.
    let cards = document.getElementsByClassName("card");
    // Add click action to each card.
    for(let i=0; i<cards.length; i++) {        
        cards[i].addEventListener("click", showModal);
    }
    
}

// Define the function to get data from the API.
async function getStudentData() {
    return fetch('https://randomuser.me/api')
            .then((response) => response.json())
            .catch((err) => console.error(err));
}

// Cal the show student function.
showStudentCard();