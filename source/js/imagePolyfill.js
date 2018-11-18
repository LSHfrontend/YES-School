"use strict";

(function () {
  let images = sortImages(document.getElementsByTagName("img"));
  let deviceType;
  let previousType;

  window.addEventListener("resize", checkSize, false);
  checkSize();

  function sortImages(imgs) {
    let fullImgs = [];
    let mobileNdesktop = [];

    for (let i = 0; i < imgs.length; i++) {
      imgs[i].classList.contains("shortRes") ? mobileNdesktop.push(imgs[i]) : fullImgs.push(imgs[i]);
    }

    for (let i = 0; i < mobileNdesktop.length; i++) {
      fullImgs.push(mobileNdesktop[i])
    }

    return [fullImgs, mobileNdesktop.length];
  };

  function checkSize() {
    let mobileWidth = window.innerWidth < 760;
    let tabletWidth = window.innerWidth >= 760 && window.innerWidth < 1170;
    let desktopWidth = window.innerWidth > 1170;

    if (!previousType) checkDeviceType();

    if (deviceType === "mobile" && tabletWidth || deviceType === "mobile" && desktopWidth) {
      previousType = deviceType;
      deviceType = tabletWidth ? "tablet" : "desktop";
      changeSrc();
    } else if (deviceType === "tablet" && mobileWidth || deviceType === "tablet" && desktopWidth) {
      previousType = deviceType;
      deviceType = mobileWidth ? "mobile" : "desktop";
      changeSrc();
    } else if (deviceType === "desktop" && mobileWidth || deviceType === "desktop"  && tabletWidth) {
      previousType = deviceType;
      deviceType = mobileWidth ? "mobile" : "tablet";
      changeSrc();
    }

    function checkDeviceType() {
      if (mobileWidth) {
        deviceType = "mobile";
      } else if (tabletWidth) {
        deviceType = "tablet";
      } else if (desktopWidth) {
        deviceType = "desktop";
      }

      previousType = "mobile";

      if (deviceType !== "mobile") changeSrc();
    }
  }

  function changeSrc() {
    let arr = deviceType == "mobile" || deviceType == "desktop" ? images[0].concat() : images[0].slice(0, -images[1]);
    let retina = window.devicePixelRatio > 1 ? "@2x-" : "-";

    for (let i = 0; i < arr.length; i++) {
      let src = arr[i].getAttribute("src");
      let format = src.substr(-4, 4);
      let index = previousType;

      if (!(~src.indexOf(previousType))) {
        index = ~src.indexOf("mobile") ? "mobile" : "desktop";
      };

      let newSrc = src.substring(0, src.indexOf(index) - 1) + retina + deviceType + format;
      arr[i].setAttribute("src", newSrc);
    };
  }
})();
