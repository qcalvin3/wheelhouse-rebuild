// Wheelhouse Bike Repair — script.js

// === Menu: links in the header on wider screens; on phones a pop-up that
//     closes after a link is chosen, on Escape, or when focus leaves ===
const menu = document.querySelector('.site-nav details');

if (menu) {
  const toggle = menu.querySelector('summary');

  // On tablets and up the links sit in the header, so keep the menu open there.
  // This width must match the @media (min-width: 48rem) rule in styles.css
  const wideScreen = window.matchMedia('(min-width: 48rem)');
  const syncMenuToScreen = () => {
    menu.open = wideScreen.matches;
  };
  syncMenuToScreen();
  wideScreen.addEventListener('change', syncMenuToScreen);

  // Close after a link is chosen, so the menu doesn't cover the section
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a') && !wideScreen.matches) {
      menu.open = false;
    }
  });

  // Escape closes the menu and puts focus back on "Menu"
  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open && !wideScreen.matches) {
      menu.open = false;
      toggle.focus();
    }
  });

  // Close when keyboard focus moves outside the menu
  menu.addEventListener('focusout', (event) => {
    if (!menu.contains(event.relatedTarget) && !wideScreen.matches) {
      menu.open = false;
    }
  });
}