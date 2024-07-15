import { useEffect } from 'react';

function useSmoothScroll() {
    useEffect(() => {
        const handleClick = (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        const backToTopButton = document.querySelector('.back_to_top');
        if (backToTopButton) {
            backToTopButton.addEventListener('click', handleClick);
        }

        // Cleanup function to remove the event listener
        return () => {
            if (backToTopButton) {
                backToTopButton.removeEventListener('click', handleClick);
            }
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
}

export default useSmoothScroll;