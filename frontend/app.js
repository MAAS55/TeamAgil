let eventData = 
[
    {
      eventId: 1,
      eventTitle: "Jazz Concert",
      eventDesc: "Live jazz performance",
      eventLocation: "Sundsvall",
      eventDate: "2026-10-12 12:00",
      eventOrganizer: "Sunsdvall Jazzklubb",
      eventCategory: "Music",
      eventImg: "./images/filip-mishevski-TP4VTvjxEmo-unsplash.jpg"
    },
    {
      eventId: 2,
      eventTitle: "Rock Concert",
      eventDesc: "Kizz live band",
      eventLocation: "Sundsvall",
      eventDate: "2026-11-05 05:00",
      eventOrganizer: "Nordic Events AB",
      eventCategory: "Music",
      eventImg: "./images/roberto-rendon--Ma-aFuivjs-unsplash.jpg"
    },
    {
      eventId: 3,
      eventTitle: "Höstcupen i Fotboll",
      eventDesc: "Lokal fotbollsturnering för juniorer",
      eventLocation: "Stockholm",
      eventDate: "2026-11-12 14:00",
      eventOrganizer: "Nordic Events AB",
      eventCategory: "Sport",
      eventImg: "./images/omar-ramadan-eEhOyEtBGMQ-unsplash.jpg"
    },
    {
      eventId: 4,
      eventTitle: "Höstcupen i Fotboll",
      eventDesc: "Lokal fotbollsturnering för juniorer",
      eventLocation: "Sundsvall",
      eventDate: "2026-11-12 14:00",
      eventOrganizer: "Nordic Events AB",
      eventCategory: "Sport",
      eventImg: "./images/omar-ramadan-eEhOyEtBGMQ-unsplash.jpg"
    },
  ];

const apiUrl = "http://localhost:5043/api/events"

const eventList = document.querySelector("#eventList")
const filterStatus = document.querySelector("#filterStatus");
const filterLocation = document.querySelector("#filterLocation");
const filterCategory = document.querySelector("#filterCategory");
const filterOrganizer = document.querySelector("#filterOrganizer");
const filterForm = document.querySelector("#filterForm")

let isFiltered = false;
// Booking formulär
const form = document.querySelector("#eventForm");
const nameInput = document.querySelector("#bName");
const emailInput = document.querySelector("#bEmail");
const phoneInput = document.querySelector("#bPhone");
const eventSelect = document.querySelector("#bEvent");
const feedback = document.querySelector("#formFeedback")

function displayData(eventData) {
    eventList.innerHTML = '';
    eventData.forEach(event => {
        //const [date, time] = event.eventDate.split(" ");

        const eventDateObj = new Date(event.startsAt);
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
                    <li>Datum: ${date}</li>
                    <li>Tid: ${time}</li>
                    <li>Arrangör: ${event.organizer}</li>
                    <li>Kategori: ${event.category}</li>
                    <li>Plats: ${event.venue}</li>
                </ul>
            </details>
            <a href="#booking">Boka här</a>
        `
        eventList.appendChild(eventCard)
    });
}

function displayError(message) {
    eventList.innerHTML = '';
    let errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    eventList.appendChild(errorMessage)
}

function filterData(eventData, filter) {
    return eventData.filter(element => {
        const matchesCategory = !filter.category || element.eventCategory === filter.category;
        const matchesLocation = !filter.location || element.eventLocation === filter.location;
        const matchesOrganizer = !filter.organizer || element.eventOrganizer === filter.organizer;

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

       if (!filterOptions.location.includes(element.venue)) {
        filterOptions.location.push(city)
        let option = document.createElement('option');
        option.textContent = city
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
    for (const data of rawFetchData) {
        let address = rawFetchData.venue.split(",");
    
        const eventDateObj = new Date(rawFetchData.startsAt);
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
    }
    
    
    
}

async function loadData() {
    console.log("running loadData")
    let rawFetchData = await fetchEventData(apiUrl);
    let fetchData = transformRawData(rawFetchData); 
    
    addFilterOption(fetchData);

    if(filterStatus.checked === true) {        
        let filterDataResult = filterData(fetchData, {location: filterLocation.value, category: filterCategory.value, organizer: filterOrganizer.value})
        if (filterDataResult.length) {
            displayData(filterDataResult)
        } else {
            displayError("Kunde inte hitta några event med dessa filter")
        }

        
    } else {
        displayData(fetchData);
    }
}

async function fetchEventData(url) {
    console.log("running fetch event")
    try {
    const response = await fetch(url, {
      method: 'GET', // 'POST', 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Check if HTTP status is in the 200–299 range
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}


form.addEventListener("submit", event => {
    event.preventDefault();

    // Läsa värde
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const eventSelects = eventSelect.value;

    if(name === "" || email === "" || phone === "" || eventSelects === "") {
        feedback.textContent = "Vänligen fyll i alla fält.";
        feedback.classList.add("error");
        feedback.classList.remove("success");
        return;
    }

    feedback.textContent = "Tack för din bokning!";
    feedback.classList.add("success");
    feedback.classList.remove("error");
});

filterForm.addEventListener("input", loadData);