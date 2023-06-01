const rateModal = document.getElementById("rateModal");

rateModal.addEventListener("close", function onClose() {
  const movieId = rateModal.getAttribute("data-id");
  fetch(`/movie/${movieId}/rate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rate: rateModal.returnValue, isBtn: true }),
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
});

const ratingHeartsElements = [...document.getElementsByClassName("rating__heart")];

function executeRating(heartsElement) {
  const activeClass = "rating__heart icon icon--red";
  const inactiveClass = "rating__heart icon";

  let i;
  heartsElement.forEach((heartElement) => {
    heartElement.addEventListener("mouseover", (event) => {
      i = heartsElement.indexOf(heartElement);

      if (heartElement.className === inactiveClass) {
        for (i; i >= 0; --i) heartsElement[i].className = activeClass;
      } else {
        for (i; i < heartsElement.length; ++i) heartsElement[i].className = inactiveClass;
      }
    });
  });
}
function initRateElementsListener() {
  const rateElements = document.querySelectorAll(".rate");
  rateElements.forEach((rateElement) =>
    rateElement.addEventListener("click", () => rateModal.showModal())
  );
}
initRateElementsListener();
executeRating(ratingHeartsElements);
