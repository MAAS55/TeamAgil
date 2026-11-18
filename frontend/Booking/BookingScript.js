let eventData;
const apiUrl = "http://localhost:5043/api/events/"
const apiEventList = document.querySelector("#bEvent")
const apiPlaceList = document.querySelector("#bPlace");

const apiStatus = document.querySelector("#api-status");


// Fetch data
async function fetchEventData(url) {

    apiEventList.replaceChildren();
    apiPlaceList.replaceChildren();

    let userMessage = "Kunde inte boka. Försök igen.";

    try{
        // fetch
        const response = await fetch(apiUrl);

        // Felhantering
        if (!response.ok){
            if (response.status === 404){
                userMessage = "Kunde inte boka."
            } else if (response.status >= 500 && response.status <= 599){
                userMessage = "Tjänsten har problem. försök igen";
            }
            throw new Error(`HTTP-fel: ${response.status}`);
        }
        // läser json
        const events = await response.json();

        if (events.length === 0){
            apiStatus.textContent = "finns inget evenemang att visas";
            return;
        }

        const defaultPlaceOpt = document.createElement("option");
        const defaultEventOpt = document.createElement("option");
        
        defaultEventOpt.textContent = "-- Välj plats --"
        defaultPlaceOpt.textContent = "-- Välj plats --";

        defaultEventOpt.value = "";
        defaultPlaceOpt.value = "";

        apiEventList.append(defaultEventOpt)
        apiPlaceList.append(defaultPlaceOpt);

        for (const event of events){
            const title = document.createElement("option");
            const place = document.createElement("option");

            title.textContent = event.title;
            place.textContent = event.venue;

            apiEventList.append(title);
            apiPlaceList.append(place);
        }

    } catch (error){
        console.error("Kunde inte hitta info");
        apiStatus.textContent = userMessage;
    }
}

fetchEventData();

// Bekräfta formulär
const confirmName = document.getElementById("c-name");
const confirmEmail = document.getElementById("c-email");
const confirmPhone = document.getElementById("c-phone");
const confirmEvent = document.getElementById("c-event");
const confirmTicket = document.getElementById("c-ticket");
const confirmDate = document.getElementById("c-date");
const confirmPlace = document.getElementById("c-place");

// Booking formulär
const form = document.querySelector("#eventForm");
const nameInput = document.querySelector("#bName");
const emailInput = document.querySelector("#bEmail");
const phoneInput = document.querySelector("#bPhone");
const eventSelect = document.querySelector("#bEvent");
const ticketSelect = document.querySelector("#bTicket");
const dateInput = document.querySelector("#bDate");
const placeSelect = document.querySelector("#bPlace");

// Receipt
const nameDisplay = document.querySelector("#receipt-info");

// Feedback
const feedback = document.querySelector("#formFeedback")

form.addEventListener("submit", event => {
    event.preventDefault();

    // Läsa värde
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const eventSelects = eventSelect.value;
    const ticket = ticketSelect.value;
    const date = dateInput.value;
    const place = placeSelect.value;

    // Popup
    const popup = document.querySelector("#popup-container");

    if(name === "" || email === "" || phone === "" || eventSelects === "" || ticket === "" || date === "" || place === "") {
        feedback.textContent = "Vänligen fyll i alla fält.";
        feedback.classList.add("error");
        feedback.classList.remove("success");
        return;
    }

    feedback.textContent = "Tack för din bokning!";
    feedback.classList.add("success");
    feedback.classList.remove("error");

    // Receipt / Sparad data
    const receipt = {
        name: name,
        email: email,
        phone: phone,
        eventSelects: eventSelects,
        ticket: ticket,
        date: date,
        place: place
    };
    localStorage.setItem('bookingData', JSON.stringify(receipt));

    popup.classList.add("show-popup")
        
    confirmName.textContent = name;
    confirmEmail.textContent = email;  
    confirmPhone.textContent = phone;
    confirmEvent.textContent = eventSelects;
    confirmTicket.textContent = ticket;
    confirmDate.textContent = date;
    confirmPlace.textContent = place;
});

// Popup
const close = document.querySelector("#close-button");
const open = document.querySelector("#open-button");
const popup = document.querySelector("#popup-container");
// Aktivera popup

function cancelConfirm(){
    console.log("CALAKASDKAD");
    popup.classList.remove("show-popup");
}
function acceptConfirm(){
    console.log("link worjasadapnasd");
    window.location.href = 'Receipt/Receipt.html';
}