let mainContent, header, canvas, spaceContent;
let regularPageButtons, spacePageButtons;

// Global function to navigate to a page
function navigateToPage(page) {
  if (page === 'space') {
    showSpacePage();
  } else {
    showRegularPage(page);
  }
  history.pushState(null, '', page === 'home' ? '/' : `/${page}`);
  updateActiveTab(page);
}

function showRegularPage(page) {
  if (document.body.classList.contains('space-page')) {
    // Transition from space page to regular page
    spaceContent.style.display = 'none';
    header.style.display = 'block';
    mainContent.style.display = 'block';
    document.body.classList.remove('space-page');

    // Show regular page buttons, hide space page buttons
    if (regularPageButtons) regularPageButtons.style.display = 'block';
    if (spacePageButtons) spacePageButtons.style.display = 'none';
  }

  fetchAndInsertContent(page);
}

function fetchAndInsertContent(page) {
  const filePath = (page === '' || page === 'home') ? '/home.html' : `/${page}.html`;

  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const newContent = tempDiv.querySelector('#main-content');

      if (newContent) {
        mainContent.innerHTML = newContent.innerHTML;
      } else {
        mainContent.innerHTML = html;
      }

      initializeScripts();
    })
    .catch(error => {
      console.error('Error loading page:', error);
      mainContent.innerHTML = '<p>Error loading page.</p>';
    });
}

function showSpacePage() {
  if (!spaceContent) {
    loadSpacePage();
  } else {
    header.style.display = 'none';
    mainContent.style.display = 'none';
    spaceContent.style.display = 'block';
    document.body.classList.add('space-page');

    // Show space page buttons, hide regular page buttons
    if (regularPageButtons) regularPageButtons.style.display = 'none';
    if (spacePageButtons) spacePageButtons.style.display = 'block';
  }
}

function loadSpacePage() {
  fetch('/space.html')
    .then(response => response.text())
    .then(html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      spaceContent = document.createElement('div');
      spaceContent.id = 'space-content';

      // Append new content
      while (tempDiv.firstChild) {
        if (tempDiv.firstChild.id !== 'background') {
          spaceContent.appendChild(tempDiv.firstChild);
        } else {
          tempDiv.removeChild(tempDiv.firstChild);
        }
      }

      document.body.appendChild(spaceContent);

      header.style.display = 'none';
      mainContent.style.display = 'none';
      spaceContent.style.display = 'block';
      document.body.classList.add('space-page');

      // Initialize space page buttons
      spacePageButtons = spaceContent.querySelector('#backButtonContainer');
      if (spacePageButtons) spacePageButtons.style.display = 'block';

      // Hide regular page buttons
      if (regularPageButtons) regularPageButtons.style.display = 'none';

      initializeScripts();
      setupEventListeners();
    })
    .catch(error => {
      console.error('Error loading space page:', error);
    });
}

function updateActiveTab(page) {
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === '/' && (page === '' || page === 'home')) {
      link.className = 'tab_blue';
    } else if (link.getAttribute('href').substring(1) === page) {
      link.className = 'tab_blue';
    } else {
      link.className = 'tab_gray';
    }
  });
}

function initializeBackToTop() {
  const backToTopButton = document.querySelector('.back_to_top');
  if (backToTopButton) {
    backToTopButton.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

function initializeSpaceBackButton() {
  const backButton = document.getElementById('backButton');
  if (backButton) {
    backButton.addEventListener('click', () => {
      navigateToPage('home');
    });
  }
}

function initializeScripts() {
  initializeBackToTop();
  initializeSpaceBackButton();
}

function setupEventListeners() {
  // Handle navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      const page = href === '/' ? 'home' : href.substring(1);
      navigateToPage(page);
    });
  });

  // Handle home link
  const homeLink = document.getElementById('home-link');
  if (homeLink) {
    homeLink.addEventListener('click', (event) => {
      event.preventDefault();
      navigateToPage('home');
    });
  }

  initializeSpaceBackButton();
}

document.addEventListener('DOMContentLoaded', () => {
  mainContent = document.getElementById('main-content');
  header = document.querySelector('header');
  canvas = document.getElementById('background');

  // Initialize regular page buttons
  regularPageButtons = document.getElementById('buttonsContainer');

  setupEventListeners();

  window.addEventListener('popstate', () => {
    const path = location.pathname.substring(1);
    navigateToPage(path || 'home');
  });

  const initialPage = location.pathname.substring(1) || 'home';
  navigateToPage(initialPage);
});
