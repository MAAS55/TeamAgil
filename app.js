   console.log("JS är kopplat!");

  const form = document.querySelector("#booking-form");  


  const nameInput = document.querySelector("#bname");
  const emailInput = document.querySelector("#bemail");
  const phoneInput = document.querySelector("#bPhone");
  const eventInput = document.querySelector("#bEvent");



const nameError = document.querySelector("#bname-error");
const emailError = document.querySelector("#bemail-error");
const phoneError = document.querySelector("#bPhone-error");
const eventError = document.querySelector("#bEvent-error");
const formError = document.querySelector("#form-message");

const dialog = document.querySelector("#dialog");
const eventcard = document.querySelectorAll(".event-card");
function openDialog() {
  dialog.log(dialog.open ? "Dialog: open" : "Dialog: closed");
}

eventcard.forEach((card) => {
  card.addEventListener("click", () => {
    dialog.showModal();
    opencheck(dialog);
    });
  });

  dialog.addEventListener("close", () => {
    opencheck(dialog);
  });

