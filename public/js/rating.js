const rateModal = document.getElementById("rateModal");
const openRateModal = document.getElementById("openRateModal");

if (openRateModal) {
  openRateModal.addEventListener("click", () => {
    rateModal.showModal();
  });
}

const ratingHeartsElements = [...document.getElementsByClassName("rating__heart")];

function executeRating(heartsElement) {
  const activeIcon = "mdi:heart";
  const inactiveIcon = "mdi:heart-outline";

  let i;
  heartsElement.forEach((heartElement) => {
    heartElement.addEventListener("mouseover", (event) => {
      i = heartsElement.indexOf(heartElement);

      if (heartElement.getAttribute("icon") === inactiveIcon) {
        for (i; i >= 0; --i) heartsElement[i].setAttribute("icon", activeIcon);
      } else {
        for (i; i < heartsElement.length; ++i) heartsElement[i].setAttribute("icon", inactiveIcon);
      }
    });
  });
}
executeRating(ratingHeartsElements);
