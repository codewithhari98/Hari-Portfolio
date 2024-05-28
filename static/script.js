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

// Define the function to handle the fly-in animations
function flyInElements(elements, className) {
  const windowHeight = window.innerHeight;

  elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      
      if (rect.top <= windowHeight * 0.8) {
          element.classList.add(className);
      }
  });
}

// Call the flyInElements function for different sections
window.addEventListener('scroll', () => {
  // About section
  flyInElements([animatedHeading, animatedSubheading, imgLines], 'show');
  
  // Experience section
  flyInElements(document.querySelectorAll('.timeline-item'), 'slide-in-left', 'slide-in-right');
});

window.addEventListener('load', () => {
  if (currentPath.includes('experience')) {
    // Experience section
    flyInElements(document.querySelectorAll('.timeline-item'), 'slide-in-left');
} else if (currentPath.includes('about')) {
    // About section
    flyInElements([animatedHeading, animatedSubheading, imgLines], 'show');
}
});

// Scroll to About section when About link is clicked
aboutLink.addEventListener('click', event => {
  event.preventDefault();
  const aboutSection = document.querySelector('#about');
  aboutSection.scrollIntoView({ behavior: 'smooth' });
});

const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          if (entry.target.classList.contains('slide-in-left')) {
              entry.target.classList.add('slide-in-left');
          } else {
              entry.target.classList.add('slide-in-right');
          }
          timelineObserver.unobserve(entry.target);
      }
  });
});

timelineItems.forEach(item => {
  timelineObserver.observe(item);
});

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault(); 
        const targetId = link.getAttribute('href'); 
        const targetElement = document.querySelector(targetId); 
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });

            history.pushState(null, null, targetId);
        }
    });
});


$(document).ready(function() {
    $('.filter-button-group button').click(function(event) {
      const filterValue = $(this).attr('data-filter');
      console.log(filterValue);
      
      if (!$(this).hasClass('active')) { 
        if (filterValue === '.all') {
            $('.gallery-grid').show(); 
          } else {
            $('.gallery-grid').hide();
            $(filterValue).show();
          }
  
        // Change active button
        $('.filter-button-group button').removeClass('active');
        $(this).addClass('active');
      }
  
      // Prevent default behavior only if the button is not the "All" button
      if (!$(this).is('[data-filter="*"]')) {
        event.preventDefault();
      }
    });
  
    // Update progress bars
    $('.progress-bar').each(function() {
      const value = parseInt($(this).attr('aria-valuenow'));
      $(this).animate({ width: value + '%' }, 1500);
    });
  
    // Initial display of skills (show all)
    $('.gallery-grid').show();
  });
  
  $(document).ready(function() {
    const chatBody = document.getElementById('chat-body');
    const userInputElement = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatIcon = document.getElementById('chat-icon');
    const chatContainer = document.querySelector('.chat-container');

    sendButton.addEventListener('click', function() {
        const userInput = userInputElement.value;
        appendUserMessage(userInput);
        userInputElement.value = ''; 

        // Send user input to the server
        fetch('/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput })
        })
        .then(response => response.json())
        .then(data => {
            const chatbotResponse = data.output;
            appendChatbotMessage(chatbotResponse);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    userInputElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendButton.click(); 
        }
    });
    function appendUserMessage(message) {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.textContent = message;
        chatBody.appendChild(userMessage);
    }

    function appendChatbotMessage(message) {
        const chatbotMessage = document.createElement('div');
        chatbotMessage.className = 'message chatbot';
        chatbotMessage.textContent = message;
        chatBody.appendChild(chatbotMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    chatIcon.addEventListener('click', function() {
        chatContainer.classList.toggle('open');
    });
});



  
  
  
  
  