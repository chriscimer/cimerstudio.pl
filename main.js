document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // PORTFOLIO MODAL
  // =======================
  const portfolioModal = document.getElementById("modal");
  const portfolioModalContent = document.querySelector("#modal .modal-content");
  const portfolioCloseBtn = portfolioModal.querySelector(".close");
  const portfolioNextBtn = portfolioModal.querySelector(".next");
  const portfolioPrevBtn = portfolioModal.querySelector(".prev");

  let portfolioImages = [];
  let portfolioIndex = 0;

  const allPortfolioImages = Array.from(document.querySelectorAll("#portfolio .gallery img"))
    .concat(Array.from(document.querySelectorAll("div[style*='display:none'] img")));

  allPortfolioImages.forEach(img => {
    img.addEventListener("click", () => {
      const series = img.dataset.series;

      // pobierz wszystkie zdjęcia z tej samej serii
      portfolioImages = allPortfolioImages.filter(el => el.dataset.series === series);
      portfolioIndex = portfolioImages.indexOf(img);
      openPortfolioModal();
    });
  });

  function openPortfolioModal() {
    portfolioModalContent.innerHTML = "";
    if (portfolioImages.length === 0) return;

    // duże zdjęcie
    const mainImage = document.createElement("img");
    mainImage.src = portfolioImages[portfolioIndex].src;
    mainImage.classList.add("main-image");
    portfolioModalContent.appendChild(mainImage);

    // miniaturki
    const thumbsContainer = document.createElement("div");
    thumbsContainer.classList.add("thumbs-container");

    portfolioImages.forEach((imgEl, i) => {
      const thumb = document.createElement("img");
      thumb.src = imgEl.src;
      thumb.classList.add("thumb");
      if (i === portfolioIndex) thumb.classList.add("active-thumb");

      thumb.addEventListener("click", () => {
        portfolioIndex = i;
        openPortfolioModal();
      });

      thumbsContainer.appendChild(thumb);
    });

    portfolioModalContent.appendChild(thumbsContainer);
    portfolioModal.classList.add("active");
  }

  function showNextPortfolio() {
    if (portfolioImages.length === 0) return;
    portfolioIndex = (portfolioIndex + 1) % portfolioImages.length;
    openPortfolioModal();
  }

  function showPrevPortfolio() {
    if (portfolioImages.length === 0) return;
    portfolioIndex = (portfolioIndex - 1 + portfolioImages.length) % portfolioImages.length;
    openPortfolioModal();
  }

  if (portfolioNextBtn) portfolioNextBtn.addEventListener("click", showNextPortfolio);
  if (portfolioPrevBtn) portfolioPrevBtn.addEventListener("click", showPrevPortfolio);
  if (portfolioCloseBtn) portfolioCloseBtn.addEventListener("click", () => portfolioModal.classList.remove("active"));

  portfolioModal.addEventListener("click", e => {
    if (e.target === portfolioModal) portfolioModal.classList.remove("active");
  });

  // =======================
  // SHOP MODAL
  // =======================
  const shopModal = document.getElementById("modal-shop");
  const shopModalImg = document.getElementById("modal-shop-img");
  const shopCloseBtn = shopModal.querySelector(".close");
  const shopNextBtn = shopModal.querySelector(".next");
  const shopPrevBtn = shopModal.querySelector(".prev");

  const shopGalleryImages = document.querySelectorAll("#shop .gallery img");
  let currentShopSeries = [];
  let currentShopIndex = 0;

  shopGalleryImages.forEach(img => {
    img.addEventListener("click", () => {
      const series = img.dataset.series;

      currentShopSeries = Array.from(document.querySelectorAll(
        `#shop .gallery img[data-series="${series}"], #hidden-shop-images img[data-series="${series}"]`
      ));
      currentShopIndex = currentShopSeries.indexOf(img);

      shopModal.style.display = "flex";
      shopModalImg.src = img.src;
    });
  });

  shopCloseBtn.addEventListener("click", () => shopModal.style.display = "none");
  shopNextBtn.addEventListener("click", () => {
    currentShopIndex = (currentShopIndex + 1) % currentShopSeries.length;
    shopModalImg.src = currentShopSeries[currentShopIndex].src;
  });
  shopPrevBtn.addEventListener("click", () => {
    currentShopIndex = (currentShopIndex - 1 + currentShopSeries.length) % currentShopSeries.length;
    shopModalImg.src = currentShopSeries[currentShopIndex].src;
  });

  shopModal.addEventListener("click", e => {
    if (e.target === shopModal) shopModal.style.display = "none";
  });

  // =======================
// HERO IMAGE ROTATION
// =======================
const heroImage = document.getElementById("hero-image");
const heroSection = document.querySelector(".hero");
const lang = heroSection?.dataset?.lang || "pl";

const imagesPL = [
  "/images/h13_chris_cimer.jpg",
  "/images/h14_chris_cimer.jpg",
  "/images/h12_chris_cimer.jpg"
];

const imagesEN = [
  "/images/EN-CHRIS-CIMER-HERO-4.jpg",
  "/images/EN-CHRIS-CIMER-HERO-3.jpg",
  "/images/EN-CHRIS-CIMER-HERO-1.jpg"
];

// wybierz listę zależnie od języka
const heroImages = (lang === "en") ? imagesEN : imagesPL;

let heroIndex = -1; // start po logo

setInterval(() => {
  if (!heroImage) return;

  heroImage.style.opacity = 0;

  setTimeout(() => {
    heroIndex++;
    if (heroIndex >= heroImages.length) heroIndex = 0;

    heroImage.src = heroImages[heroIndex];
    heroImage.style.opacity = 1;
  }, 800);
}, 7000);

  // =======================
  // SMOOTH SCROLLING
  // =======================
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
