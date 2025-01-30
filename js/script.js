const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const closeMenu = document.querySelector('.close-menu');
const navbar = document.querySelector('.navbar');
let isNavbarVisible = true;
let lastScrollTop = 0;




// Scroll olayını dinle
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 50) {
        navbar.classList.add('hidden');
    } else if (scrollTop < lastScrollTop) {
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});


// Video kontrolü için fonksiyon

// Binary Rain Effect
function createBinaryRain() {
    const container = document.getElementById('binaryRain');
    if (!container) return;

    const characters = '01';
    const columnCount = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columnCount; i++) {
        const binary = document.createElement('div');
        binary.className = 'binary';
        binary.style.left = `${i * 20}px`;
        binary.style.animationDuration = `${Math.random() * 3 + 2}s`;
        binary.style.animationDelay = `${Math.random() * 2}s`;
        binary.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
        container.appendChild(binary);
    }
}

// Sayfa yüklendiğinde video kontrollerini başlat
document.addEventListener('DOMContentLoaded', function() {
    // Navbar kontrolü
    const navbar = document.querySelector('.navbar');
    
    let lastScrollY = window.scrollY;

    // Scroll olayını dinle
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Aşağı scroll
            navbar.classList.add('hidden');
            navLinks.classList.remove('active'); // Menü kapat
        } else {
            // Yukarı scroll
            navbar.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    });

   
    // Video kontrolü - sadece projects.html sayfasında
    if (window.location.pathname.includes('projects.html')) {
        const previewVideo = document.getElementById('previewVideo');
        const fullVideo = document.getElementById('fullVideo');
        const videoModal = document.getElementById('videoModal');
        const videoThumbnail = document.getElementById('videoThumbnail');
        const closeModalBtn = document.querySelector('.close-modal');
        const playBtn = document.querySelector('.video-play-btn');

        // Play button click event
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            videoModal.classList.add('active'); // Show modal
            previewVideo.pause(); // Pause preview video
            fullVideo.currentTime = 0; // Reset full video
            fullVideo.muted = false; // Unmute full video
            fullVideo.play(); // Play full video
        });

        // Video thumbnail click event
        videoThumbnail.addEventListener('click', () => {
            videoModal.classList.add('active'); // Show modal
            previewVideo.pause(); // Pause preview video
            fullVideo.currentTime = 0; // Reset full video
            fullVideo.muted = false; // Unmute full video
            fullVideo.play(); // Play full video
        });

        // Close modal button click event
        closeModalBtn.addEventListener('click', () => {
            videoModal.classList.remove('active'); // Hide modal
            fullVideo.pause(); // Pause full video
            previewVideo.play(); // Play preview video
        });

        // Modal click event to close
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active'); // Hide modal
                fullVideo.pause(); // Pause full video
                previewVideo.play(); // Play preview video
            }
        });

        // ESC key event to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                videoModal.classList.remove('active'); // Hide modal
                fullVideo.pause(); // Pause full video
                previewVideo.play(); // Play preview video
            }
        });
    }

    // Sayfa yüklendiğinde binary rain efektini başlat
    createBinaryRain();
});

// Hamburger menüsü için JavaScript
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Menü açma/kapama
    });
} 