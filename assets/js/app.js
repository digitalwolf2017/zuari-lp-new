// Initialize AOS Animation Library
document.addEventListener("DOMContentLoaded", function () {
  // Auto-stagger: assign incremental delays to [data-aos] children of [data-aos-stagger] containers
  document.querySelectorAll("[data-aos-stagger]").forEach((container) => {
    const step = parseInt(container.getAttribute("data-aos-stagger"), 10) || 80;
    const base =
      parseInt(container.getAttribute("data-aos-stagger-delay"), 10) || 0;
    container.querySelectorAll("[data-aos]").forEach((el, i) => {
      el.setAttribute("data-aos-delay", Math.min(base + i * step, 400));
    });
  });

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 650,
      once: true,
      offset: 120,
      easing: "ease-out-quart",
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }
});

// Tab Switcher Function
function switchPlanTab(tabId, btnElement) {
  // 1. Reset Tab Buttons styling
  document.querySelectorAll(".plan-tab").forEach((btn) => {
    btn.className =
      "plan-tab px-5 py-2.5 text-sm sm:text-sm font-normal rounded-lg transition-all duration-300 bg-slate-200 hover:bg-slate-300 text-slate-700";
  });

  // Active state styling for clicked button
  btnElement.className =
    "plan-tab active-tab px-5 py-2.5 text-sm sm:text-sm font-normal rounded-lg transition-all duration-300 bg-[#0066CC] text-white shadow-md";

  // 2. Hide all images & reveal selected image
  document.querySelectorAll(".tab-img").forEach((img) => {
    img.classList.add("hidden", "opacity-0");
    img.classList.remove("opacity-100");
  });

  const activeImg = document.getElementById("img-" + tabId);
  if (activeImg) {
    activeImg.classList.remove("hidden");
    setTimeout(() => {
      activeImg.classList.remove("opacity-0");
      activeImg.classList.add("opacity-100");
    }, 20);
  }

  // 3. Update CTA button text & modal heading dynamically
  const labelMap = {
    "master-plan": "Master Plan",
    "location-map": "Location Map",
  };

  const planName = labelMap[tabId] || "Plan";
  document.getElementById("btn-text-label").innerText = "View " + planName;
  document.getElementById("modal-form-title").innerText =
    "Enquire For " + planName;
}

// Open Pop-Up Modal Function
function openPlanModal() {
  const modal = document.getElementById("planModal");
  const content = document.getElementById("planModalContent");

  modal.classList.remove("opacity-0", "pointer-events-none");
  modal.classList.add("opacity-100", "pointer-events-auto");

  content.classList.remove("scale-95");
  content.classList.add("scale-100");
}

// Close Pop-Up Modal Function
function closePlanModal() {
  const modal = document.getElementById("planModal");
  const content = document.getElementById("planModalContent");

  modal.classList.add("opacity-0", "pointer-events-none");
  modal.classList.remove("opacity-100", "pointer-events-auto");

  content.classList.add("scale-95");
  content.classList.remove("scale-100");
}

// Close modal when clicking outside form box
document.getElementById("planModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closePlanModal();
  }
});

// Open Full Video Modal
function openVideoModal() {
  const modal = document.getElementById("videoModal");
  const card = document.getElementById("videoModalCard");
  const player = document.getElementById("modalVideoPlayer");

  modal.classList.remove("opacity-0", "pointer-events-none");
  modal.classList.add("opacity-100", "pointer-events-auto");

  card.classList.remove("scale-95");
  card.classList.add("scale-100");

  // Autoplay the native video when modal opens
  if (player) {
    player.currentTime = 0;
    player.play().catch(() => {});
  }
}

// Close Video Modal
function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  const card = document.getElementById("videoModalCard");
  const player = document.getElementById("modalVideoPlayer");

  // Pause and reset the video to stop playback
  if (player) {
    player.pause();
    player.currentTime = 0;
  }

  modal.classList.add("opacity-0", "pointer-events-none");
  modal.classList.remove("opacity-100", "pointer-events-auto");

  card.classList.add("scale-95");
  card.classList.remove("scale-100");
}

// Close modal when clicking on overlay background
document.getElementById("videoModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeVideoModal();
  }
});

