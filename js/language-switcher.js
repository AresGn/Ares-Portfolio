/**
 * Language Switcher for Arès GNIMAGNON Portfolio
 */

// Store all translatable elements
let translatableElements = {};

// Current language
let currentLanguage = 'en';

// Load the translation data
let translations = {};

// Initialize the language system
function initLanguageSystem() {
    // Load translations file
    fetch('js/translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            
            // Set the default language
            const savedLanguage = localStorage.getItem('language') || 'en';
            switchLanguage(savedLanguage);
            
            // Update select values based on saved language
            document.getElementById('language-select').value = savedLanguage;
            document.getElementById('language-select-mobile').value = savedLanguage;
        })
        .catch(error => {
            console.error('Error loading translations:', error);
        });
        
    // Setup event listeners for language switches
    document.getElementById('language-select').addEventListener('change', function(e) {
        switchLanguage(e.target.value);
        document.getElementById('language-select-mobile').value = e.target.value;
    });
    
    document.getElementById('language-select-mobile').addEventListener('change', function(e) {
        switchLanguage(e.target.value);
        document.getElementById('language-select').value = e.target.value;
    });
    
    // Collect all translatable elements
    collectTranslatableElements();
}

// Collect all elements that need translation
function collectTranslatableElements() {
    // Menu items
    translatableElements.menuItems = document.querySelectorAll('.vertical-menu a');
    
    // Home section
    translatableElements.iama = document.querySelector('#home .intro span:not(.text-rotating)');
    translatableElements.hireMe = document.querySelector('#home .btn.btn-default');
    
    // About section
    translatableElements.aboutTitle = document.querySelector('#about .section-title');
    translatableElements.aboutDescription = document.querySelector('#about p:first-of-type');
    translatableElements.downloadCV = document.querySelector('#about .btn.btn-default');
    translatableElements.skills = document.querySelectorAll('#about .skill-info h4');
    translatableElements.factItems = document.querySelectorAll('#about .fact-item p');
    
    // Services section
    translatableElements.servicesTitle = document.querySelector('#services .section-title');
    translatableElements.serviceBoxes = document.querySelectorAll('#services .service-box');
    translatableElements.lookingCustomJob = document.querySelector('#services .mt-5.text-center p');
    
    // Experience section
    translatableElements.experienceTitle = document.querySelector('#experience .section-title');
    translatableElements.eduItems = document.querySelectorAll('#experience .timeline.edu .timeline-container');
    translatableElements.expItems = document.querySelectorAll('#experience .timeline.exp .timeline-container');
    
    // Contact section
    translatableElements.contactTitle = document.querySelector('#contact .section-title');
    translatableElements.letsTalk = document.querySelector('#contact .contact-info h3');
    translatableElements.dontLikeForms = document.querySelector('#contact .contact-info p');
    translatableElements.formPlaceholders = {
        name: document.getElementById('InputName'),
        email: document.getElementById('InputEmail'),
        subject: document.getElementById('InputSubject'),
        message: document.getElementById('InputMessage')
    };
    translatableElements.sendButton = document.getElementById('submit');
}

