const eventData = [
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
];

const eventList = document.querySelector("#eventList");

function loadAllData(events) {
    eventList.innerHTML = "";
    events.forEach(event => {
        const [date, time] = event.eventDate.split(" ");
        let eventCard = document.createElement("article");
        eventCard.innerHTML = `
            <article class="event-card">
                <h3>${event.eventTitle}</h3>
                <p>${event.eventDesc}</p>
                <img src="${event.eventImg}">
                <details open>
                    <summary>Details</summary>
                    <ul>
                        <li>Datum: ${date}</li>
                        <li>Tid: ${time}</li>
                        <li>Arrangör: ${event.eventOrganizer}</li>
                        <li>Kategori: ${event.eventCategory}</li>
                        <li>Plats: ${event.eventLocation}</li>
                    </ul>
                </details>
                <a href="#booking">Boka här</a>
            </article>
        `;
        eventList.appendChild(eventCard);
    });
}

loadAllData(eventData);

const searchInput = document.querySelector("#searchinput");
const suggestionList = document.querySelector("#suggestionList");

function showSuggestions(searchWord) {
    suggestionList.innerHTML = "";

    if (searchWord === "") {
        suggestionList.style.display = "none";
        return;
    }

    const matches = eventData.filter(function (event) {
        return event.eventTitle.toLowerCase().includes(searchWord);
    });

    matches.forEach(function (event) {
        suggestionList.innerHTML += `<li>${event.eventTitle}</li>`;
    });

    suggestionList.style.display = "block";
}

function showFilteredEvents(searchWord) {
    const filtered = eventData.filter(function (event) {
        return event.eventTitle.toLowerCase().includes(searchWord);
    });

    if (filtered.length === 0) {
        eventList.innerHTML = "<p>Inga evenemang hittades.</p>";
    } else {
        loadAllData(filtered);
    }   
}

// Typing:
searchInput.addEventListener("input", function () {
    showSuggestions(searchInput.value.toLowerCase());
});
searchInput.addEventListener("focus", function(){
    showAllSuggestions();
    });

function showAllSuggestions() {
    suggestionList.innerHTML = "";
    eventData.forEach(function (event) {
        suggestionList.innerHTML += `<li><span>${event.eventTitle}</span><br> ${event.eventCategory}</li>`;
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


// Booking formulär
const form = document.querySelector("#eventForm");
const nameInput = document.querySelector("#bName");
const emailInput = document.querySelector("#bEmail");
const phoneInput = document.querySelector("#bPhone");
const eventSelect = document.querySelector("#bEvent");
const feedback = document.querySelector("#formFeedback");

form.addEventListener("submit", event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const eventSelects = eventSelect.value;

    if (name === "" || email === "" || phone === "" || eventSelects === "") {
        feedback.textContent = "Vänligen fyll i alla fält.";
        feedback.classList.add("error");
        feedback.classList.remove("success");
        return;
    }

    feedback.textContent = "Tack för din bokning!";
    feedback.classList.add("success");
    feedback.classList.remove("error");
});