// Dynamic image mapping for each amenity tab
const amenityData = {
  adventure: {
    title: "Adventure Play Zone",
    img: "./assets/images/adventure.webp",
  },
  archery: {
    title: "Archery & Precision Zone",
    img: "./assets/images/archery.webp",
  },
  basketball: {
    title: "Basketball Court",
    img: "./assets/images/basketball-court.webp",
  },
  cafe: {
    title: "Clubhouse Cafe & Community Lounge",
    img: "./assets/images/cafe.webp",
  },
  foosball: {
    title: "Foosball & Indoor Games Deck",
    img: "./assets/images/foosball.webp",
  },
  forest: {
    title: "Miyawaki Forest Zone",
    img: "./assets/images/miyawaki-forest.jpg.webp",
  },
  climbing: {
    title: "Rock Climbing Wall",
    img: "./assets/images/rock-climbing.webp",
  },
  senior: {
    title: "Senior Citizens Relaxation Zone",
    img: "./assets/images/senior-citizen-zone.webp",
  },
  swimming: {
    title: "Temperature Controlled Swimming Pool",
    img: "./assets/images/swimming-pool.webp",
  },
};

// Function to switch active image and tab ring styling
function selectAmenity(key, element) {
  const data = amenityData[key];
  if (!data) return;

  // Reset active rings for all amenity tabs
  document.querySelectorAll(".amenity-tab > div").forEach((box) => {
    box.classList.remove("ring-2", "ring-[#0066CC]", "md:ring-2", "md:ring-[#0066CC]");
    box.classList.add("ring-1", "ring-slate-200");
  });

  // Add active blue ring to selected tab
  const selectedBox = element.querySelector("div");
  if (selectedBox) {
    selectedBox.classList.remove("ring-1", "ring-slate-200");
    selectedBox.classList.add("ring-2", "ring-[#0066CC]");
  }

  // Update large preview image with smooth opacity fade
  const imgEl = document.getElementById("amenity-large-preview");
  const titleEl = document.getElementById("hotspot-title");

  if (imgEl) {
    imgEl.style.opacity = "0.3";
    setTimeout(() => {
      imgEl.src = data.img;
      if (titleEl) titleEl.innerText = data.title;
      imgEl.style.opacity = "1";
    }, 150);
  }
}

