"use strict";

(function () {
  let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

  if (isIE11) {
    (function (arr) {
      for (let i = 0; i < arr.length; i++) {
        let script = document.createElement("script");
        script.src = arr[i];
        document.body.appendChild(script);
      };
    })(["js/imagePolyfill.js", "js/svgxuse.js"]);
  };

  if (window.outerWidth >= 760) {
    let list = document.getElementsByClassName("reviews__list")[0];
    let range = document.getElementById("reviews-range");
    let listener = isIE11 ? "change" : "input";

    function slider () {
      this.setAttribute("aria-valuenow", this.value);

      list.getElementsByClassName("reviews__item--active")[0].classList.remove("reviews__item--active");
      list.getElementsByClassName("reviews__item")[this.value - 1].classList.add("reviews__item--active");
    };

    range.addEventListener(listener, slider, false);
  };

  let modal = document.getElementsByClassName("appointment")[0];

  function modalWindow(evt) {
    if (evt.target.getAttribute("href") !== "appointment.html") return;
    evt.preventDefault();

    window.showModal();
  };

  window.showModal = function () {
    modal.style.display = "block";
    modal.getElementsByClassName("appointment__tel")[0].focus();

    if (window.outerWidth >= 760) {
      (function() {
        let div = document.createElement("div");
        div.classList.add("shading");
        div.setAttribute("onclick", "window.closeModal()")
        document.body.appendChild(div);
      })();
    };
  };

  window.closeModal = function () {
    modal.style.display = "none";
    document.body.removeChild(document.getElementsByClassName("shading")[0]);
  };

  document.body.addEventListener("click", modalWindow, false);
  document.body.addEventListener("keydown", function (evt) {
    let shading = document.getElementsByClassName("shading")[0];
    if (shading && evt.keyCode === 27) window.closeModal();
  }, false);
})();

