const watchProviderModal = document.getElementById("watchProviderModal");
const openWatchProviderModal = document.getElementById("openWathProviderModal");
const closeWatchProviderModal = document.getElementById("closeWatchProviderModal");

if (openWatchProviderModal) {
  openWatchProviderModal.addEventListener("click", () => {
    watchProviderModal.showModal();
  });
}
if (closeWatchProviderModal) {
  closeWatchProviderModal.addEventListener("click", () => {
    watchProviderModal.close();
  });
}