// Dynamic Tab Content Data
const locationAdvantageData = {
hospital: [
    { time: "9 min", title: "Dhanvantari Ayurvedic Clinic" , href: "https://maps.app.goo.gl/V8RuCu75nUbehi6e8"},
    { time: "10 min", title: "Ayurvedic Hospital At Madhure", href: "https://maps.app.goo.gl/x12zqd9SdwA5Hj4Z7" },
    {
      time: "12 min",
      title: "Sri Paripoorna Sanathana Ayurveda Medical College", href: "https://maps.app.goo.gl/nAxV5Y3EvyZguDGRA"
    },
    { time: "19 min", title: "Maruthi Medicals And General Store", href: "https://maps.app.goo.gl/MpZsbYyZ32DkMtRR9"  },
    { time: "23 min", title: "VCNR Hospital", href: "https://maps.app.goo.gl/PGSLNVYwJhjXjcog8" },
    { time: "24 min", title: "Aasare Hospital", href: "https://maps.app.goo.gl/ay1NtTvhgoweun3r6" },
    { time: "25 min", title: "Amrutha Super Speciality Hospital", href: "https://maps.app.goo.gl/wGM3exbE22fgf1Kw9" },
    {
      time: "27 min",
      title: "Rosy Royal Homoeopathic Medical College & Hospital",href: "https://maps.app.goo.gl/1sdYGdZ4ZrVgU7AWA"
    },
  ],

companies: [
    { time: "1 min", title: "Britannia Industries Ltd", href: "https://maps.app.goo.gl/yfk42mT2uVVFcx5e8" },
    { time: "4 min", title: "V-xpress", href: "https://maps.app.goo.gl/QJndZNQYkCJkDzvT8" },
    {
      time: "5 min",
      title: "SR SEATIING PRIVATE LIMIITED - MANUFACTURING UNIT", href: "https://maps.app.goo.gl/skLNmDhT4VD78qhR8"
    },
    { time: "16 min", title: "Godrej & Boyce Mfg Co LTD",href: "https://maps.app.goo.gl/boaQXCXyH92ESCmw5" },
    { time: "22 min", title: "ABB India Limited", href: "https://maps.app.goo.gl/k4Yj2tC1c8vvq28n7" },
    { time: "24 min", title: "Denso Kirloskar Ind PVT LTD", href: "https://maps.app.goo.gl/uE1i5JWUjX7exf6U8" },
    { time: "25 min", title: "Volvo Constructions Equipment", href: "https://maps.app.goo.gl/VXpkrZ8n3GXS8q2Q7" },
    { time: "40 min", title: "Himalaya Campus", href: "https://maps.app.goo.gl/oAnRbnD73oMYaYkv5" },
  ],

connectivity: [
    { time: "0 min", title: "Proposed IRR", href: "https://maps.app.goo.gl/r7jhgzXyBxFjtUrXA" },
    { time: "12 min", title: "Kannamangala GateBus Stand", href: "https://maps.app.goo.gl/i3nwr8fCs31aMmn58" },
    { time: "19 min", title: "Bhairanayakanahalli Train Station", href: "https://maps.app.goo.gl/EfnSXZ8dgDcaVdfp8" },
    { time: "25 min", title: "Nelamangala Town", href: "https://maps.app.goo.gl/xSGwSdugnkzcJ69e9"  },
    { time: "31 min", title: "KWIN City", href: "https://maps.app.goo.gl/TEhYrDsZ37assD2U9" },
    { time: "37 min", title: "Madavara Metro Station,", href: "https://maps.app.goo.gl/YM7tYABE8xLeKqEb8" },
    { time: "45 min", title: "Airport", href: "https://maps.app.goo.gl/yrny9cmQhddJeqXf6" },
  ],

schools: [
    { time: "5 min", title: "SHIKSHANA GROUP OF INSTITUTIONS", href: "https://maps.app.goo.gl/Hrbdt5TqAyPEigSd9" },
    { time: "6 min", title: "Shree Maatha International Public School", href: "https://maps.app.goo.gl/49ZPi3k2nRugAJJd8" },
    { time: "6 min", title: "Kristu Jayanti CMI Public School", href: "https://maps.app.goo.gl/kLrrHo2uDvKCoeDT6" },
    {
      time: "16 min",
      title: "Kittur rani chennamma Residential School.(KRCRS)", href: "https://maps.app.goo.gl/dfGrexzpYLqpP6uP7"
    },
    { time: "22 min", title: "Thomas Memorial English High School", href: "https://maps.app.goo.gl/qi8n3UeFVV8y4a6q8" },
    { time: "25 min", title: "New Public School", href: "https://maps.app.goo.gl/sMjkqwiYXViKh1zKA" },
    { time: "28 min", title: "Kanva Public school", href: "https://maps.app.goo.gl/s8eJ5DXBAY5icdnRA" },
    { time: "30 min", title: "M K V ENGLISH HIGH SCHOOL", href: "https://maps.app.goo.gl/YVXssLCH4NYG8kF19" },
  ],

colleges: [
    {
      time: "12 min",
      title:
        "Sri Paripoorna Sanathana Ayurveda Medical College, Hospital & Research Centre", href: "https://maps.app.goo.gl/nAxV5Y3EvyZguDGRA"
    },
    { time: "12 min", title: "RAI TECHNOLOGY UNIVERSITY, BENGALURU", href: "https://maps.app.goo.gl/Qk7XJScLtHBUbkKi9" },
    { time: "19 min", title: "Aditya College Of Engineering And Technology", href: "https://maps.app.goo.gl/fvcTcFbtNKdUi1b79" },
    {
      time: "28 min",
      title: "Rosy Royal Homoeopathic Medical College & Hospital", href:"https://maps.app.goo.gl/1sdYGdZ4ZrVgU7AWA"
    },
  ],


recreational: [
    { time: "4 min", title: "L G Mahal Wedding Hall", href: "https://maps.app.goo.gl/meQiQfRNYJprA3Tp6" },
    { time: "17 min", title: "CK Ground & Cricket Academy", href: "https://maps.app.goo.gl/SaMmYRKSxkwBFcKD7" },
    { time: "19 min", title: "SLBTC Lake End Cycling Road", href: "https://maps.app.goo.gl/UHMeRHiBFLyZgafs6" },
    { time: "20 min", title: "Bren Raceway - FIA Grade 2", href: "https://maps.app.goo.gl/Nd7A4qJEtQJ19MeJ8" },
    { time: "22 min", title: "Avyuktha Multi Sports Arena", href: "https://maps.app.goo.gl/zyEAJWF5gaBnQWjv7" },
    { time: "24 min", title: "Hesaraghatta Lake Viewpoint", href: "https://maps.app.goo.gl/SUhETh72ziNFmxb38" },
    { time: "43 min", title: "Bangalore International Exhibition Centre", href: "https://maps.app.goo.gl/ogS8YvRcTKHAzGqH6" },
  ],
};

