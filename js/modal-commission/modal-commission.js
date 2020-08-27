const btnOpenModal = document.querySelector(".commission-btn");
const modalCommission = document.querySelector("#modal1");
const btnExit = document.querySelector(".modal-commission__btn-exit");

btnOpenModal.addEventListener("click", () => {
  modalCommission.classList.add("open-modal");
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = "17px";
});

btnExit.addEventListener("click", () => {
  modalCommission.classList.remove("open-modal");
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "0";
});
