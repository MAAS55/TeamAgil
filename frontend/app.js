let eventData;

const apiUrl = "http://localhost:5043/api/test/error"

const eventList = document.querySelector("#eventList")
const filterStatus = document.querySelector("#filterStatus");
const filterLocation = document.querySelector("#filterLocation");
const filterCategory = document.querySelector("#filterCategory");
const filterOrganizer = document.querySelector("#filterOrganizer");
const filterForm = document.querySelector("#filterForm")

let isFiltered = false;

function displayData(eventData) {
    eventList.innerHTML = '';
    eventData.forEach(event => {
        let eventCard = document.createElement("article");
        eventCard.classList.add("event-card");
        eventCard.innerHTML = 
        `
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <img src="${event.eventImg}">
            <details open>
                <summary>Details</summary>
                <ul>
                    <li>Datum: ${event.startDate}</li>
                    <li>Tid: ${event.startTime}</li>
                    <li>Arrangör: ${event.organizer}</li>
                    <li>Kategori: ${event.category}</li>
                    <li>Plats: ${event.venue}, ${event.city}</li>
                </ul>
            </details>
            <a href="Booking/Booking.html">Boka här</a>
        `
        const btn = eventCard.querySelector("button");
        btn.addEventListener("click", () => renderDialog(event.id));
        eventList.appendChild(eventCard)
    });
}

function displayMessage(message) {
    eventList.innerHTML = '';
    let errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    eventList.appendChild(errorMessage)
}

function filterData(eventData, filter) {
    console.log("Running filterData")
    console.log(eventData, filter)
    return eventData.filter(element => {
        const matchesCategory = !filter.category || element.category === filter.category;
        const matchesLocation = !filter.location || element.city === filter.location;
        const matchesOrganizer = !filter.organizer || element.organizer === filter.organizer;

        return matchesCategory && matchesLocation && matchesOrganizer;
    });
}

let filterOptions = 
{
    location: [],
    category: [],
    organizer: []
} 
function addFilterOption(eventData) {
    if (filterOptions.category.length > 0) return;

    filterCategory.innerHTML = `<option value="">Choose Category</option>`;
    filterLocation.innerHTML = `<option value="">Choose Location</option>`;
    filterOrganizer.innerHTML = `<option value="">Choose Organizer</option>`;
    
    for (const element of eventData) {
       
        if (!filterOptions.category.includes(element.category)) {
        filterOptions.category.push(element.category)
        
        let option = document.createElement('option');
        option.textContent = element.category
        filterCategory.appendChild(option)
       } 

       if (!filterOptions.location.includes(element.city)) {
        filterOptions.location.push(element.city)
        let option = document.createElement('option');
        option.textContent = element.city
        filterLocation.appendChild(option)
       }

       if (!filterOptions.organizer.includes(element.organizer)) {
        filterOptions.organizer.push(element.organizer)
        let option = document.createElement('option');
        option.textContent = element.organizer
        filterOrganizer.appendChild(option)
       }
    }
}

