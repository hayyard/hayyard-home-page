function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const selectedServices = Array.from(
    form.querySelectorAll('input[name="services"]:checked'),
  ).map((item) => item.value);
  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
    services: selectedServices.join(", "),
    message: form.message.value,
  };

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxZ-7hMOxv5Ddm0myTTgGTXgw78d9rfcoTVVqQhwIeGkXETWvRUKShj0smhDp-bjFKh/exec";
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      alert("感谢您的关注！我们会尽快与您联系。");
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    })
    .catch((error) => {
      console.error("错误:", error);
      alert("感谢您的关注！我们会尽快与您联系。");
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

function initImageLightbox() {
  const images = document.querySelectorAll(".about-image-card img");
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const previousButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");
  const imageList = Array.from(images);
  let currentImageIndex = -1;

  function showImageByIndex(index) {
    if (!imageList.length) {
      return;
    }

    currentImageIndex = (index + imageList.length) % imageList.length;
    const activeImage = imageList[currentImageIndex];
    lightboxImage.src = activeImage.src;
    lightboxImage.alt = activeImage.alt;
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    currentImageIndex = -1;
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }

  imageList.forEach((img, index) => {
    img.addEventListener("click", () => {
      showImageByIndex(index);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  previousButton?.addEventListener("click", () => {
    showImageByIndex(currentImageIndex - 1);
  });
  nextButton?.addEventListener("click", () => {
    showImageByIndex(currentImageIndex + 1);
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showImageByIndex(currentImageIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showImageByIndex(currentImageIndex + 1);
    }
  });
}

function initAboutLoadMore() {
  const loadMoreButton = document.getElementById("about-load-more");
  const viewLessButton = document.getElementById("about-view-less");
  const cards = Array.from(
    document.querySelectorAll(".about-content .about-image-card"),
  );
  const cardsPerPair = 2;
  const initialVisiblePairs = 3;
  const expandPairsPerClick = 999;

  if (!loadMoreButton || !viewLessButton || !cards.length) {
    return;
  }

  const totalPairs = Math.ceil(cards.length / cardsPerPair);
  let visiblePairs = Math.min(initialVisiblePairs, totalPairs);

  function render() {
    cards.forEach((card, index) => {
      const pairIndex = Math.floor(index / cardsPerPair);
      const isVisible = pairIndex < visiblePairs;
      card.classList.toggle("about-card-hidden", !isVisible);
    });

    const hasMore = visiblePairs < totalPairs;
    const isExpanded = visiblePairs > initialVisiblePairs;
    loadMoreButton.hidden = !hasMore;
    loadMoreButton.style.display = hasMore ? "inline-block" : "none";
    loadMoreButton.setAttribute("aria-hidden", String(!hasMore));
    viewLessButton.hidden = !isExpanded;
    viewLessButton.style.display = isExpanded ? "inline-block" : "none";
    viewLessButton.setAttribute("aria-hidden", String(!isExpanded));
  }

  loadMoreButton.addEventListener("click", () => {
    visiblePairs = Math.min(visiblePairs + expandPairsPerClick, totalPairs);
    render();
  });

  viewLessButton.addEventListener("click", () => {
    visiblePairs = Math.min(initialVisiblePairs, totalPairs);
    render();
    loadMoreButton.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  render();
}

function initPhotoUploadLabel() {
  const photoInput = document.getElementById("photo");
  const photoFileName = document.getElementById("photo-file-name");

  if (!photoInput || !photoFileName) {
    return;
  }

  photoInput.addEventListener("change", () => {
    const fileName =
      photoInput.files && photoInput.files.length
        ? photoInput.files[0].name
        : "未选择文件";
    photoFileName.textContent = fileName;
  });
}

function initAnalyticsTracking() {
  const callButton = document.getElementById("btn-call");
  const textButton = document.getElementById("btn-text");

  callButton?.addEventListener("click", () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "click_call_now", { location: "navbar" });
    }
  });

  textButton?.addEventListener("click", () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "click_text_us", { location: "navbar" });
    }
  });
}

initAboutLoadMore();
initImageLightbox();
initPhotoUploadLabel();
initAnalyticsTracking();
