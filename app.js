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

