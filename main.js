document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired'); // Debug log
    const links = document.querySelectorAll('nav a');
    const mainContent = document.getElementById('main-content');
  
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const page = link.getAttribute('href').substring(1);
        console.log(`Navigating to ${page}`); // Debug log
  
        // Fetch page content dynamically
        fetchPage(page);
        history.pushState(null, '', `/${page}`);
      });
    });
  
    function fetchPage(page) {
      const filePath = (page === '' || page === 'home') ? '/home.html' : `/${page}.html`;
      console.log(`Fetching page: ${filePath}`); // Debug log
  
      fetch(filePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.text();
        })
        .then(html => {
          mainContent.innerHTML = html;
          initializeScripts();
        })
        .catch(error => {
          console.error('Error loading page:', error);
          mainContent.innerHTML = '<p>Error loading page.</p>';
        });
    }
  
    window.addEventListener('popstate', () => {
      const path = location.pathname.substring(1) || 'home';
      console.log(`Popstate event: loading ${path}`); // Debug log
      fetchPage(path);
    });
  
    const initialPage = location.pathname.substring(1) || 'home';
    console.log(`Initial page load: ${initialPage}`); // Debug log
    fetchPage(initialPage);
  });
  
  function initializeScripts() {
    console.log('Initializing scripts'); // Debug log
  }
  
