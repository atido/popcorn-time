const watchElements = document.querySelectorAll(".watch");
const addWatchListElements = document.querySelectorAll(".addWatchList");

watchElements.forEach((watchElement) =>
  watchElement.addEventListener("click", async (event) => {
    const clickedElement = event.currentTarget;
    const movieId = clickedElement.getAttribute("data-id");
    const response = await fetch(`/movie/${movieId}/watch`, {
      method: "POST",
    });
    if (response.ok) {
      clickedElement.classList.toggle("selected");
    }
  })
);

addWatchListElements.forEach((addWatchListElement) =>
  addWatchListElement.addEventListener("click", async (event) => {
    const response = await fetch(`/movie/${movieId}/addWatchList`, {
      method: "POST",
    });
  })
);
