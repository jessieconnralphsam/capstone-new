/**
 * Main
 */

'use strict';

let menu, animate;

(function () {
  // Initialize menu
  //-----------------

  let layoutMenuEl = document.querySelectorAll('#layout-menu');
  layoutMenuEl.forEach(function (element) {
    menu = new Menu(element, {
      orientation: 'vertical',
      closeChildren: false
    });
    // Change parameter to true if you want scroll animation
    window.Helpers.scrollToActive((animate = false));
    window.Helpers.mainMenu = menu;
  });

  // Initialize menu togglers and bind click on each
  let menuToggler = document.querySelectorAll('.layout-menu-toggle');
  menuToggler.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      window.Helpers.toggleCollapsed();
    });
  });

  // Display menu toggle (layout-menu-toggle) on hover with delay
  let delay = function (elem, callback) {
    let timeout = null;
    elem.onmouseenter = function () {
      // Set timeout to be a timer which will invoke callback after 300ms (not for small screen)
      if (!Helpers.isSmallScreen()) {
        timeout = setTimeout(callback, 300);
      } else {
        timeout = setTimeout(callback, 0);
      }
    };

    elem.onmouseleave = function () {
      // Clear any timers set to timeout
      document.querySelector('.layout-menu-toggle').classList.remove('d-block');
      clearTimeout(timeout);
    };
  };
  if (document.getElementById('layout-menu')) {
    delay(document.getElementById('layout-menu'), function () {
      // not for small screen
      if (!Helpers.isSmallScreen()) {
        document.querySelector('.layout-menu-toggle').classList.add('d-block');
      }
    });
  }

  // Display in main menu when menu scrolls
  let menuInnerContainer = document.getElementsByClassName('menu-inner'),
    menuInnerShadow = document.getElementsByClassName('menu-inner-shadow')[0];
  if (menuInnerContainer.length > 0 && menuInnerShadow) {
    menuInnerContainer[0].addEventListener('ps-scroll-y', function () {
      if (this.querySelector('.ps__thumb-y').offsetTop) {
        menuInnerShadow.style.display = 'block';
      } else {
        menuInnerShadow.style.display = 'none';
      }
    });
  }

  // Init helpers & misc
  // --------------------

  // Init BS Tooltip
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Accordion active class
  const accordionActiveFunction = function (e) {
    if (e.type == 'show.bs.collapse' || e.type == 'show.bs.collapse') {
      e.target.closest('.accordion-item').classList.add('active');
    } else {
      e.target.closest('.accordion-item').classList.remove('active');
    }
  };

  const accordionTriggerList = [].slice.call(document.querySelectorAll('.accordion'));
  const accordionList = accordionTriggerList.map(function (accordionTriggerEl) {
    accordionTriggerEl.addEventListener('show.bs.collapse', accordionActiveFunction);
    accordionTriggerEl.addEventListener('hide.bs.collapse', accordionActiveFunction);
  });

  // Auto update layout based on screen size
  window.Helpers.setAutoUpdate(true);

  // Toggle Password Visibility
  window.Helpers.initPasswordToggle();

  // Speech To Text
  window.Helpers.initSpeechToText();

  // Manage menu expanded/collapsed with templateCustomizer & local storage
  //------------------------------------------------------------------

  // If current layout is horizontal OR current window screen is small (overlay menu) than return from here
  if (window.Helpers.isSmallScreen()) {
    return;
  }

  // If current layout is vertical and current window screen is > small

  // Auto update menu collapsed/expanded based on the themeConfig
  window.Helpers.setCollapsed(true, false);
})();

// script.js
const viewBadgesLink = document.getElementById("viewBadges");
const popup = document.getElementById("popup");
const closePopupButton = document.getElementById("closePopup");

viewBadgesLink.addEventListener("click", () => {
  popup.style.display = "flex";
});

closePopupButton.addEventListener("click", () => {
  popup.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function() {
  const chartContainer = document.getElementById("chartContainer");
  const chart1 = document.getElementById("totalRevenueChart");
  const chart2 = document.getElementById("chart2");
  const chart3 = document.getElementById("chart3");
  const flipButton = document.getElementById("flipButton");
  const headerText = document.querySelector(".card-header");

  // Add an event listener to the button to toggle between charts
  flipButton.addEventListener("click", function() {
    if (chart1.style.display === "block") {
      chart1.style.display = "none";
      chart2.style.display = "block";
      chart3.style.display = "none";
      headerText.textContent = "Water Quality Index (Day)"; // Change header text to "(Day)"
      flipButton.textContent = "year"; // Change button text to "month"
    } else if (chart2.style.display === "block") {
      chart1.style.display = "none";
      chart2.style.display = "none";
      chart3.style.display = "block";
      headerText.textContent = "Water Quality Index (Year)"; // Change header text to "(Year)"
      flipButton.textContent = "month"; // Change button text to "month"
    } else {
      chart1.style.display = "block";
      chart2.style.display = "none";
      chart3.style.display = "none";
      headerText.textContent = "Water Quality Index (Month)"; // Change header text back to "(Month)"
      flipButton.textContent = "day"; // Change button text back to "day"
    }
  });
});

