const watchProviderModal = document.getElementById("watchProviderModal");
const openModal = document.getElementById("openWathProviderModal");
const closeModal = document.getElementById("closeWatchProviderModal");

if (openModal) {
  openModal.addEventListener("click", () => {
    watchProviderModal.showModal();
  });
}
if (closeModal) {
  closeModal.addEventListener("click", () => {
    watchProviderModal.close();
  });
}
