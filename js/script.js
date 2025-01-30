const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const closeMenu = document.querySelector('.close-menu');
const navbar = document.querySelector('.navbar');
let isNavbarVisible = true;
let lastScrollTop = 0;
let lastScrollY = window.scrollY;

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
function initializeVideoControls() {
    if (!projectVideo || !modalVideo || !videoModal || !playBtn || !closeModal) {
        console.log("Video elementleri bulunamadı");
        return;
    }
    // Modalı kapatma
    closeModal.addEventListener('click', () => {
        videoModal.classList.remove('active');
        modalVideo.pause();
        projectVideo.play();
    });

    // Modal dışına tıklandığında kapatma
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            modalVideo.pause();
            projectVideo.play();
        }
    });

   // ESC tuşu kontrolü
   document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        videoModal.classList.remove('active');
        fullVideo.pause();
        previewVideo.play();
    }
});
}

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

        // Küçük video ayarları
        if (previewVideo) {
            previewVideo.muted = true;
            previewVideo.play().catch(err => console.log('Preview video error:', err));
        }

        // Play butonu tıklama
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                videoModal.classList.add('active');
                previewVideo.pause();
                fullVideo.currentTime = 0;
                fullVideo.muted = false;
                fullVideo.play();
            });
        }

        // Video thumbnail tıklama
        if (videoThumbnail) {
            videoThumbnail.addEventListener('click', () => {
                videoModal.classList.add('active');
                previewVideo.pause();
                fullVideo.currentTime = 0;
                fullVideo.muted = false;
                fullVideo.play();
            });
        }

        // Modal kapatma
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                videoModal.classList.remove('active');
                fullVideo.pause();
                previewVideo.play();
            });
        }

        // Modal dışına tıklama
        if (videoModal) {
            videoModal.addEventListener('click', (e) => {
                if (e.target === videoModal) {
                    videoModal.classList.remove('active');
                    fullVideo.pause();
                    previewVideo.play();
                }
            });
        }

        // ESC tuşu kontrolü
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                videoModal.classList.remove('active');
                fullVideo.pause();
                previewVideo.play();
            }
        });
    }

    // Sayfa yüklendiğinde binary rain efektini başlat
    createBinaryRain();
});

// Hamburger menüsü için JavaScript
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Menü açma/kapama
}); 