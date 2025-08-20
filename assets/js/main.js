// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");
const menuClose = document.getElementById("menu-close");

if (hamburger && navMenu) {
  const openMenu = () => {
    navMenu.classList.add("open");
    document.body.classList.add("no-scroll");
  };
  const closeMenu = () => {
    navMenu.classList.remove("open");
    document.body.classList.remove("no-scroll");
  };
  const toggleMenu = () => {
    if (navMenu.classList.contains("open")) closeMenu(); else openMenu();
  };

  hamburger.addEventListener("click", toggleMenu);
  menuClose?.addEventListener("click", closeMenu);

  // Close menu on link click (mobile UX)
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      closeMenu();
    }
  });
}

// Modern theme switcher
const storageKey = 'theme-preference';

const onClick = () => {
  // flip current value
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setPreference();
};

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
};

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};

const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value);
  
  // Update body class for existing dark mode styles
  if (theme.value === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  
  document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value);
};

const theme = {
  value: getColorPreference(),
};

// set early so no page flashes / CSS is made aware
reflectPreference();

window.onload = () => {
  // set on load so screen readers can see latest value on the button
  reflectPreference();

  // now this script can find and listen for clicks on the control
  document.querySelector('#theme-toggle')?.addEventListener('click', onClick);
};

// sync with system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches: isDark}) => {
  theme.value = isDark ? 'dark' : 'light';
  setPreference();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
