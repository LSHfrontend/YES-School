"use strict";

let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
let isEdge = /Edge/.test(window.navigator.userAgent);

(function() {
  document.addEventListener("DOMContentLoaded", msFix, false);

  function msFix() {
    if (isIE11) {
      (function (arr) {
        for (let i = 0; i < arr.length; i++) {
          let script = document.createElement("script");
          script.src = arr[i];
          document.body.appendChild(script);
        };
      })(["js/imagePolyfill.js", "js/svgxuse.js"]);
    };
  };
})();
