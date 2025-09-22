// ShareX.ID - Main JavaScript File
// Copyright © 2025 ShareX.ID™ by PT. FAHOVE TEKNOLOGI INDONESIA

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.glass-modern, .service-card').forEach((el) => {
    observer.observe(el);
  });

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isExpanded = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Stats counter animation
  const animateCounters = () => {
    const counters = document.querySelectorAll('.text-4xl.md\\:text-5xl.font-black.text-gradient');
    counters.forEach(counter => {
      const target = counter.innerText;
      const isPercentage = target.includes('%');
      const isPlus = target.includes('+');
      const numericValue = parseInt(target.replace(/\D/g, ''));
      let current = 0;
      const increment = numericValue / 60;

      const updateCounter = () => {
        if (current < numericValue) {
          current += increment;
          let displayValue = Math.ceil(current);
          if (isPercentage) {
            counter.innerText = `${displayValue}%`;
          } else if (isPlus) {
            counter.innerText = `${displayValue}K+`;
          } else if (target === '24/7') {
            counter.innerText = '24/7';
          } else {
            counter.innerText = `${displayValue}`;
          }
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  };

  // Trigger counter animation when stats section is visible
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  });

  const statsSection = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-4');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Parallax effect for hero
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('section img[src="hero.png"]');
    if (heroImage && scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      scrollToTopBtn.classList.add('opacity-100');
    } else {
      scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      scrollToTopBtn.classList.remove('opacity-100');
    }
  });

  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Typing Animation
  const typingText = document.getElementById('typing-text');
  const cursor = document.getElementById('cursor');
  const services = ['Netflix Premium', 'Spotify Premium', 'YouTube Premium', 'ChatGPT Plus'];
  let currentServiceIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let deletingSpeed = 50;
  let pauseTime = 2000;

  function typeWriter() {
    const currentService = services[currentServiceIndex];
    
    if (!isDeleting) {
      // Typing
      typingText.textContent = currentService.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      
      if (currentCharIndex === currentService.length) {
        // Pause before deleting
        setTimeout(() => {
          isDeleting = true;
          typeWriter();
        }, pauseTime);
        return;
      }
      
      setTimeout(typeWriter, typingSpeed);
    } else {
      // Deleting
      typingText.textContent = currentService.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      
      if (currentCharIndex === 0) {
        isDeleting = false;
        currentServiceIndex = (currentServiceIndex + 1) % services.length;
        setTimeout(typeWriter, 500);
        return;
      }
      
      setTimeout(typeWriter, deletingSpeed);
    }
  }

  // Start typing animation after page load
  setTimeout(() => {
    typeWriter();
  }, 500);

});

// Page load animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  }, 100);
});
