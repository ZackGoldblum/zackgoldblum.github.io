document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  const links = document.querySelectorAll('nav a');
  const mainContent = document.getElementById('main-content');
  const header = document.querySelector('header');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const page = link.getAttribute('href').substring(1);
      console.log(`Navigating to ${page}`);
      navigateToPage(page);
    });
  });

  function navigateToPage(page) {
      fetchPage(page);
      history.pushState(null, '', `/${page}`);
      updateActiveTab(page);
  }

  function fetchPage(page) {
    const filePath = (page === '' || page === 'home') ? '/home.html' : `/${page}.html`;
    console.log(`Fetching page: ${filePath}`);

    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text();
      })
      .then(html => {
        mainContent.innerHTML = html;
        header.style.display = 'block';
        initializeScripts();
      })
      .catch(error => {
        console.error('Error loading page:', error);
        mainContent.innerHTML = '<p>Error loading page.</p>';
      });
  }

      });
  }

  function updateActiveTab(page) {
    links.forEach(link => {
      if (link.getAttribute('href').substring(1) === page) {
        link.className = 'tab_blue';
      } else {
        link.className = 'tab_gray';
      }
    });
  }

  window.addEventListener('popstate', () => {
    const path = location.pathname.substring(1) || 'home';
    console.log(`Popstate event: loading ${path}`);
    navigateToPage(path);
  });

  const initialPage = location.pathname.substring(1) || 'home';
  console.log(`Initial page load: ${initialPage}`);
  navigateToPage(initialPage);
});

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

function initializeScripts() {
  initializeBackToTop();
} 