// Switch the language
function switchLanguage(lang) {
    if (!translations[lang]) {
        console.error('Language not supported:', lang);
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Translate everything
    translateElements();
    
    // Update rotating text content
    updateTextRotating(lang);
}

// Translate all elements based on collected elements
function translateElements() {
    const t = translations[currentLanguage];
    
    // Menu items
    if (translatableElements.menuItems) {
        translatableElements.menuItems[0].innerHTML = `<i class="icon-home"></i>${t.menu.home}`;
        translatableElements.menuItems[1].innerHTML = `<i class="icon-user-following"></i>${t.menu.about}`;
        translatableElements.menuItems[2].innerHTML = `<i class="icon-briefcase"></i>${t.menu.services}`;
        translatableElements.menuItems[3].innerHTML = `<i class="icon-graduation"></i>${t.menu.experience}`;
        translatableElements.menuItems[4].innerHTML = `<i class="icon-layers"></i>${t.menu.works}`;
        translatableElements.menuItems[5].innerHTML = `<i class="icon-note"></i>${t.menu.blog}`;
        translatableElements.menuItems[6].innerHTML = `<i class="icon-bubbles"></i>${t.menu.contact}`;
    }
    
    // Home section
    if (translatableElements.iama) {
        translatableElements.iama.textContent = `${t.home.iama} `;
    }
    if (translatableElements.hireMe) {
        translatableElements.hireMe.textContent = t.home.hireMe;
    }
    
    // About section
    if (translatableElements.aboutTitle) {
        translatableElements.aboutTitle.textContent = t.about.title;
    }
    if (translatableElements.aboutDescription) {
        translatableElements.aboutDescription.textContent = t.about.description;
    }
    if (translatableElements.downloadCV) {
        translatableElements.downloadCV.textContent = t.about.downloadCV;
    }
    if (translatableElements.skills && translatableElements.skills.length >= 4) {
        translatableElements.skills[0].textContent = t.about.skills.webDev;
        translatableElements.skills[1].textContent = t.about.skills.uiux;
        translatableElements.skills[2].textContent = t.about.skills.flutter;
        translatableElements.skills[3].textContent = t.about.skills.motion;
    }
    if (translatableElements.factItems && translatableElements.factItems.length >= 4) {
        translatableElements.factItems[0].textContent = t.about.facts.completed;
        translatableElements.factItems[1].textContent = t.about.facts.active;
        translatableElements.factItems[2].textContent = t.about.facts.clients;
        translatableElements.factItems[3].textContent = t.about.facts.experience;
    }
    
    // Services section
    if (translatableElements.servicesTitle) {
        translatableElements.servicesTitle.textContent = t.services.title;
    }
    if (translatableElements.serviceBoxes && translatableElements.serviceBoxes.length >= 4) {
        // UI/UX Design
        translatableElements.serviceBoxes[0].querySelector('h3').textContent = t.services.uiux.title;
        translatableElements.serviceBoxes[0].querySelector('p').textContent = t.services.uiux.description;
        
        // Web Development
        translatableElements.serviceBoxes[1].querySelector('h3').textContent = t.services.webDev.title;
        translatableElements.serviceBoxes[1].querySelector('p').textContent = t.services.webDev.description;
        
        // App Development
        translatableElements.serviceBoxes[2].querySelector('h3').textContent = t.services.appDev.title;
        translatableElements.serviceBoxes[2].querySelector('p').textContent = t.services.appDev.description;
        
        // Motion Design
        translatableElements.serviceBoxes[3].querySelector('h3').textContent = t.services.motionDesign.title;
        translatableElements.serviceBoxes[3].querySelector('p').textContent = t.services.motionDesign.description;
    }
    if (translatableElements.lookingCustomJob) {
        const link = translatableElements.lookingCustomJob.querySelector('a');
        translatableElements.lookingCustomJob.innerHTML = `${t.services.lookingCustomJob} <a href="#contact">${t.services.clickHere}</a> ${t.services.toContactMe} 👋`;
    }
    
    // Experience section
    if (translatableElements.experienceTitle) {
        translatableElements.experienceTitle.textContent = t.experience.title;
    }
    if (translatableElements.eduItems && translatableElements.eduItems.length >= 2) {
        // INSTI
        translatableElements.eduItems[0].querySelector('.time').textContent = t.experience.education.insti.date;
        translatableElements.eduItems[0].querySelector('.title').textContent = t.experience.education.insti.title;
        translatableElements.eduItems[0].querySelector('p').textContent = t.experience.education.insti.description;
        
        // BAC
        translatableElements.eduItems[1].querySelector('.time').textContent = t.experience.education.bac.date;
        translatableElements.eduItems[1].querySelector('.title').textContent = t.experience.education.bac.title;
        translatableElements.eduItems[1].querySelector('p').textContent = t.experience.education.bac.description;
    }
    if (translatableElements.expItems && translatableElements.expItems.length >= 4) {
        // Windows App
        translatableElements.expItems[0].querySelector('.time').textContent = t.experience.professional.windows.date;
        translatableElements.expItems[0].querySelector('.title').textContent = t.experience.professional.windows.title;
        translatableElements.expItems[0].querySelector('p').textContent = t.experience.professional.windows.description;
        
        // Website Redesign
        translatableElements.expItems[1].querySelector('.time').textContent = t.experience.professional.website.date;
        translatableElements.expItems[1].querySelector('.title').textContent = t.experience.professional.website.title;
        translatableElements.expItems[1].querySelector('p').textContent = t.experience.professional.website.description;
        
        // Mobile App
        translatableElements.expItems[2].querySelector('.time').textContent = t.experience.professional.mobile.date;
        translatableElements.expItems[2].querySelector('.title').textContent = t.experience.professional.mobile.title;
        translatableElements.expItems[2].querySelector('p').textContent = t.experience.professional.mobile.description;
        
        // Elevator
        translatableElements.expItems[3].querySelector('.time').textContent = t.experience.professional.elevator.date;
        translatableElements.expItems[3].querySelector('.title').textContent = t.experience.professional.elevator.title;
        translatableElements.expItems[3].querySelector('p').textContent = t.experience.professional.elevator.description;
    }
    
    // Contact section
    if (translatableElements.contactTitle) {
        translatableElements.contactTitle.textContent = t.contact.title;
    }
    if (translatableElements.letsTalk) {
        translatableElements.letsTalk.textContent = t.contact.letsTalk;
    }
    if (translatableElements.dontLikeForms) {
        translatableElements.dontLikeForms.innerHTML = `${t.contact.dontLikeForms} <a href="mailto:name@example.com">${t.contact.email}</a>. 👋`;
    }
    if (translatableElements.formPlaceholders) {
        translatableElements.formPlaceholders.name.placeholder = t.contact.form.name;
        translatableElements.formPlaceholders.email.placeholder = t.contact.form.email;
        translatableElements.formPlaceholders.subject.placeholder = t.contact.form.subject;
        translatableElements.formPlaceholders.message.placeholder = t.contact.form.message;
    }
    if (translatableElements.sendButton) {
        translatableElements.sendButton.value = t.contact.sendMessage;
    }
}

// Update the text rotating component
function updateTextRotating(lang) {
    // Remove existing Morphext instance
    const textRotatingEl = document.querySelector('.text-rotating');
    if (textRotatingEl) {
        // Get the current Morphext instance
        const morphextInstance = textRotatingEl.Morphext;
        if (morphextInstance) {
            // Clear the instance
            morphextInstance.destroy();
        }
        
        // Update content with new language phrases
        textRotatingEl.textContent = translations[lang].home.roles.join(', ');
        
        // Reinitialize Morphext
        setTimeout(() => {
            $(".text-rotating").Morphext({
                animation: "fadeIn",
                separator: ",",
                speed: 3000,
                complete: function () {}
            });
        }, 100);
    }
}

// Initialize language system after page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initLanguageSystem();
    
    // Force re-initialization of Morphext after a short delay to ensure it works properly
    setTimeout(() => {
        const textRotatingEl = document.querySelector('.text-rotating');
        if (textRotatingEl) {
            // Get the current Morphext instance
            const morphextInstance = textRotatingEl.Morphext;
            if (morphextInstance) {
                // Clear the instance
                morphextInstance.destroy();
            }
            
            // Reinitialize Morphext
            $(".text-rotating").Morphext({
                animation: "fadeIn",
                separator: ",",
                speed: 3000,
                complete: function () {}
            });
        }
    }, 500);
}); 