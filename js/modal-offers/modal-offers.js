const showOffersModal = () => {
  const btnShowOffers = document.querySelector(".offers-btn");
  const modalOffers = document.querySelector("#modal2");
  const btnExit = document.querySelector(".modal-offers__btn-exit");

  btnShowOffers.addEventListener("click", () => {
    modalOffers.classList.add("open-modal");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "17px";
  });

  btnExit.addEventListener("click", () => {
    modalOffers.classList.remove("open-modal");
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  });
};

showOffersModal();