// Render cards based on selected tab
function renderLocationCards(categoryKey) {
  const grid = document.getElementById("cards-grid");
  const items = locationAdvantageData[categoryKey] || [];

  grid.style.opacity = "0";

  setTimeout(() => {
    grid.innerHTML = items
      .map((item) => {
        return `
          <a href="${item.href || '#'}" target="_blank" rel="noopener noreferrer" class="group bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#0066CC] transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden block">
            <!-- Hover accent bar -->
            <div class="absolute left-0 top-0 h-full w-1 bg-[#0066CC] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom rounded-l-2xl"></div>
            <div>
              <!-- Time Badge -->
              <div class="inline-flex items-center gap-1.5 bg-slate-100/80 group-hover:bg-blue-50 px-2.5 py-1 rounded-full text-[14px] sm:text-sm text-slate-600 group-hover:text-[#0066CC] font-normal mb-2 transition-colors duration-300">
                <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-400 group-hover:text-[#0066CC] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>${item.time}</span>
              </div>
              <!-- Location Title -->
              <h3 class="text-sm sm:text-sm font-normal text-slate-700 group-hover:text-[#0066CC] leading-snug transition-colors duration-300">
                ${item.title}
              </h3>
            </div>
          </a>
        `;
      })
      .join("");

    grid.style.opacity = "1";
  }, 150);
}

// Switch Tab Handler
function switchLocationTab(categoryKey, btnElement) {
  document.querySelectorAll(".loc-tab").forEach((btn) => {
    btn.className =
      "loc-tab w-full sm:w-auto px-2 sm:px-6 py-2.5 text-xs sm:text-sm font-normal rounded-lg transition-all duration-300 bg-slate-200 hover:bg-slate-300 text-slate-700 text-center";
  });

  btnElement.className =
    "loc-tab active-loc-tab w-full sm:w-auto px-2 sm:px-6 py-2.5 text-xs sm:text-sm font-normal rounded-lg transition-all duration-300 bg-[#0066CC] text-white shadow-md text-center";

  renderLocationCards(categoryKey);
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
  renderLocationCards("hospital");
});

function switchGalleryTab(tabNum) {
  // Hide all gallery content panes
  const panes = document.querySelectorAll(".gallery-content-pane");
  panes.forEach((pane) => pane.classList.add("hidden"));

  // Remove active class from all gallery buttons
  const buttons = document.querySelectorAll(".gallery-tab-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("active", "bg-[#0066CC]", "text-white", "shadow-md");
    btn.classList.add("bg-slate-200", "hover:bg-slate-300", "text-slate-700");
  });

  // Show target content pane
  const targetPane = document.getElementById(`galleryTab${tabNum}Content`);
  if (targetPane) {
    targetPane.classList.remove("hidden");
  }

  // Activate active target button
  const targetBtn = document.getElementById(`galleryTabBtn${tabNum}`);
  if (targetBtn) {
    targetBtn.classList.remove("bg-slate-200", "hover:bg-slate-300", "text-slate-700");
    targetBtn.classList.add("active", "bg-[#0066CC]", "text-white", "shadow-md");
  }

  // Refresh AOS on tab change
  setTimeout(() => {
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }, 50);
}

