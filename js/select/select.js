// const selectEl = document.querySelector(".select");
// const blockSelect = document.querySelector(".select-block");
// console.log(blockSelect);

// selectEl.addEventListener("click", () => {
//   blockSelect.classList.toggle("select-block-active");
// });

// // selectEl.addEventListener("change", () => {
// //   blockSelect.classList.remove("select-block-active");
// // });

// document.addEventListener("click", (e) => {
//   if (e.target.tagName != "SELECT") {
//     console.log(e.target.tagName);
//     blockSelect.classList.remove("select-block-active");
//   }
// });

$(document).ready(function () {
  // $(".select2-arrow").append('<i class="fa fa-angle-down"></i>');
  $(".js-example-basic-single").select2({
    minimumResultsForSearch: Infinity,
    width: "100%",
  });
});
