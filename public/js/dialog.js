const watchProviderModal = document.getElementById("watchProviderModal");
const openModal = document.getElementById("openWathProviderModal");
const closeModal = document.getElementById("closeWathProviderModal");

openModal.addEventListener("click", () => {
  watchProviderModal.showModal();
});
closeModal.addEventListener("click", () => {
  watchProviderModal.close();
});
