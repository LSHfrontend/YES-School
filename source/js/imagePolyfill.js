"use strict";

(function () {
  let images = sortImages(document.querySelectorAll("img:not(.page-header__image):not(.page-footer__image)"));
  let deviceType;
  let previousType;

  window.addEventListener("resize", checkSize, false);
  checkSize();

  function sortImages(imgs) {
    let fullImgs = [];
    let mobileNdesktop = [];

    for (let i = 0; i < imgs.length; i++) {
      imgs[i].classList.contains("shortRes") ? mobileNdesktop.push(imgs[i]) : fullImgs.push(imgs[i]);
    };

    for (let i = 0; i < mobileNdesktop.length; i++) {
      fullImgs.push(mobileNdesktop[i])
    };

    return [fullImgs, mobileNdesktop.length];
  };

  function checkSize() {
    let isMobile = window.innerWidth < 760;
    let isTablet = window.innerWidth >= 760 && window.innerWidth < 1170;
    let isDesktop = window.innerWidth > 1170;

    if (!previousType) checkDeviceType();

    if (deviceType === "mobile" && !isMobile) {
      changeType(isTablet ? "tablet" : "desktop");
    } else if (deviceType === "tablet" && !isTablet) {
      changeType(isMobile ? "mobile" : "desktop");
    } else if (deviceType === "desktop" && !isDesktop) {
      changeType(isMobile ? "mobile" : "tablet");
    };

    function changeType(devType) {
      previousType = deviceType;
      deviceType = devType;
      changeSrc();
    };

    function checkDeviceType() {
      if (isMobile) {
        deviceType = "mobile";
      } else if (isTablet) {
        deviceType = "tablet";
      } else if (isDesktop) {
        deviceType = "desktop";
      };

      previousType = "mobile";

      if (deviceType !== "mobile") changeSrc();
    };
  };

  function changeSrc() {
    let arr = deviceType === "mobile" || deviceType === "desktop" ? images[0].concat() : images[0].slice(0, -images[1]);
    let retina = window.devicePixelRatio > 1 ? "@2x-" : "-";

    for (let i = 0; i < arr.length; i++) {
      let src = arr[i].getAttribute("src");
      let format = src.substr(src.indexOf("."))
      let index = previousType;

      if (!(~src.indexOf(previousType))) {
        index = ~src.indexOf("mobile") ? "mobile" : "desktop";
      };

      let newSrc = src.substring(0, src.indexOf(index) - 1) + retina + deviceType + format;
      arr[i].setAttribute("src", newSrc);
    };
  };
})();
