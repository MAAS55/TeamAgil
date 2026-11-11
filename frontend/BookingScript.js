// Booking formulär
const form = document.querySelector("#eventForm");
const nameInput = document.querySelector("#bName");
const emailInput = document.querySelector("#bEmail");
const phoneInput = document.querySelector("#bPhone");
const eventSelect = document.querySelector("#bEvent");
const ticketSelect = document.querySelector("#bTicket");
const dateInput = document.querySelector("#bDate");
const placeSelect = document.querySelector("#bPlace");

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

    if(name === "" || email === "" || phone === "" || eventSelects === "" || ticket === "" || date === "" || place === "") {
        feedback.textContent = "Vänligen fyll i alla fält.";
        feedback.classList.add("error");
        feedback.classList.remove("success");
        return;
    }

    feedback.textContent = "Tack för din bokning!";
    feedback.classList.add("success");
    feedback.classList.remove("error");
});
