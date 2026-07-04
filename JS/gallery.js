// --- ELEMENTS ---
const galleryGrid = document.getElementById('gallery-grid');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalMd = document.getElementById('modal-md');

// --- FUNCTIONS ---
// Function to build the gallery grid from the data
function buildGallery() {
    if (!galleryGrid) return;

    if (galleryItems.length === 0) {
        galleryGrid.innerHTML = '';
        return;
    }

    // 1. Display the loading message immediately.
    const loadingMessage = document.createElement('p');
    loadingMessage.className = 'text-gray-400 text-lg text-center';
    loadingMessage.textContent = 'Images will appear here shortly...';
    galleryGrid.parentNode.insertBefore(loadingMessage, galleryGrid);

    let isFirstImageLoaded = false;

    // 2. Create and load each image individually.
    galleryItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'masonry-item';

        const img = new Image();
        img.src = item.image;
        img.alt = `Gallery image ${index + 1}`;
        img.className = 'w-full h-auto rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105';
        img.dataset.index = index;

        // 3. When an image finishes loading, add it to the grid.
        img.onload = () => {
            if (!isFirstImageLoaded) {
                // Remove the loading message once the first image is ready.
                loadingMessage.remove();
                isFirstImageLoaded = true;
            }
            itemDiv.appendChild(img);
            galleryGrid.appendChild(itemDiv);
        };

        // 4. Handle cases where an image fails to load.
        img.onerror = () => {
            console.error(`Failed to load image: ${item.image}`);
            // You could optionally display a placeholder for the broken image here.
        };
    });
}

// Function to open the modal
async function openModal(index) {
    const item = galleryItems[index];
    modalImg.src = item.image;

    // Fetch and render the markdown file
    try {
        const response = await fetch(item.markdown);
        if (!response.ok) throw new Error('Markdown file not found.');
        const mdText = await response.text();
        modalMd.innerHTML = marked.parse(mdText);
    } catch (error) {
        modalMd.innerHTML = `<p class="text-red-400">Error: ${error.message}</p>`;
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Function to close the modal
function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modalImg.src = "";
    modalMd.innerHTML = "";
}

// --- EVENT LISTENERS ---
if (galleryGrid) {
    galleryGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const index = e.target.dataset.index;
            openModal(index);
        }
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // Only close if clicking the background
            closeModal();
        }
    });
}

// --- INITIALIZATION ---
buildGallery();