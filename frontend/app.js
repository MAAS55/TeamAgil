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

const eventList = document.querySelector("#eventList")
const filterStatus = document.querySelector("#filterStatus");
const filterLocation = document.querySelector("#filterLocation");
const filterCategory = document.querySelector("#filterCategory");
const filterOrganizer = document.querySelector("#filterCategory");

let isFiltered = false;
// Booking formulär
const form = document.querySelector("#eventForm");
const nameInput = document.querySelector("#bName");
const emailInput = document.querySelector("#bEmail");
const phoneInput = document.querySelector("#bPhone");
const eventSelect = document.querySelector("#bEvent");
const feedback = document.querySelector("#formFeedback")

function displayData(eventData) {
    eventData.forEach(event => {
        const [date, time] = event.eventDate.split(" ");
        let eventCard = document.createElement("article");
        eventCard.innerHTML = 
        `
                <article class="event-card">
                    <h3>${event.eventTitle}</h3>
                    <p>${event.eventDesc}</p>
                    <img src="${event.eventImg}">
                    <details open>
                        <summary>Details</summary>
                        <ul>
                            <li>Datum: ${date}</li>
                            <li>Tid: ${time}</li>
                            <li>Arrangör: ${event.eventOrganizer}}</li>
                            <li>Kategori: ${event.eventCategory}</li>
                            <li>Plats: ${event.eventLocation}</li>
                        </ul>
                    </details>
                    <a href="#booking">Boka här</a>
                </article>
        `
        eventList.appendChild(eventCard)
    });
}

function filterData(eventData, filter) {
    return eventData.filter(element => {
        const matchesCategory = !filter.category || element.eventCategory === filter.category;
        const matchesLocation = !filter.location || element.eventLocation === filter.location;
        const matchesOrganizer = !filter.organizer || element.eventOrganizer === filter.organizer;

        return matchesCategory && matchesLocation && matchesOrganizer;
    });
}

function loadData() {
    if(isFiltered === true) {
        displayData(filterData(eventData, {location: "Sundsvall", category: "Music"}))
    } else {
        displayData(eventData);
    }
}

loadData();



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
