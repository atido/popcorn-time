function initWatchElementsListener() {
  const watchElements = document.querySelectorAll(".watch");
  watchElements.forEach((watchElement) =>
    watchElement.removeEventListener("click", addWatchElementEventListener)
  );
  watchElements.forEach((watchElement) =>
    watchElement.addEventListener("click", addWatchElementEventListener)
  );
}
function initWatchListElementsListener() {
  const watchListElements = document.querySelectorAll(".watchList");
  watchListElements.forEach((watchListElement) =>
    watchListElement.removeEventListener("click", addWatchListElementEventListener)
  );
  watchListElements.forEach((watchListElement) =>
    watchListElement.addEventListener("click", addWatchListElementEventListener)
  );
}
function initRateElementsListener() {
  const rateElements = document.querySelectorAll(".rate");
  rateElements.forEach((rateElement) =>
    rateElement.removeEventListener("click", addRateElementEventListener)
  );
  rateElements.forEach((rateElement) =>
    rateElement.addEventListener("click", addRateElementEventListener)
  );
}
async function addWatchElementEventListener(event) {
  const movieId = event.currentTarget.getAttribute("data-id");
  const isBtn = event.currentTarget.classList.contains("btn");
  fetch(`/movie/${movieId}/watch`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isBtn }),
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        if (response.ok) {
          response
            .text()
            .then((html) => {
              const elementsById = document.querySelectorAll(`.watch[data-id='${movieId}']`);
              elementsById.forEach((element) => {
                element.outerHTML = html;
                element.addEventListener("click", addWatchElementEventListener);
              });
              initWatchElementsListener();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
async function addWatchListElementEventListener(event) {
  const movieId = event.currentTarget.getAttribute("data-id");
  const isBtn = event.currentTarget.classList.contains("btn");
  fetch(`/movie/${movieId}/watchList`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isBtn }),
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        if (response.ok) {
          response
            .text()
            .then((html) => {
              const elementsById = document.querySelectorAll(`.watchList[data-id='${movieId}']`);
              elementsById.forEach((element) => {
                element.outerHTML = html;
              });
              initWatchListElementsListener();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function addRateElementEventListener(event) {
  const movieId = event.currentTarget.getAttribute("data-id");
  const isBtn = event.currentTarget.classList.contains("btn");
  fetch(`/movie/${movieId}/rate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rate: 5, isBtn }),
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        if (response.ok) {
          response
            .text()
            .then((html) => {
              const elementsById = document.querySelectorAll(`.rate[data-id='${movieId}']`);
              elementsById.forEach((element) => {
                element.outerHTML = html;
              });
              initRateElementsListener();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
initWatchElementsListener();
initWatchListElementsListener();
initRateElementsListener();
