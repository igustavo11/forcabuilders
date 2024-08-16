// portifolio metodo
const buttons = document.querySelectorAll('.showImagesButton');
const loadMoreButton = document.getElementById('loadMore');
const portfolioDiv = document.getElementById('portfolio');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const closeButton = document.getElementById('closeButton');

let currentIndex = 0;
let displayedImagesCount = 8; 
let currentImageSet = [];

function showImages(imageSet) {
    portfolioDiv.innerHTML = '';
    const currentImages = imageSet.slice(0, displayedImagesCount); 
    currentImages.forEach((image, index) => {
        const imgElement = `<img src="${image}" alt="Imagem" class="house-image" data-index="${index}">`;
        portfolioDiv.innerHTML += imgElement;
    });
    addImageClickListener();
    loadMoreButton.style.display = displayedImagesCount < imageSet.length ? 'block' : 'none'; 
}

function addImageClickListener() {
    const houseImages = document.querySelectorAll('.house-image');
    houseImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            currentIndex = index; 
            showModal(currentIndex);
        });
    });
}

function showModal(index) {
    modalImage.src = currentImageSet[index]; 
    modal.style.display = 'flex';
    document.addEventListener('keydown', handleKeyPress); 
}

function hideModal() {
    modal.style.display = 'none';
    document.removeEventListener('keydown', handleKeyPress); 
}

function updateModalImage(index) {
    modalImage.src = currentImageSet[index]; 
}

function handleKeyPress(event) {
    if (modal.style.display === 'flex') {
        if (event.key === 'ArrowLeft') { 
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentImageSet.length - 1; 
            updateModalImage(currentIndex);
        } else if (event.key === 'ArrowRight') { 
            currentIndex = (currentIndex < currentImageSet.length - 1) ? currentIndex + 1 : 0; 
            updateModalImage(currentIndex);
        } else if (event.key === 'Escape') { 
            hideModal();
        }
    }
}

function setActiveButton(clickedButton) {
    buttons.forEach(button => button.classList.remove('active'));
    clickedButton.classList.add('active');
}

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        setActiveButton(event.target);
        currentImageSet = imageSets[button.dataset.set]; 
        displayedImagesCount = 8; 
        showImages(currentImageSet); 
    });
});

loadMoreButton.addEventListener('click', () => {
    displayedImagesCount += 4; 
    showImages(currentImageSet);
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentImageSet.length - 1; 
    updateModalImage(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < currentImageSet.length - 1) ? currentIndex + 1 : 0; 
    updateModalImage(currentIndex);
});

closeButton.addEventListener('click', hideModal); 

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});
setActiveButton(buttons[0]);
showImages(imageSets[0]); 