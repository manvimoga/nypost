let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("navbar");
const navbarHeight = navbar.offsetHeight;
const scrollOffset = 150; // quanto devi scorrere prima che inizi a nascondersi

window.addEventListener("scroll", () => {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos || currentScrollPos < scrollOffset) {
    // Scroll SU → mostra navbar
    navbar.style.top = "0";
  } else {
    // Scroll GIÙ → nascondi navbar
    navbar.style.top = `-${navbarHeight}px`;
  }

  prevScrollPos = currentScrollPos;
});


document.addEventListener("load", () => {
  const wrappers = document.querySelectorAll(".ad-wrapper");

  function updateAds() {
    // azzera le trasformazioni prima di ricalcolare
    wrappers.forEach(w => {
      const ad = w.querySelector(".ad");
      ad.style.transform = "translateY(0)";
    });

    for (let i = 0; i < wrappers.length - 1; i++) {
      const currentAd = wrappers[i].querySelector(".ad");
      const nextAd = wrappers[i + 1].querySelector(".ad");

      const currentRect = currentAd.getBoundingClientRect();
      const nextRect = nextAd.getBoundingClientRect();

      // se la pubblicità sotto entra nello spazio di quella sopra
      if (nextRect.top <= currentRect.bottom) {
        const overlap = currentRect.bottom - nextRect.top;
        currentAd.style.transform = `translateY(-${overlap}px)`;
      }
    }
  }

  window.addEventListener("scroll", updateAds);
  window.addEventListener("resize", updateAds);
  updateAds();
});
