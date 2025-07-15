document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const restaurantList = document.getElementById("restaurantList");
  const cards = Array.from(restaurantList.querySelectorAll(".restaurant-card"));
  const paginationControls = document.getElementById("paginationControls");

  const cardsPerPage = 4;
  let currentPage = 1;
  let filteredCards = cards;

  function showPage(page) {
    currentPage = page;

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    // Hide all cards first
    cards.forEach(card => (card.style.display = "none"));

    // Show only the cards on this page
    filteredCards.slice(start, end).forEach(card => (card.style.display = "flex"));

    renderPagination();
  }

  //pagination
  function renderPagination() {
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    paginationControls.innerHTML = "";

    if (totalPages <= 1) return; // No pagination needed if 1 or 0 pages

    // Previous button
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => showPage(currentPage - 1));
    paginationControls.appendChild(prevBtn);

    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      pageBtn.classList.toggle("active", i === currentPage);
      pageBtn.addEventListener("click", () => showPage(i));
      paginationControls.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => showPage(currentPage + 1));
    paginationControls.appendChild(nextBtn);
  }

  //search by district
  function filterCards() {
    const query = searchInput.value.trim().toLowerCase();

    filteredCards = cards.filter(card => {
      // Check name, district, and the visible text inside card
      const name = (card.getAttribute("data-name") || "").toLowerCase();
      const district = (card.getAttribute("data-district") || "").toLowerCase();
      const text = card.textContent.toLowerCase();

      return (
        name.includes(query) ||
        district.includes(query) ||
        text.includes(query)
      );
    });

    // Show first page of filtered results
    showPage(1);
  }

  // Initialize
  searchInput.addEventListener("input", filterCards);

  // Show initial page (all cards)
  showPage(1);
});


//open menu
function openMenuModal(button) {
  const menuData = button.getAttribute("data-menu");
  const menuTitle = button.getAttribute("data-title") || "Restaurant Menu";
  const menuContainer = document.getElementById("menuContainer");
  const menuHeading = document.getElementById("menuTitle");

  menuContainer.innerHTML = "";
  menuHeading.textContent = menuTitle;

  if (menuData.endsWith(".pdf")) {
    if (window.innerWidth <= 768) {
      window.open(menuData, "_blank");
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = menuData;
    iframe.width = "100%";
    iframe.height = "600px";
    iframe.style.border = "none";
    menuContainer.appendChild(iframe);
  } else {
    const imageUrls = menuData.split(",");
    const scrollWrapper = document.createElement("div");
    scrollWrapper.className = "menu-scroll-wrapper";

    imageUrls.forEach(url => {
      const zoomWrapper = document.createElement("div");
      zoomWrapper.className = "zoom-wrapper";

      const img = document.createElement("img");
      img.src = url.trim();
      img.alt = menuTitle;
      img.className = "menu-img-scroll";

      zoomWrapper.appendChild(img);
      scrollWrapper.appendChild(zoomWrapper);
    });

    menuContainer.appendChild(scrollWrapper);
  }

  document.getElementById("menuModal").style.display = "flex";
}

//close menu
function closeMenuModal() {
  document.getElementById("menuModal").style.display = "none";
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("menuModal");
  if (event.target === modal) {
    closeMenuModal();
  }
});

// Zoom toggle on image click
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("menu-img-scroll")) {
    e.target.classList.toggle("zoomed");
  }
});

// Scroll-to-top button logic
const scrollBtn = document.getElementById("scrollToTopBtn");

// Show button when scroll down
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Scroll to top on click
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