// Tab Switch Logic
function switchTab(tabNum) {
  const tab1Content = document.getElementById("tab1Content");
  const tab2Content = document.getElementById("tab2Content");
  const tab1Btn = document.getElementById("tab1Btn");
  const tab2Btn = document.getElementById("tab2Btn");

  // Pause videos when switching tabs
  pauseVideo(1);
  pauseVideo(2);

  if (tabNum === 1) {
    tab1Content.classList.remove("hidden");
    tab2Content.classList.add("hidden");

    tab1Btn.className =
      "tab-btn active flex items-center justify-center gap-2.5 w-64 sm:w-auto px-6 py-3.5 rounded-lg font-normal text-sm sm:text-base transition-all duration-300 shadow-md bg-sky-600 text-white hover:bg-sky-700 hover:shadow-lg focus:outline-none";
    tab2Btn.className =
      "tab-btn flex items-center justify-center gap-2.5 w-64 sm:w-auto px-6 py-3.5 rounded-lg font-normal text-sm sm:text-base transition-all duration-300 bg-slate-200/80 text-slate-700 hover:bg-slate-300 hover:text-slate-900 hover:shadow-md focus:outline-none";
  } else {
    tab2Content.classList.remove("hidden");
    tab1Content.classList.add("hidden");

    tab2Btn.className =
      "tab-btn active flex items-center justify-center gap-2.5 w-64 sm:w-auto px-6 py-3.5 rounded-lg font-normal text-sm sm:text-base transition-all duration-300 shadow-md bg-sky-600 text-white hover:bg-sky-700 hover:shadow-lg focus:outline-none";
    tab1Btn.className =
      "tab-btn flex items-center justify-center gap-2.5 w-64 sm:w-auto px-6 py-3.5 rounded-lg font-normal text-sm sm:text-base transition-all duration-300 bg-slate-200/80 text-slate-700 hover:bg-slate-300 hover:text-slate-900 hover:shadow-md focus:outline-none";
  }
}

// Video Play/Pause toggle with Unmuted Sound
function togglePlay(id) {
  const video = document.getElementById(`video${id}`);
  const btn = document.getElementById(`playBtn${id}`);

  if (video.paused) {
    // Unmute to enable audio output
    video.muted = false;
    video
      .play()
      .then(() => {
        btn.classList.add("opacity-0", "pointer-events-none");
      })
      .catch((err) => {
        // Fallback if browser blocks unmuted autoplay without prior interaction
        video.muted = true;
        video.play();
        btn.classList.add("opacity-0", "pointer-events-none");
      });
  } else {
    pauseVideo(id);
  }
}

function pauseVideo(id) {
  const video = document.getElementById(`video${id}`);
  const btn = document.getElementById(`playBtn${id}`);
  if (video && !video.paused) {
    video.pause();
    btn.classList.remove("opacity-0", "pointer-events-none");
  }
}

// Side Menu Logic
function openSideMenu() {
  const overlay = document.getElementById("sideMenuOverlay");
  const menu = document.getElementById("sideMenu");

  if (overlay && menu) {
    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100", "pointer-events-auto");

    menu.style.transform = "translateX(0)";
  }
}

function closeSideMenu() {
  const overlay = document.getElementById("sideMenuOverlay");
  const menu = document.getElementById("sideMenu");

  if (overlay && menu) {
    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.classList.remove("opacity-100", "pointer-events-auto");

    menu.style.transform = "translateX(-100%)";
  }
}

// Sticky Header Logic
const siteHeader = document.getElementById("siteHeader");
const siteHeaderLogo = document.getElementById("siteHeaderLogo");
const stickyClasses = [
  "fixed",
  "top-0",
  "left-0",
  "w-full",
  "z-[105]",
  "bg-white/85",
  "backdrop-blur-md",
  "shadow-md",
  "py-3",
  "px-4",
  "sm:px-6",
  "lg:px-12",
];
const logoDefaultClasses = ["w-32", "sm:w-48", "md:w-56"];
const logoStickyClasses = ["w-24", "sm:w-28", "md:w-40"];

function toggleStickyHeader() {
  if (!siteHeader) return;

  if (window.scrollY > 80) {
    siteHeader.classList.add(...stickyClasses);
    if (siteHeaderLogo) {
      siteHeaderLogo.classList.remove(...logoDefaultClasses);
      siteHeaderLogo.classList.add(...logoStickyClasses);
    }
  } else {
    siteHeader.classList.remove(...stickyClasses);
    if (siteHeaderLogo) {
      siteHeaderLogo.classList.add(...logoDefaultClasses);
      siteHeaderLogo.classList.remove(...logoStickyClasses);
    }
  }
}

window.addEventListener("scroll", toggleStickyHeader, { passive: true });
toggleStickyHeader();

// Dynamic Year in Footer
const currentYearEl = document.getElementById("current-year");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// ============================================
// AMENITIES LIGHTBOX FUNCTIONALITY
// ============================================

