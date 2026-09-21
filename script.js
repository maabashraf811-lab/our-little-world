document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const heroScreen = document.getElementById('hero');
    const contentScreen = document.getElementById('content');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const bgMusic = document.getElementById('bgMusic');

    // إنشاء حاوية القلوب
    const heartsContainer = document.createElement('div');
    heartsContainer.id = 'hearts-container';
    document.body.appendChild(heartsContainer);

    // دالة لإنشاء قلب متساقط
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        const hearts = ['❤️', '💖', '🤍', '🌸', '✨', '💕'];
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 15 + 15;
        heart.style.fontSize = size + 'px';
        const duration = Math.random() * 3 + 3;
        heart.style.animationDuration = duration + 's';
        
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // دالة التايمر الحي (أيام، ساعات، دقائق، ثواني)
    function startLiveTimer() {
        const startDate = new Date('2026-07-16T00:00:00'); 

        function updateTimer() {
            const now = new Date();
            const diff = Math.abs(now - startDate);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minsEl = document.getElementById('minutes');
            const secsEl = document.getElementById('seconds');

            if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
            if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
            if (minsEl) minsEl.innerText = minutes < 10 ? '0' + minutes : minutes;
            if (secsEl) secsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    // أنيميشن الظهور عند التصفح
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.scroll-effect');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top <= windowHeight * 0.85) {
                el.classList.add('show');
            }
        });
    }

    // زرار الفتح
    openBtn.addEventListener('click', () => {
        heroScreen.classList.add('hidden');
        contentScreen.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        startLiveTimer();
        handleScrollAnimation();

        if (bgMusic) {
            bgMusic.play().catch(error => console.log("تعذر تشغيل الصوت تلقائياً: ", error));
        }

        setInterval(createHeart, 300);
    });

    window.addEventListener('scroll', handleScrollAnimation);

    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            const modal = document.getElementById('surpriseModal');
            if (modal) modal.classList.remove('hidden');
        });
    }

    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            const modal = document.getElementById('surpriseModal');
            if (modal) modal.classList.add('hidden');
        });
    }
    // توليد الـ QR Code تلقائياً
new QRCode(document.getElementById("qrcode"), {
    text: "file:///D:/our-little-world/index.html", // حطي رابط موقعك هنا
    width: 150,
    height: 150,
    colorDark : "#d63384", // لون الـ QR مناسب للثيم
    colorLight : "#ffffff"
});
});