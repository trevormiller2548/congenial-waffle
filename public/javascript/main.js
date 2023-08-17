const headerLogoEl = document.getElementById('header-logo');
headerLogoEl.addEventListener('click', () => {
  document.location.replace('/');
});

// Highlight the active nav item
const navItems = document.querySelectorAll('.navItem');
const currentPath = window.location.pathname;

navItems.forEach((navItem) => {
  if (navItem.getAttribute('href') === currentPath) {
    navItem.classList.add('active');
  }
});

// Update header styling based on if a certain element exists
const headerHead = document.getElementById('header-head');
const loggedInActive = document.getElementById('loggedin');
if (loggedInActive) {
  headerHead.style.justifyContent = 'space-between';
} else {
  headerHead.style.justifyContent = 'center';
}
