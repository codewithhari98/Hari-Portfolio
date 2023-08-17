const toggler = document.querySelector('.navbar-toggler');
const collapse = document.querySelector('.navbar-collapse');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavDropdown = document.querySelector('.mobile-nav-dropdown');
const navLinks = document.querySelectorAll('.nav-link');
const typewriter = document.querySelector('.typewriter');
const typedText = typewriter.querySelector('.typed-text').innerText;
const heroSection = document.querySelector('.hero');
const aboutContent = document.querySelector('.about-content');
const aboutLink = document.querySelector('a[href="#about"]');

toggler.addEventListener('click', () => {
    toggler.classList.toggle('active');
    collapse.classList.toggle('show');
    mobileNav.classList.toggle('show');
    mobileNavDropdown.classList.toggle('show');
    if (mobileNavDropdown.classList.contains('show')) {
        console.log(mobileNavDropdown.clientHeight);
        heroSection.style.marginTop = mobileNavDropdown.clientHeight + 'px';
    } else {
        heroSection.style.marginTop = 0;
    }
});

function setActiveLink(link) {
    navLinks.forEach(navLink => {
        navLink.classList.remove('active');
    });

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
        if (window.scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    document.querySelector('.nav-link.active').classList.remove('active');
    document.querySelector(`.nav-link[href="#${current}"]`).classList.add('active');
});

const strings = typedText.split(', ');

let stringIndex = 0;
let characterIndex = 0;

function typeString() {
    if (characterIndex === strings[stringIndex].length) {
        stringIndex++;
        characterIndex = 0;
        if (stringIndex === strings.length) {
            stringIndex = 0;
        }
        setTimeout(backspaceString, 500);

        return;
    }
    typewriter.querySelector('h2').textContent += strings[stringIndex].charAt(characterIndex);
    characterIndex++;
    setTimeout(typeString, 100);
}

function backspaceString() {
    if (typewriter.querySelector('h2').textContent) {
        typewriter.querySelector('h2').textContent = typewriter.querySelector('h2').textContent.slice(0, -1);
        setTimeout(backspaceString, 100);
    } else {
        setTimeout(typeString, 100);
    }
}

// Start typing
typeString();

// Fade-in effect for the About Me section
function fadeInSection() {
    const aboutTop = aboutContent.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (aboutTop < windowHeight) {
        aboutContent.classList.add('fade-in');
    }
}

window.addEventListener('scroll', fadeInSection);
window.addEventListener('load', fadeInSection);

// Fly-in animation for About Me section heading and lines
const animatedHeading = document.querySelector('.animated-heading');
const animatedSubheading = document.querySelector('.animated-subheading');
const imgLines = document.querySelector('.img-lines');

function flyInElements() {
    const windowHeight = window.innerHeight;
    const aboutHeadingTop = animatedHeading.getBoundingClientRect().top;
    const aboutSubheadingTop = animatedSubheading.getBoundingClientRect().top;

    if (aboutHeadingTop < windowHeight * 0.8) {
        animatedHeading.classList.add('show');
    }

    if (aboutSubheadingTop < windowHeight * 0.8) {
        animatedSubheading.classList.add('show');
        imgLines.classList.add('show');
    }
}

window.addEventListener('scroll', flyInElements);
window.addEventListener('load', flyInElements);

// Scroll to About section when About link is clicked
aboutLink.addEventListener('click', event => {
    event.preventDefault();
    const aboutSection = document.querySelector('#about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});
