const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');

const sideMenu = document.getElementById('side-menu');

function openMobileMenu() {
  sideMenu.classList.remove('hide-side-menu');
  mobileMenuBtn.classList.add('hide');
  mobileMenuCloseBtn.classList.remove('hide');
}
function closeMobileMenu() {
  sideMenu.classList.add('hide-side-menu');
  mobileMenuBtn.classList.remove('hide');
  mobileMenuCloseBtn.classList.add('hide');
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
