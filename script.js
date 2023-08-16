const toggler = document.querySelector('.navbar-toggler');
const collapse = document.querySelector('.navbar-collapse');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavDropdown = document.querySelector('.mobile-nav-dropdown');
const navLinks = document.querySelectorAll('.nav-link');

toggler.addEventListener('click', () => {
    toggler.classList.toggle('active');
    collapse.classList.toggle('show');
    mobileNav.classList.toggle('show');
    mobileNavDropdown.classList.toggle('show');
  });


// Function to handle changing the active link
function setActiveLink(link) {
    // Remove active class of past one, once you click another link
    navLinks.forEach(navLink => {
      navLink.classList.remove('active');
    });
  
    // Add active class to the clicked link
    link.classList.add('active');
    setTimeout(() => {
        toggler.classList.remove('active');
        mobileNav.classList.remove('show');
        mobileNavDropdown.classList.remove('show');
      }, 500); 
  }
  navLinks.forEach(navLink => {
    navLink.addEventListener('click', event => {
      setActiveLink(navLink);
    });
  });
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    
    if (window.scrollY >= sectionTop - 60){
      current = section.getAttribute('id');
    }
  });
  
  document.querySelector('.nav-link.active').classList.remove('active');
  document.querySelector(`.nav-link[href="#${current}"]`).classList.add('active');

});
