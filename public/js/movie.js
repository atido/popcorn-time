const watchElements = document.querySelectorAll(".watch");
const watchListElements = document.querySelectorAll(".watchList");

watchElements.forEach((watchElement) =>
  watchElement.addEventListener("click", async (event) => {
    const movieId = event.currentTarget.getAttribute("data-id");
    fetch(`/movie/${movieId}/watch`, {
      method: "POST",
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          if (response.ok) {
            const watchElementsById = document.querySelectorAll(`.watch[data-id='${movieId}']`);
            watchElementsById.forEach((element) => element.classList.toggle("selected"));
          }
        }
      })
      .catch(function (err) {
        console.info(err);
      });
  })
);

watchListElements.forEach((addWatchListElement) =>
  addWatchListElement.addEventListener("click", async (event) => {
    const movieId = event.currentTarget.getAttribute("data-id");
    fetch(`/movie/${movieId}/addWatchList`, {
      method: "POST",
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          if (response.ok) {
            const watchListElementsById = document.querySelectorAll(
              `.watchList[data-id='${movieId}']`
            );
            watchListElementsById.forEach((element) => element.classList.toggle("selected"));
          }
        }
      })
      .catch(function (err) {
        console.info(err);
      });
  })
);
