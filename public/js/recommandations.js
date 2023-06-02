const recommandationBtnElement = document.querySelector("#refreshRecommandations");
const moviesRecommandationsElement = document.querySelector("#recommandations");
const loader = `<div id="loader"></div>`;

if (moviesRecommandationsElement) {
  initRecommandationsListener();
}

function initRecommandationsListener() {
  recommandationBtnElement.addEventListener("click", async () => {
    moviesRecommandationsElement.style.opacity = 0;
    setTimeout(() => {
      fetch(`/dashboard/refreshRecommandations`)
        .then((response) => {
          if (response.redirected) {
            window.location.href = response.url;
          } else {
            if (response.ok) {
              response
                .text()
                .then((html) => {
                  moviesRecommandationsElement.style.opacity = 1;
                  moviesRecommandationsElement.innerHTML = html;
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
    }, 500);
  });
}
