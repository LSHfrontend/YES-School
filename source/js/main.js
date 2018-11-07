"use strict";

let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

if (isIE11) {
  let script = document.createElement("script");
  script.src = "js/imagePolyfill.js";
  document.body.appendChild(script);
};

if (window.outerWidth >= 760) {
  let list = document.getElementsByClassName("reviews__list")[0];
  let range = document.getElementById("reviews-range");
  let listener = isIE11 ? "change" : "input";
  range.addEventListener(listener, slider, false);

  function slider() {
    this.setAttribute("aria-valuenow", this.value);

    list.getElementsByClassName("reviews__item--active")[0].classList.remove("reviews__item--active");
    list.getElementsByClassName("reviews__item")[this.value - 1].classList.add("reviews__item--active");
  };
};

document.body.addEventListener("click", modalWindow, false);

function modalWindow(evt) {
  if (evt.target.getAttribute("href") !== "appointment.html") return;
  evt.preventDefault();

  let modal = document.getElementsByClassName("appointment")[0];
  let shading = document.getElementsByClassName("shading")[0];

  modalWindow.showModal = function() {
    modal.style.display = "block";
    modal.getElementsByClassName("appointment__tel")[0].focus();

    if (window.outerWidth >= 760) {
      (function() {
        let div = document.createElement("div");
        div.classList.add("shading");
        div.setAttribute("onclick", "modalWindow.closeModal()")
        document.body.appendChild(div);
      })();
    };
  };

  modalWindow.closeModal = function() {
    modal.style.display = "none";
    document.body.removeChild(document.getElementsByClassName("shading")[0]);
  };

  shading ? modalWindow.closeModal() : modalWindow.showModal();
}
