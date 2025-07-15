//nav
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    const parent = toggle.closest('.dropdown');
    // Close other open dropdowns
    document.querySelectorAll('.dropdown.active').forEach(drop => {
      if (drop !== parent) drop.classList.remove('active');
    });
    parent.classList.toggle('active');
  });
});

// Close dropdown if clicking outside
window.addEventListener('click', function () {
  document.querySelectorAll('.dropdown.active').forEach(drop => drop.classList.remove('active'));
});

//sidebar navigation
function showSidebar() {
  document.getElementById('sidebar').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function hideSidebar() {
  document.getElementById('sidebar').classList.remove('show');
  document.body.style.overflow = '';
  document.querySelector('.sidebar-dropdown').classList.remove('open');
}
function toggleSidebarDropdown() {
  document.querySelector('.sidebar-dropdown').classList.toggle('open');
}
document.addEventListener('DOMContentLoaded', function () {
  // Close sidebar when clicking a link
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', hideSidebar);
  });
});


// Video audio toggle
const heroVideo = document.getElementById('hero-video');
const audioBtn = document.getElementById('audio-toggle');
audioBtn.addEventListener('click', () => {
  heroVideo.muted = !heroVideo.muted;
  audioBtn.innerHTML = heroVideo.muted
    ? '<i class="fas fa-volume-mute"></i>'
    : '<i class="fas fa-volume-up"></i>';
});

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}



// Get allValues using querySelectorAll
let allValues = document.querySelectorAll(".value");

// Start the forEach loop for displaying the values
allValues.forEach((singleValue) => {
  let startValue = 0;
  let endValue = parseInt(singleValue.getAttribute("data-value"));
  let duration = Math.floor(2000 / endValue);

  // Counter for increaing the values & display
  let counter = setInterval(function () {
    startValue += 1;
    singleValue.textContent = startValue;
    // Clearing the interval
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});


const searchInput = document.getElementById("searchInput");
const cardsContainer = document.getElementById("restaurantList");
const allCardElements = Array.from(document.querySelectorAll(".card"));
const pagination = document.getElementById("paginationControls");

let filteredCards = allCardElements;
let currentPage = 1;
const itemsPerPage = 3;

function showCards() {
  // Sembunyi semua dulu
  allCardElements.forEach(card => card.style.display = "none");

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const cardsToShow = filteredCards.slice(start, end);

  cardsToShow.forEach(card => card.style.display = "block");

  renderPagination();
}

function renderPagination() {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      showCards();
    });
    pagination.appendChild(btn);
  }
}

//go to other windows tab
function goToLink(url) {
  window.open(url, '_blank');
}

//gallery filter
function filterGallery(category, event) {
  const cards = document.querySelectorAll('.gallery-card');
  const buttons = document.querySelectorAll('.gallery-filters .btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  cards.forEach(card => {
    if (category === 'all' || card.classList.contains(category)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function openVideoModal(videoUrl) {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  const source = document.getElementById('videoSource');

  source.src = videoUrl;
  video.load();
  modal.style.display = 'flex';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');

  video.pause();
  modal.style.display = 'none';
}

