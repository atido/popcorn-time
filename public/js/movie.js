const watchElements = document.querySelectorAll(".watch");
const watchListElements = document.querySelectorAll(".watchList");

watchElements.forEach((watchElement) =>
  watchElement.addEventListener("click", async (event) => {
    const movieId = event.currentTarget.getAttribute("data-id");
    const response = await fetch(`/movie/${movieId}/watch`, {
      method: "POST",
    });
    if (response.ok) {
      const watchElementsById = document.querySelectorAll(`.watch[data-id='${movieId}']`);
      watchElementsById.forEach((element) => element.classList.toggle("selected"));
    }
  })
);

watchListElements.forEach((addWatchListElement) =>
  addWatchListElement.addEventListener("click", async (event) => {
    const movieId = event.currentTarget.getAttribute("data-id");
    const response = await fetch(`/movie/${movieId}/addWatchList`, {
      method: "POST",
    });
    if (response.ok) {
      const watchListElementsById = document.querySelectorAll(`.watchList[data-id='${movieId}']`);
      watchListElementsById.forEach((element) => element.classList.toggle("selected"));
    }
  })
);
