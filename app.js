
const eventData = [
    {
        eventId: 1,
        eventTitle: "Jazz Concert",
        eventDesc: "Live jazz performance",
        eventLocation: "Sundsvall",
        eventDate: "2026-10-12 12:00",
        eventOrganizer: "Sundsvall Jazzklubb",
        eventCategory: "Music",
        eventImg: "./images/filip-mishevski-TP4VTvjxEmo-unsplash.jpg"
    },
    {
        eventId: 2,
        eventTitle: "Rock Concert",
        eventDesc: "Kiss live band",
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
    }
];

// -----------------------------
// 2. Grab the main elements
// -----------------------------
const eventList = document.querySelector("#eventList");
const searchInput = document.querySelector("#searchinput");
const suggestionList = document.querySelector("#suggestionList");
const searchForm = document.querySelector(".search-form");
const dialog = document.querySelector("#eventDialog");
const closeDialog = document.querySelector("#closeDialog");

// -----------------------------
// 3. Render the event cards
// -----------------------------
function loadAllData(events) {
    eventList.innerHTML = "";

    events.forEach(event => {
        const eventCard = document.createElement("article");
        eventCard.classList.add("event-card");
        eventCard.dataset.eventId = event.eventId;

        eventCard.innerHTML = `
            <img src="${event.eventImg}" alt="${event.eventTitle}">
            <h3>${event.eventTitle}</h3>
            <p>${event.eventDesc}</p>
            <a href="#booking">Boka här</a>
        `;

        eventList.appendChild(eventCard);
    });
}

loadAllData(eventData);

// -----------------------------
// 4. Search dropdown and filtering
// -----------------------------
function showSuggestions(searchWord) {
    suggestionList.innerHTML = "";

    if (searchWord === "") {
        suggestionList.style.display = "none";
        return;
    }

    const matches = eventData.filter(event =>
        event.eventTitle.toLowerCase().includes(searchWord)
    );

    matches.forEach(event => {
        suggestionList.innerHTML += `<li><span>${event.eventTitle}</span><br>${event.eventCategory}</li>`;
    });

    suggestionList.style.display = "block";
}

function showAllSuggestions() {
    suggestionList.innerHTML = "";

    eventData.forEach(event => {
        suggestionList.innerHTML += `<li><span>${event.eventTitle}</span><br>${event.eventCategory}</li>`;
    });

    suggestionList.style.display = "block";
}

function showFilteredEvents(searchWord) {
    const filtered = eventData.filter(event =>
        event.eventTitle.toLowerCase().includes(searchWord)
    );

    if (filtered.length === 0) {
        eventList.innerHTML = "<p>Inga evenemang hittades.</p>";
    } else {
        loadAllData(filtered);
    }
}

searchInput.addEventListener("input", function () {
    showSuggestions(searchInput.value.toLowerCase());
});

searchInput.addEventListener("focus", function () {
    showAllSuggestions();
});

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    showSuggestions("");
    showFilteredEvents(searchInput.value.toLowerCase());
});

suggestionList.addEventListener("click", function (event) {
    const li = event.target.closest("li");
    if (!li) return;

    const clickedTitle = li.querySelector("span").textContent;
    searchInput.value = clickedTitle;
    showSuggestions("");
    showFilteredEvents(clickedTitle.toLowerCase());
});

// -----------------------------
// 5. Event card click opens the dialog
// -----------------------------
eventList.addEventListener("click", function (event) {
    if (event.target.closest("a")) return;

    const card = event.target.closest(".event-card");
    if (!card) return;

    const eventId = Number(card.dataset.eventId);
    const selectedEvent = eventData.find(e => e.eventId === eventId);
    if (!selectedEvent) return;

    const [date, time] = selectedEvent.eventDate.split(" ");

    document.querySelector("#dialogTitle").textContent = selectedEvent.eventTitle;
    document.querySelector("#dialogDesc").textContent = selectedEvent.eventDesc;
    document.querySelector("#dialogImg").src = selectedEvent.eventImg;
    document.querySelector("#dialogImg").alt = selectedEvent.eventTitle;
    document.querySelector("#dialogDate").textContent = date;
    document.querySelector("#dialogTime").textContent = time;
    document.querySelector("#dialogOrganizer").textContent = selectedEvent.eventOrganizer;
    document.querySelector("#dialogCategory").textContent = selectedEvent.eventCategory;
    document.querySelector("#dialogLocation").textContent = selectedEvent.eventLocation;

    dialog.showModal();
});

closeDialog.addEventListener("click", function () {
    dialog.close();
});

dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});

// -----------------------------
// 6. Booking form
// -----------------------------
const form = document.querySelector("#eventForm");
const nameInput = document.querySelector("#bName");
const emailInput = document.querySelector("#bEmail");
const phoneInput = document.querySelector("#bPhone");
const eventSelect = document.querySelector("#bEvent");
const feedback = document.querySelector("#formFeedback");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const chosenEvent = eventSelect.value;

    if (name === "" || email === "" || phone === "" || chosenEvent === "") {
        feedback.textContent = "Vänligen fyll i alla fält.";
        feedback.classList.add("error");
        feedback.classList.remove("success");
        return;
    }

    feedback.textContent = "Tack för din bokning!";
    feedback.classList.add("success");
    feedback.classList.remove("error");
    form.reset();
});

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