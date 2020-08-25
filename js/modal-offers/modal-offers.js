const showOffersModal = () => {
  const btnShowOffers = document.querySelector(".offers-btn");
  const modalOffers = document.querySelector("#modal2");
  const btnExit = document.querySelector(".modal-offers__btn-exit");

  btnShowOffers.addEventListener("click", () => {
    modalOffers.classList.add("open-modal");
    document.body.style.overflow = "hidden";
  });

  btnExit.addEventListener("click", () => {
    modalOffers.classList.remove("open-modal");
    document.body.style.overflow = "auto";
  });
};

showOffersModal();
