function initRecommandationsListener() {
  const recommandationBtnElement = document.querySelector("#refreshRecommandations");
  watchElements.forEach((watchElement) =>
    watchElement.removeEventListener("click", addWatchElementEventListener)
  );
  watchElements.forEach((watchElement) =>
    watchElement.addEventListener("click", addWatchElementEventListener)
  );
}
