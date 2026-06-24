function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const selectedServices = Array.from(
    form.querySelectorAll('input[name="services"]:checked')
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
      alert("Thank you for your interest! We will contact you shortly.");
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Thank you for your interest! We will contact you shortly.");
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

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
  }

  images.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
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

initImageLightbox();
initAnalyticsTracking();