function transformRawData(rawFetchData) {

    let fetchData = rawFetchData.map((element) => {
        let address = element.venue.split(",");
        const eventDateObj = new Date(element.startsAt);
            // Output: "12 dec. 2026" (or "12 december 2026" if month: 'long')
        const date = eventDateObj.toLocaleDateString('sv-SE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Output: "10:30"
        const time = eventDateObj.toLocaleTimeString('sv-SE', {
            hour: '2-digit',
            minute: '2-digit'
        });
        return({
            id: element.id,
            title: element.title,
            description: element.description,
            category: element.category,
            organizer: element.organizer,
            startDate: date,
            startTime: time,
            city: address[1].trim(),
            venue: address[0]
        });
    })
    return fetchData;
}

async function loadData() {
    try {
            let rawFetchData = await fetchEventData(apiUrl);
            console.log(rawFetchData)
            if (rawFetchData.length > 0) {
                let fetchData = transformRawData(rawFetchData);
                eventData = fetchData;
                addFilterOption(fetchData);

                if(filterStatus.checked === true) {        
                    let filterDataResult = filterData(fetchData, {location: filterLocation.value, category: filterCategory.value, organizer: filterOrganizer.value})
                    if (filterDataResult.length) {
                        displayData(filterDataResult)
                    } else {
                        displayMessage("Kunde inte hitta några event med dessa filter")
                    }

                } else {
                    displayData(fetchData);
                }
            } else {
                displayMessage("Det finns inga evenemang att ladda in")
            }
    } catch (error) {
        displayMessage("Ett fel uppstod vid hämtning av data")
    }

}

async function fetchEventData(url) {
    try {
    displayMessage("Loading data... ")
    const response = await fetch(url, {
      method: 'GET', // 'POST', 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok || response.status === 404) {
      throw new Error(`HTTP error! Status: ${response.status}`);    
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

filterForm.addEventListener("input", loadData);

// Sök Funktion

const searchInput = document.querySelector("#searchinput");
const suggestionList = document.querySelector("#suggestionList");

function showSuggestions(searchWord) {
    suggestionList.innerHTML = "";

    if (searchWord === "") {
        suggestionList.style.display = "none";
        return;
    }

    const matches = eventData.filter(function (event) {
        console.log(`showSuggestions: ${event}`)
        return event.title.toLowerCase().includes(searchWord);
    });

    matches.forEach(function (event) {
        suggestionList.innerHTML += `<li>${event.title}</li>`;
    });

    suggestionList.style.display = "block";
}

function showFilteredEvents(searchWord) {
    console.log("running ShowFilteredEvents")
    const filtered = eventData.filter(function (event) {
        return event.title.toLowerCase().includes(searchWord);
    });

    if (filtered.length === 0) {
        eventList.innerHTML = "<p>Inga evenemang hittades.</p>";
    } else {
        displayData(filtered);
    }   
}

// Typing:
searchInput.addEventListener("input", function () {
    showSuggestions(searchInput.value.toLowerCase());
});
searchInput.addEventListener("focus", function() {
    showAllSuggestions();
});

function showAllSuggestions() {
    suggestionList.innerHTML = "";
    eventData.forEach(function (event) {
        suggestionList.innerHTML += `<li><span>${event.title}</span><br> ${event.category}</li>`;
    });
    suggestionList.style.display = "block";
}

// Sök button
const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    showSuggestions("");
    showFilteredEvents(searchInput.value.toLowerCase());
});

// click
suggestionList.addEventListener("click", function (event) {
    const clickedTitle = event.target.closest("li").querySelector("span").textContent;
    searchInput.value = clickedTitle;
    showSuggestions("");
    showFilteredEvents(clickedTitle.toLowerCase());
});


// Event Popup
const dialog = document.querySelector("#dialog");

function openDialog() {
  dialog.log(dialog.open ? "Dialog: open" : "Dialog: closed");
}

function renderDialog(id) {
    let event = eventData.find(e => e.id === id);
    const eventTitle = document.querySelector("#eventTitle");
    const eventCategory = document.querySelector("#eventCategory");
    const eventDate = document.querySelector("#eventDate");
    const eventTime = document.querySelector("#eventTime");
    const eventLocation = document.querySelector("#eventLocation");
    const eventDesc = document.querySelector("#eventDesc");
    const eventOrganizer = document.querySelector("#eventOrganizer");
    const mapFrame = document.querySelector("#mapFrame");

    eventTitle.textContent = event.title;
    eventCategory.textContent = event.category
    eventDate.textContent = event.startDate
    eventTime.textContent = event.startTime
    eventLocation.textContent = `${event.venue}, ${event.city}`
    eventDesc.textContent = event.description
    eventOrganizer.textContent = event.organizer
    
    mapFrame.src = `https://www.google.com/maps?q=${event.venue}+${event.city}&output=embed`
    

    dialog.showModal();
}

loadData();

/*
eventcard.forEach((card) => {
  card.addEventListener("click", () => {
    dialog.showModal();
    opencheck(dialog);
    });https://github.com/MAAS55/TeamAgil/pull/57/conflict?name=frontend%252Fapp.js&ancestor_oid=7770a189b2e6338a58b79c002ebd445b775fb569&base_oid=55684d3edcff3bfd3441812a926d8381de1f2ac0&head_oid=7aa8a1fd414e8edca1cb837815f2755b77ea5b55
  });

  dialog.addEventListener("close", () => {
    opencheck(dialog);
  });

const bookingButton = document.getElementById("booking-button");

const button = document.createElement("button");
button.type = "submit";
button.textContent = "Boka";

bookingButton.appendChild(button);
*/
// -----------------------------
// 7. Organizers (only runs on a page with #organizerList)
// -----------------------------
const organizers = [
    { name: "Simon", role: "Produkt ägare", bio: "vi älskar Event flow", img: "..." },
    { name: "Mark", role: "scrum master", bio: "vi älskar Event flow", img: "..." },
    { name: "Doan", role: "team leader", bio: "vi älskar Event flow", img: "..." }
];

function loadOrganizers(organizers){  
    const target =document.querySelector("#organizerList");
    if(!target)return;
    target.innerHTML="";
    organizers.forEach(organizer => {
        const card =document.createElement("article");
        card.innerHTML=`
    <img src="${organizer.img}" alt="${organizer.name}">
    <h3>${organizer.name}</h3>
    <p>${organizer.role}</p>
    <p>${organizer.bio}</p>`;
        target.appendChild(card);
    });
}
loadOrganizers(organizers);