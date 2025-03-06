// Nail designs data
const nailDesigns = [
    {
        id: 1,
        image: "images/nail1.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 2,
        image: "images/nail2.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 3,
        image: "images/nail3.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 4,
        image: "images/nail4.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 5,
        image: "images/nail5.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 6,
        image: "images/nail6.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 7,
        image: "images/nail7.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 8,
        image: "images/nail8.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 9,
        image: "images/nail9.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 10,
        image: "images/nail10.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 11,
        image: "images/nail11.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 12,
        image: "images/nail12.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 13,
        image: "images/nail13.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 14,
        image: "images/nail14.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 15,
        image: "images/nail15.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 16,
        image: "images/nail16.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 17,
        image: "images/nail17.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 18,
        image: "images/nail18.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 19,
        image: "images/nail19.jpg",
        likes: 0,
        dislikes: 0
    },
    {
        id: 20,
        image: "images/nail20.jpg",
        likes: 0,
        dislikes: 0
    }
];

// DOM elements
const currentNailImg = document.getElementById('current-nail');
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const card = document.querySelector('.card');
const resultsBtn = document.getElementById('results-btn');
const resultsModal = document.getElementById('results-modal');
const closeModal = document.querySelector('.close-modal');
const sortSelect = document.getElementById('sort-select');
const chartContainer = document.getElementById('chart-container');

// Current design index
let currentIndex = 0;

// Fallback image URL (placeholder for missing images)
const fallbackImageUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3ENail Design Image%3C/text%3E%3C/svg%3E";

// Initialize with first design
function loadCurrentDesign() {
    // Handle case when we've gone through all designs
    if (currentIndex >= nailDesigns.length) {
        // Show end message or loop back
        currentNailImg.src = fallbackImageUrl;
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
        return;
    }
    
    const design = nailDesigns[currentIndex];
    
    // Create a new image element to preload
    const img = new Image();
    img.onload = function() {
        currentNailImg.src = this.src;
    };
    img.onerror = function() {
        // Use fallback image if the specified image fails to load
        currentNailImg.src = fallbackImageUrl;
        console.log(`Failed to load image: ${design.image}`);
    };
    img.src = design.image;
    
    // Reset any animation classes
    card.classList.remove('swiped-left', 'swiped-right');
    
    // Reset button state
    likeBtn.disabled = false;
    dislikeBtn.disabled = false;
}

// Handle like button click
likeBtn.addEventListener('click', () => {
    // Add animation class
    card.classList.add('swiped-right');
    
    // Increment likes for current design
    nailDesigns[currentIndex].likes++;
    
    // Save the like (could be sent to a server in a real app)
    console.log(`Liked design: ${currentIndex + 1}`);
    
    // Move to next design after animation
    setTimeout(() => {
        currentIndex++;
        loadCurrentDesign();
    }, 300);
});

// Handle dislike button click
dislikeBtn.addEventListener('click', () => {
    // Add animation class
    card.classList.add('swiped-left');
    
    // Increment dislikes for current design
    nailDesigns[currentIndex].dislikes++;
    
    // Save the dislike (could be sent to a server in a real app)
    console.log(`Disliked design: ${currentIndex + 1}`);
    
    // Move to next design after animation
    setTimeout(() => {
        currentIndex++;
        loadCurrentDesign();
    }, 300);
});

// Handle touch/swipe gestures (basic implementation)
let touchStartX = 0;
let touchEndX = 0;

card.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

card.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left (dislike)
        dislikeBtn.click();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right (like)
        likeBtn.click();
    }
}

// Results Modal Functions
resultsBtn.addEventListener('click', () => {
    generateChart();
    resultsModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
});

closeModal.addEventListener('click', () => {
    resultsModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === resultsModal) {
        resultsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle sort change
sortSelect.addEventListener('change', generateChart);

// Generate the chart based on current sort selection
function generateChart() {
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    // Get sorted designs based on selection
    let sortedDesigns = [...nailDesigns];
    
    switch (sortSelect.value) {
        case 'most-likes':
            sortedDesigns.sort((a, b) => b.likes - a.likes);
            break;
        case 'most-dislikes':
            sortedDesigns.sort((a, b) => b.dislikes - a.dislikes);
            break;
        default:
            // Default order (by ID)
            sortedDesigns.sort((a, b) => a.id - b.id);
    }
    
    // Find maximum value for scaling
    const maxValue = Math.max(
        ...sortedDesigns.map(design => Math.max(design.likes, design.dislikes)),
        1 // Ensure at least 1 to avoid division by zero
    );
    
    // Generate chart rows
    sortedDesigns.forEach(design => {
        // Create row element
        const row = document.createElement('div');
        row.className = 'chart-row';
        
        // Create image element
        const imageDiv = document.createElement('div');
        imageDiv.className = 'chart-image';
        const img = document.createElement('img');
        img.src = design.image;
        img.alt = `Nail Design ${design.id}`;
        img.onerror = function() {
            this.src = fallbackImageUrl;
        };
        imageDiv.appendChild(img);
        
        // Create bars container
        const barsDiv = document.createElement('div');
        barsDiv.className = 'chart-bars';
        
        // Create likes bar
        const likesBarContainer = document.createElement('div');
        likesBarContainer.className = 'bar-container';
        
        const likesLabel = document.createElement('div');
        likesLabel.className = 'bar-label';
        likesLabel.textContent = 'Likes';
        
        const likesBarOuter = document.createElement('div');
        likesBarOuter.className = 'bar-outer';
        
        const likesBarInner = document.createElement('div');
        likesBarInner.className = 'bar-inner likes';
        const likesPercentage = (design.likes / maxValue) * 100;
        likesBarInner.style.width = `${likesPercentage}%`;
        
        const likesValue = document.createElement('div');
        likesValue.className = 'bar-value';
        likesValue.textContent = design.likes;
        
        likesBarInner.appendChild(likesValue);
        likesBarOuter.appendChild(likesBarInner);
        likesBarContainer.appendChild(likesLabel);
        likesBarContainer.appendChild(likesBarOuter);
        
        // Create dislikes bar
        const dislikesBarContainer = document.createElement('div');
        dislikesBarContainer.className = 'bar-container';
        
        const dislikesLabel = document.createElement('div');
        dislikesLabel.className = 'bar-label';
        dislikesLabel.textContent = 'Dislikes';
        
        const dislikesBarOuter = document.createElement('div');
        dislikesBarOuter.className = 'bar-outer';
        
        const dislikesBarInner = document.createElement('div');
        dislikesBarInner.className = 'bar-inner dislikes';
        const dislikesPercentage = (design.dislikes / maxValue) * 100;
        dislikesBarInner.style.width = `${dislikesPercentage}%`;
        
        const dislikesValue = document.createElement('div');
        dislikesValue.className = 'bar-value';
        dislikesValue.textContent = design.dislikes;
        
        dislikesBarInner.appendChild(dislikesValue);
        dislikesBarOuter.appendChild(dislikesBarInner);
        dislikesBarContainer.appendChild(dislikesLabel);
        dislikesBarContainer.appendChild(dislikesBarOuter);
        
        // Add bars to container
        barsDiv.appendChild(likesBarContainer);
        barsDiv.appendChild(dislikesBarContainer);
        
        // Add elements to row
        row.appendChild(imageDiv);
        row.appendChild(barsDiv);
        
        // Add row to chart container
        chartContainer.appendChild(row);
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadCurrentDesign();
}); 