const amenityLightboxData = [
  { key: 'adventure', title: 'Adventure Play Zone', img: './assets/images/adventure.webp' },
  { key: 'archery', title: 'Archery & Precision Zone', img: './assets/images/archery.webp' },
  { key: 'basketball', title: 'Basketball Court', img: './assets/images/basketball-court.webp' },
  { key: 'cafe', title: 'Clubhouse Cafe & Community Lounge', img: './assets/images/cafe.webp' },
  { key: 'foosball', title: 'Foosball & Indoor Games Deck', img: './assets/images/foosball.webp' },
  { key: 'forest', title: 'Miyawaki Forest Zone', img: './assets/images/miyawaki-forest.jpg.webp' },
  { key: 'climbing', title: 'Rock Climbing Wall', img: './assets/images/rock-climbing.webp' },
  { key: 'senior', title: 'Senior Citizens Relaxation Zone', img: './assets/images/senior-citizen-zone.webp' },
  { key: 'swimming', title: 'Temperature Controlled Swimming Pool', img: './assets/images/swimming-pool.webp' },
];

let lightboxState = {
  isOpen: false,
  currentIndex: 0,
};

function openAmenityLightbox(index) {
  const lightbox = document.getElementById('amenityLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxLoader = document.getElementById('lightboxLoader');
  const counter = document.getElementById('lightboxCounter');
  const counterDesktop = document.getElementById('lightboxCounterDesktop');

  if (!lightbox || index < 0 || index >= amenityLightboxData.length) return;

  lightboxState.isOpen = true;
  lightboxState.currentIndex = index;

  const data = amenityLightboxData[index];

  lightboxImage.style.opacity = '0';
  lightboxLoader.classList.remove('hidden');

  const img = new Image();
  img.onload = () => {
    lightboxImage.src = data.img;
    lightboxImage.alt = data.title;
    lightboxLoader.classList.add('hidden');
    lightboxImage.style.opacity = '1';
  };
  img.onerror = () => {
    lightboxLoader.classList.add('hidden');
    lightboxImage.style.opacity = '1';
  };
  img.src = data.img;

  updateLightboxCounter();

  lightbox.classList.remove('opacity-0', 'pointer-events-none');
  lightbox.classList.add('opacity-100', 'pointer-events-auto');
  lightbox.querySelector('div').classList.remove('scale-95');
  lightbox.querySelector('div').classList.add('scale-100');

  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', handleLightboxKeydown);
}

function closeAmenityLightbox() {
  const lightbox = document.getElementById('amenityLightbox');
  if (!lightbox) return;

  lightboxState.isOpen = false;

  lightbox.classList.add('opacity-0', 'pointer-events-none');
  lightbox.classList.remove('opacity-100', 'pointer-events-auto');
  lightbox.querySelector('div').classList.add('scale-95');
  lightbox.querySelector('div').classList.remove('scale-100');

  document.body.style.overflow = '';

  document.removeEventListener('keydown', handleLightboxKeydown);
}

function navigateAmenityLightbox(direction) {
  if (!lightboxState.isOpen) return;

  let newIndex = lightboxState.currentIndex + direction;

  if (newIndex < 0) newIndex = amenityLightboxData.length - 1;
  if (newIndex >= amenityLightboxData.length) newIndex = 0;

  openAmenityLightbox(newIndex);
}

function updateLightboxCounter() {
  const counter = document.getElementById('lightboxCounter');
  const counterDesktop = document.getElementById('lightboxCounterDesktop');
  const text = `${lightboxState.currentIndex + 1} / ${amenityLightboxData.length}`;

  if (counter) counter.textContent = text;
  if (counterDesktop) counterDesktop.textContent = text;
}

function handleLightboxKeydown(e) {
  if (!lightboxState.isOpen) return;

  switch (e.key) {
    case 'Escape':
      closeAmenityLightbox();
      break;
    case 'ArrowLeft':
      navigateAmenityLightbox(-1);
      break;
    case 'ArrowRight':
      navigateAmenityLightbox(1);
      break;
  }
}

document.getElementById('amenityLightbox').addEventListener('click', function (e) {
  if (e.target === this) {
    closeAmenityLightbox();
  }
});

function selectAmenity(key, element) {
  const data = amenityData[key];
  if (!data) return;

  document.querySelectorAll(".amenity-tab > div").forEach((box) => {
    box.classList.remove("ring-2", "ring-[#0066CC]", "md:ring-2", "md:ring-[#0066CC]");
    box.classList.add("ring-1", "ring-slate-200");
  });

  const selectedBox = element.querySelector("div");
  if (selectedBox) {
    selectedBox.classList.remove("ring-1", "ring-slate-200");
    selectedBox.classList.add("ring-2", "ring-[#0066CC]");
  }

  const index = amenityLightboxData.findIndex(item => item.key === key);
  if (index !== -1) {
    openAmenityLightbox(index);
  }
}

// ============================================
// PROJECT GALLERY LIGHTBOX FUNCTIONALITY
// ============================================

const galleryLightboxData = {
  1: [
    { title: 'Mini Football Turf', img: './assets/images/zuari-gallry/football-inr.webp' },
    { title: 'Pickleball Court', img: './assets/images/zuari-gallry/pikelball.webp' },
    { title: 'Half Cricket Turf', img: './assets/images/zuari-gallry/play-5.webp' },
    { title: 'Rock Climbing', img: './assets/images/zuari-gallry/play-3.webp' },
    { title: 'Archery Range', img: './assets/images/zuari-gallry/play-2.webp' },
    { title: 'Basketball Court', img: './assets/images/zuari-gallry/play-4.webp' },
    { title: 'Obstacle Course', img: './assets/images/zuari-gallry/play-1.webp' },
  ],
  2: [
    { title: 'Miyawaki Forest', img: './assets/images/zuari-gallry/wellness-8.webp' },
    { title: 'Openair Gym', img: './assets/images/zuari-gallry/wellness-7.webp' },
    { title: 'Senior Citizen Park', img: './assets/images/zuari-gallry/wellness-4.webp' },
    { title: 'Yoga Deck', img: './assets/images/zuari-gallry/wellness-1.webp' },
    { title: 'Jogging Track', img: './assets/images/zuari-gallry/wellness-6.webp' },
    { title: 'Pet Zone', img: './assets/images/zuari-gallry/wellness-2.webp' },
    { title: 'Relaxation Zone', img: './assets/images/zuari-gallry/Senior-citizen2.webp' },
    { title: 'Sitting Zone', img: './assets/images/zuari-gallry/wellness-10.webp' },
  ],
  3: [
    { title: 'Cafe', img: './assets/images/zuari-gallry/club-1.webp' },
    { title: 'Swimming Pool', img: './assets/images/zuari-gallry/club-2.webp' },
    { title: 'Carrom', img: './assets/images/zuari-gallry/club-3.webp' },
    { title: 'Aerobics and Zumba Studio', img: './assets/images/zuari-gallry/club-4.webp' },
    { title: 'Foosball Table', img: './assets/images/zuari-gallry/club-5.webp' },
    { title: 'Gymnasium', img: './assets/images/zuari-gallry/club-6.webp' },
    { title: 'Live Kitchen', img: './assets/images/zuari-gallry/club-7.webp' },
    { title: 'Live Screening', img: './assets/images/zuari-gallry/club-8.webp' },
  ],
  4: [
    { title: 'Landscape View 1', img: './assets/images/zuari-gallry/Landscape-1.webp' },
    { title: 'Landscape View 2', img: './assets/images/zuari-gallry/Landscape-6.webp' },
    { title: 'Landscape View 3', img: './assets/images/zuari-gallry/Landscape-3.webp' },
    { title: 'Landscape View 4', img: './assets/images/zuari-gallry/Landscape-4.webp' },
    { title: 'Landscape View 5', img: './assets/images/zuari-gallry/Landscape-5.webp' },
    { title: 'Landscape View 6', img: './assets/images/zuari-gallry/Landscape-2.webp' },
    { title: 'Landscape View 7', img: './assets/images/zuari-gallry/Landscape-7.webp' },
    { title: 'Landscape View 8', img: './assets/images/zuari-gallry/Landscape-8.webp' },
  ],
  5: [
    { title: 'Infrastructure View 1', img: './assets/images/zuari-gallry/infrastructure-1.webp' },
    { title: 'Infrastructure View 2', img: './assets/images/zuari-gallry/infrastructure-2.webp' },
    { title: 'Infrastructure View 3', img: './assets/images/zuari-gallry/infrastructure-3.webp' },
    { title: 'Infrastructure View 4', img: './assets/images/zuari-gallry/infrastructure-4.webp' },
    { title: 'Infrastructure View 5', img: './assets/images/zuari-gallry/infrastructure-8.webp' },
    { title: 'Infrastructure View 6', img: './assets/images/zuari-gallry/infrastructure-6.webp' },
    { title: 'Infrastructure View 7', img: './assets/images/zuari-gallry/infrastructure-5.webp' },
    { title: 'Infrastructure View 8', img: './assets/images/zuari-gallry/infrastructure-7.webp' },
  ],
};

let galleryLightboxState = {
  isOpen: false,
  currentTab: 1,
  currentIndex: 0,
};

function openGalleryLightbox(tabNum, index) {
  const lightbox = document.getElementById('amenityLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxLoader = document.getElementById('lightboxLoader');
  const counter = document.getElementById('lightboxCounter');
  const counterDesktop = document.getElementById('lightboxCounterDesktop');

  const tabData = galleryLightboxData[tabNum];
  if (!lightbox || !tabData || index < 0 || index >= tabData.length) return;

  galleryLightboxState.isOpen = true;
  galleryLightboxState.currentTab = tabNum;
  galleryLightboxState.currentIndex = index;

  const data = tabData[index];

  lightboxImage.style.opacity = '0';
  lightboxLoader.classList.remove('hidden');

  const img = new Image();
  img.onload = () => {
    lightboxImage.src = data.img;
    lightboxImage.alt = data.title;
    lightboxLoader.classList.add('hidden');
    lightboxImage.style.opacity = '1';
  };
  img.onerror = () => {
    lightboxLoader.classList.add('hidden');
    lightboxImage.style.opacity = '1';
  };
  img.src = data.img;

  updateGalleryLightboxCounter();

  lightbox.classList.remove('opacity-0', 'pointer-events-none');
  lightbox.classList.add('opacity-100', 'pointer-events-auto');
  lightbox.querySelector('div').classList.remove('scale-95');
  lightbox.querySelector('div').classList.add('scale-100');

  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', handleGalleryLightboxKeydown);
}

function closeGalleryLightbox() {
  const lightbox = document.getElementById('amenityLightbox');
  if (!lightbox) return;

  galleryLightboxState.isOpen = false;

  lightbox.classList.add('opacity-0', 'pointer-events-none');
  lightbox.classList.remove('opacity-100', 'pointer-events-auto');
  lightbox.querySelector('div').classList.add('scale-95');
  lightbox.querySelector('div').classList.remove('scale-100');

  document.body.style.overflow = '';

  document.removeEventListener('keydown', handleGalleryLightboxKeydown);
}

function navigateGalleryLightbox(direction) {
  if (!galleryLightboxState.isOpen) return;

  const tabData = galleryLightboxData[galleryLightboxState.currentTab];
  let newIndex = galleryLightboxState.currentIndex + direction;

  if (newIndex < 0) newIndex = tabData.length - 1;
  if (newIndex >= tabData.length) newIndex = 0;

  openGalleryLightbox(galleryLightboxState.currentTab, newIndex);
}

function updateGalleryLightboxCounter() {
  const counter = document.getElementById('lightboxCounter');
  const counterDesktop = document.getElementById('lightboxCounterDesktop');
  const tabData = galleryLightboxData[galleryLightboxState.currentTab];
  const text = `${galleryLightboxState.currentIndex + 1} / ${tabData.length}`;

  if (counter) counter.textContent = text;
  if (counterDesktop) counterDesktop.textContent = text;
}

function handleGalleryLightboxKeydown(e) {
  if (!galleryLightboxState.isOpen) return;

  switch (e.key) {
    case 'Escape':
      closeGalleryLightbox();
      break;
    case 'ArrowLeft':
      navigateGalleryLightbox(-1);
      break;
    case 'ArrowRight':
      navigateGalleryLightbox(1);
      break;
  }
}

// ============================================
// UNIFIED LIGHTBOX CONTROLS (routes to active lightbox)
// ============================================

function navigateLightbox(direction) {
  if (lightboxState.isOpen) {
    navigateAmenityLightbox(direction);
  } else if (galleryLightboxState.isOpen) {
    navigateGalleryLightbox(direction);
  }
}

function closeLightbox() {
  if (lightboxState.isOpen) {
    closeAmenityLightbox();
  } else if (galleryLightboxState.isOpen) {
    closeGalleryLightbox();
  }
}

// Update overlay click handler to use unified close
document.getElementById('amenityLightbox').addEventListener('click', function (e) {
  if (e.target === this) {
    closeLightbox();
  }
});
