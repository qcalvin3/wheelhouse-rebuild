// Wheelhouse Bike Repair — script.js

// === Menu: close it after a link is chosen, on Escape, or when focus leaves ===
const menu = document.querySelector('.site-nav details');

if (menu) {
  const toggle = menu.querySelector('summary');

  // Close after a link is chosen, so the menu doesn't cover the section
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menu.open = false;
    }
  });

  // Escape closes the menu and puts focus back on "Menu"
  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      toggle.focus();
    }
  });

  // Close when keyboard focus moves outside the menu
  menu.addEventListener('focusout', (event) => {
    if (!menu.contains(event.relatedTarget)) {
      menu.open = false;
    }
  });
}