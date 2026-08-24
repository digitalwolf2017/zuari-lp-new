// Initialize AOS Animation Library
  document.addEventListener("DOMContentLoaded", function() {
    // Auto-stagger: assign incremental delays to [data-aos] children of [data-aos-stagger] containers
    document.querySelectorAll('[data-aos-stagger]').forEach((container) => {
      const step = parseInt(container.getAttribute('data-aos-stagger'), 10) || 80;
      const base = parseInt(container.getAttribute('data-aos-stagger-delay'), 10) || 0;
      container.querySelectorAll('[data-aos]').forEach((el, i) => {
        el.setAttribute('data-aos-delay', Math.min(base + i * step, 400));
      });
    });

    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 650,
        once: true,
        offset: 120,
        easing: 'ease-out-quart',
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      });
    }
  });

  // Tab Switcher Function
  function switchPlanTab(tabId, btnElement) {
    // 1. Reset Tab Buttons styling
    document.querySelectorAll('.plan-tab').forEach(btn => {
      btn.className = 'plan-tab px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 bg-slate-200 hover:bg-slate-300 text-slate-700';
    });

    // Active state styling for clicked button
    btnElement.className = 'plan-tab active-tab px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 bg-gradient-to-r from-[#0052CC] to-[#00D2FF] text-white shadow-md';

    // 2. Hide all images & reveal selected image
    document.querySelectorAll('.tab-img').forEach(img => {
      img.classList.add('hidden', 'opacity-0');
      img.classList.remove('opacity-100');
    });

    const activeImg = document.getElementById('img-' + tabId);
    if(activeImg) {
      activeImg.classList.remove('hidden');
      setTimeout(() => {
        activeImg.classList.remove('opacity-0');
        activeImg.classList.add('opacity-100');
      }, 20);
    }

    // 3. Update CTA button text & modal heading dynamically
    const labelMap = {
      'master-plan': 'Master Plan',
      'location-map': 'Location Map',
      'roads-plots': 'Roads & Plots'
    };

    const planName = labelMap[tabId] || 'Plan';
    document.getElementById('btn-text-label').innerText = 'View ' + planName;
    document.getElementById('modal-form-title').innerText = 'Enquire For ' + planName;
  }

  // Open Pop-Up Modal Function
  function openPlanModal() {
    const modal = document.getElementById('planModal');
    const content = document.getElementById('planModalContent');

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');

    content.classList.remove('scale-95');
    content.classList.add('scale-100');
  }

  // Close Pop-Up Modal Function
  function closePlanModal() {
    const modal = document.getElementById('planModal');
    const content = document.getElementById('planModalContent');

    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');

    content.classList.add('scale-95');
    content.classList.remove('scale-100');
  }

  // Close modal when clicking outside form box
  document.getElementById('planModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closePlanModal();
    }
  });



  // Open Full Video Modal
  function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const card = document.getElementById('videoModalCard');
    const player = document.getElementById('modalVideoPlayer');

    // Sample YouTube 360/virtual tour video embed with autoplay
    player.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');

    card.classList.remove('scale-95');
    card.classList.add('scale-100');
  }

  // Close Video Modal
  function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const card = document.getElementById('videoModalCard');
    const player = document.getElementById('modalVideoPlayer');

    // Reset iframe src to stop audio/video playback
    player.src = "";

    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');

    card.classList.add('scale-95');
    card.classList.remove('scale-100');
  }

  // Close modal when clicking on overlay background
  document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeVideoModal();
    }
  });



  // Dynamic image mapping for each amenity tab
  const amenityData = {
   'adventure': {
    title: 'Adventure Play Zone',
    img: './assets/images/adventure.webp'
  },
  'archery': {
    title: 'Archery & Precision Zone',
    img: './assets/images/archery.webp'
  },
  'basketball': {
    title: 'Basketball Court',
    img: './assets/images/basketball-court.webp'
  },
  'cafe': {
    title: 'Clubhouse Cafe & Community Lounge',
    img: './assets/images/cafe.webp'
  },
  'foosball': {
    title: 'Foosball & Indoor Games Deck',
    img: './assets/images/foosball.webp'
  },
  'forest': {
    title: 'Miyawaki Forest Zone',
    img: './assets/images/miyawaki-forest.webp'
  },
  'climbing': {
    title: 'Rock Climbing Wall',
    img: './assets/images/rock-climbing.jpg'
  },
  'senior': {
    title: 'Senior Citizens Relaxation Zone',
    img: './assets/images/senior-citizen-zone.jpg'
  },
  'swimming': {
    title: 'Temperature Controlled Swimming Pool',
    img: './assets/images/swimming-pool.jpg'
  }
  };

  // Function to switch active image and tab ring styling
  function selectAmenity(key, element) {
    const data = amenityData[key];
    if (!data) return;

    // Reset active rings for all amenity tabs
    document.querySelectorAll('.amenity-tab .p-1').forEach(box => {
      box.classList.remove('ring-2', 'ring-[#0066CC]');
      box.classList.add('ring-1', 'ring-slate-200');
    });

    // Add active blue ring to selected tab
    const selectedBox = element.querySelector('.p-1');
    if (selectedBox) {
      selectedBox.classList.remove('ring-1', 'ring-slate-200');
      selectedBox.classList.add('ring-2', 'ring-[#0066CC]');
    }

    // Update large preview image with smooth opacity fade
    const imgEl = document.getElementById('amenity-large-preview');
    const titleEl = document.getElementById('hotspot-title');

    imgEl.style.opacity = '0.3';
    setTimeout(() => {
      imgEl.src = data.img;
      titleEl.innerText = data.title;
      imgEl.style.opacity = '1';
    }, 150);
  }



  // Dynamic Tab Content Data
  const locationAdvantageData = {
    'hospital': [
      { time: '9 min', title: 'Dhanvantari Ayurvedic Clinic' },
      { time: '10 min', title: 'Ayurvedic Hospital At Madhure' },
      { time: '12 min', title: 'Sri Paripoorna Sanathana Ayurveda Medical College' },
      { time: '19 min', title: 'Maruthi Medicals And General Store' },
      { time: '23 min', title: 'VCNR Hospital' },
      { time: '24 min', title: 'Aasare Hospital' },
      { time: '25 min', title: 'Amrutha Super Speciality Hospital' },
      { time: '27 min', title: 'Rosy Royal Homoeopathic Medical College & Hospital' }
    ],
    'companies': [
      { time: '1 min', title: 'Britannia Industries Ltd' },
      { time: '4 min', title: 'V-xpress' },
      { time: '5 min', title: 'SR SEATIING PRIVATE LIMIITED - MANUFACTURING UNIT' },
      { time: '16 min', title: 'Godrej & Boyce Mfg Co LTD' },
      { time: '22 min', title: 'ABB India Limited' },
      { time: '24 min', title: 'Denso Kirloskar Ind PVT LTD' },
      { time: '25 min', title: 'Volvo Constructions Equipment' },
      { time: '40 min', title: 'Himalaya Campus' }
    ],
    'connectivity': [
      { time: '0 min', title: 'Proposed IRR' },
      { time: '12 min', title: 'Kannamangala GateBus Stand' },
      { time: '19 min', title: 'Bhairanayakanahalli Train Station' },
      { time: '25 min', title: 'Nelamangala Town' },
      { time: '31 min', title: 'KWIN City' },
      { time: '37 min', title: 'Madavara Metro Station,' },
      { time: '45 min', title: 'Airport' }
    ],
    'schools': [
      { time: '5 min', title: 'SHIKSHANA GROUP OF INSTITUTIONS' },
      { time: '6 min', title: 'Shree Maatha International Public School' },
      { time: '6 min', title: 'Kristu Jayanti CMI Public School' },
      { time: '16 min', title: 'Kittur rani chennamma Residential School.(KRCRS)' },
      { time: '22 min', title: 'Thomas Memorial English High School' },
      { time: '25 min', title: 'New Public School' },
      { time: '28 min', title: 'Kanva Public school' },
      { time: '30 min', title: 'M K V ENGLISH HIGH SCHOOL' }
    ],
    'colleges': [
      { time: '12 min', title: 'Sri Paripoorna Sanathana Ayurveda Medical College, Hospital & Research Centre' },
      { time: '12 min', title: 'RAI TECHNOLOGY UNIVERSITY, BENGALURU' },
      { time: '19 min', title: 'Aditya College Of Engineering And Technology' },
      { time: '28 min', title: 'Rosy Royal Homoeopathic Medical College & Hospital' }
    ],
    'recreational': [
      { time: '4 min', title: 'L G Mahal Wedding Hall' },
      { time: '17 min', title: 'CK Ground & Cricket Academy' },
      { time: '19 min', title: 'SLBTC Lake End Cycling Road' },
      { time: '20 min', title: 'Bren Raceway - FIA Grade 2' },
      { time: '22 min', title: 'Avyuktha Multi Sports Arena' },
      { time: '24 min', title: 'Hesaraghatta Lake Viewpoint' },
      { time: '43 min', title: 'Bangalore International Exhibition Centre' }
    ]
  };

  // Render cards based on selected tab
  function renderLocationCards(categoryKey) {
    const grid = document.getElementById('cards-grid');
    const items = locationAdvantageData[categoryKey] || [];

    grid.style.opacity = '0';

    setTimeout(() => {
      grid.innerHTML = items.map((item, index) => {
        const borderClass = index === 0 ? 'border-[#0066CC] ring-1 ring-[#0066CC]/30' : 'border-slate-200/80 hover:border-blue-300';
        const titleClass = index === 0 ? 'text-[#0066CC]' : 'text-slate-700';

        return `
          <div class="bg-white/80 backdrop-blur-sm border ${borderClass} rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <!-- Time Badge -->
              <div class="inline-flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-full text-[11px] sm:text-xs text-slate-600 font-medium mb-2">
                <svg class="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>${item.time}</span>
              </div>
              <!-- Location Title -->
              <h3 class="text-xs sm:text-sm font-bold ${titleClass} leading-snug">
                ${item.title}
              </h3>
            </div>
          </div>
        `;
      }).join('');

      grid.style.opacity = '1';
    }, 150);
  }

  // Switch Tab Handler
  function switchLocationTab(categoryKey, btnElement) {
    document.querySelectorAll('.loc-tab').forEach(btn => {
      btn.className = 'loc-tab px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 bg-slate-200 hover:bg-slate-300 text-slate-700';
    });

    btnElement.className = 'loc-tab active-loc-tab px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 bg-[#0066CC] text-white shadow-md';

    renderLocationCards(categoryKey);
  }

  // Initial Load
  document.addEventListener('DOMContentLoaded', () => {
    renderLocationCards('hospital');
  });


  function switchGalleryTab(tabNum) {
      // Hide all gallery content panes
      const panes = document.querySelectorAll('.gallery-content-pane');
      panes.forEach(pane => pane.classList.add('hidden'));

      // Remove active class from all gallery buttons
      const buttons = document.querySelectorAll('.gallery-tab-btn');
      buttons.forEach(btn => {
        btn.className = "gallery-tab-btn px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 bg-slate-200 hover:bg-slate-300 text-slate-700";
      });

      // Show target content pane
      const targetPane = document.getElementById(`galleryTab${tabNum}Content`);
      if (targetPane) {
        targetPane.classList.remove('hidden');
      }

      // Activate active target button
      const targetBtn = document.getElementById(`galleryTabBtn${tabNum}`);
      if (targetBtn) {
        targetBtn.className = "gallery-tab-btn active px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 bg-linear-to-r from-[#0052CC] to-[#00D2FF] text-white shadow-md";
      }

      // Refresh AOS on tab change
      setTimeout(() => {
        AOS.refresh();
      }, 50);}




      // Tab Switch Logic
    function switchTab(tabNum) {
      const tab1Content = document.getElementById('tab1Content');
      const tab2Content = document.getElementById('tab2Content');
      const tab1Btn = document.getElementById('tab1Btn');
      const tab2Btn = document.getElementById('tab2Btn');

      // Pause videos when switching tabs
      pauseVideo(1);
      pauseVideo(2);

      if (tabNum === 1) {
        tab1Content.classList.remove('hidden');
        tab2Content.classList.add('hidden');

        tab1Btn.className = "tab-btn active flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md bg-sky-600 text-white hover:bg-sky-700 hover:shadow-lg focus:outline-none";
        tab2Btn.className = "tab-btn flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 bg-slate-200/80 text-slate-700 hover:bg-slate-300 hover:text-slate-900 hover:shadow-md focus:outline-none";
      } else {
        tab2Content.classList.remove('hidden');
        tab1Content.classList.add('hidden');

        tab2Btn.className = "tab-btn active flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md bg-sky-600 text-white hover:bg-sky-700 hover:shadow-lg focus:outline-none";
        tab1Btn.className = "tab-btn flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 bg-slate-200/80 text-slate-700 hover:bg-slate-300 hover:text-slate-900 hover:shadow-md focus:outline-none";
      }
    }

    // Video Play/Pause toggle with Unmuted Sound
    function togglePlay(id) {
      const video = document.getElementById(`video${id}`);
      const btn = document.getElementById(`playBtn${id}`);

      if (video.paused) {
        // Unmute to enable audio output
        video.muted = false;
        video.play().then(() => {
          btn.classList.add('opacity-0', 'pointer-events-none');
        }).catch(err => {
          // Fallback if browser blocks unmuted autoplay without prior interaction
          video.muted = true;
          video.play();
          btn.classList.add('opacity-0', 'pointer-events-none');
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
        btn.classList.remove('opacity-0', 'pointer-events-none');
      }
    }
