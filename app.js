   console.log("JS är kopplat!");

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

const bookingButton = document.getElementById("booking-button");

const button = document.createElement("button");
button.type = "submit";
button.textContent = "Boka";

bookingButton.appendChild(button);