const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebar-toggle');
const mainContent = document.getElementById('main-content');
const arrowIcon = document.getElementById('arrow-icon');

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        // Toggle sidebar visibility
        const isClosed = sidebar.classList.toggle('-translate-x-full');

        // Adjust main content margin and button position
        mainContent.classList.toggle('md:ml-64', !isClosed);
        toggleButton.classList.toggle('translate-x-64', !isClosed);
        
        // Rotate the arrow icon
        arrowIcon.classList.toggle('rotate-180', !isClosed);
    });
}