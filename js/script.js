// Wheelhouse Bike Repair: script.js

// === Menu: links in the header on wider screens; on phones a pop-up that
//     closes after a link is chosen, on Escape, or when focus leaves ===
// Shared tablet/desktop breakpoint: keep 48rem in sync with
// @media (min-width: 48rem) in css/styles.css
const DESKTOP_BREAKPOINT = "(min-width: 48rem)";
const menu = document.querySelector(".site-nav details");

if (menu) {
  const toggle = menu.querySelector("summary");

  // On tablets and up the links sit in the header, so keep the menu open there
  const wideScreen = window.matchMedia(DESKTOP_BREAKPOINT);
  const syncMenuToScreen = () => {
    menu.open = wideScreen.matches;
  };
  syncMenuToScreen();
  wideScreen.addEventListener("change", syncMenuToScreen);

  // Remove the media-query listener when the page is permanently unloaded
  // (keeping it alive if the browser caches the page in bfcache)
  window.addEventListener("pagehide", (event) => {
    if (!event.persisted) {
      wideScreen.removeEventListener("change", syncMenuToScreen);
    }
  });

  // Close after a link is chosen, so the menu doesn't cover the section
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a") && !wideScreen.matches) {
      menu.open = false;
    }
  });

  // Escape closes the menu and puts focus back on "Menu"
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open && !wideScreen.matches) {
      menu.open = false;
      toggle.focus();
    }
  });

  // Close when keyboard focus moves outside the menu
  menu.addEventListener("focusout", (event) => {
    if (!menu.contains(event.relatedTarget) && !wideScreen.matches) {
      menu.open = false;
    }
  });
}

// === Text message (SMS) option ===
// For riders without WhatsApp or mobile data, and Deaf riders who can't call.
// The button stays hidden if this script doesn't run; the plain "Text us"
// link under the form still works on any phone.
const smsButton = document.querySelector("#send-sms");
const messageBox = document.querySelector("#message");

if (smsButton && messageBox) {
  smsButton.hidden = false;

  smsButton.addEventListener("click", () => {
    // Same "please fill in this field" message as the WhatsApp button
    if (!messageBox.reportValidity()) {
      return;
    }
    // Standard SMS link format (RFC 5724): sms:number?body=message
    const message = encodeURIComponent(messageBox.value.trim());
    window.location.href = `sms:${smsButton.dataset.number}?body=${message}`;
  });
}
