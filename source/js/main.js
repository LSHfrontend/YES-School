"use strict";

(function () {
  let list = document.getElementsByClassName("reviews__list")[0];

  if (isEdge && window.innerWidth < 760) {
    let firstSlide = list.querySelector(".reviews__item");
    let sliderLink = firstSlide.querySelector(".reviews__link");

    firstSlide.style.cssText = "position: relative; right: 0; opacity: 1;";
    sliderLink.style.display = "inline";

    list.onchange = function() {
      firstSlide.removeAttribute("style");
      sliderLink.removeAttribute("style");
      list.onchange = null;
    };
  };

  if (window.innerWidth >= 760) {
    let range = document.getElementById("reviews-range");
    let listener = isIE11 || isEdge ? "change" : "input";

    function slider() {
      this.setAttribute("aria-valuenow", this.value);

      list.getElementsByClassName("reviews__item--active")[0].classList.remove("reviews__item--active");
      list.getElementsByClassName("reviews__item")[this.value - 1].classList.add("reviews__item--active");
    };

    range.addEventListener(listener, slider, false);
  };

  function createShading() {
    let div = document.createElement("div");
    div.classList.add("shading");
    document.body.appendChild(div);
    div.addEventListener("click", closeModal, false);

    document.body.onkeydown = function (evt) {
      if (evt.keyCode !== 27) return;

      closeModal();
      document.body.onkeydown = null;
    };
  };

  function removeShading() {
    document.body.removeChild(document.getElementsByClassName("shading")[0]);
  };

  let modal = document.getElementsByClassName("appointment")[0];
  let modalBtn = document.querySelectorAll("*[data-modal]");
  for (let i = 0; i < modalBtn.length; i++) {
    modalBtn[i].addEventListener("click", showModal, false);
  };

  function showModal(evt) {
    evt.preventDefault();
    modal.style.display = "block";
    modal.querySelector(".appointment__form")[0].focus();
    modal.querySelector(".appointment__close").addEventListener("click", closeModal, false);

    if (window.innerWidth >= 760) {
      createShading();
    }
  };

  function closeModal() {
    modal.style.display = "none";

    if (window.innerWidth >= 760) {
      removeShading();
    }
  };
})();
