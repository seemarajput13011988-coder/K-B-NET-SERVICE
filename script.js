const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".dot"));
const planButtons = Array.from(document.querySelectorAll(".plan-btn"));
const selectedPlan = document.getElementById("selectedPlan");
const bookingForm = document.getElementById("bookingForm");
const captchaQuestion = document.getElementById("captchaQuestion");
const captchaInput = document.getElementById("captchaInput");
const refreshCaptcha = document.getElementById("refreshCaptcha");
const formMessage = document.getElementById("formMessage");
const revealElements = Array.from(document.querySelectorAll(".reveal"));
const stripItems = Array.from(document.querySelectorAll(".strip-item"));
const customerNameInput = document.getElementById("customerName");
const mobileNumberInput = document.getElementById("mobileNumber");
const altNumberInput = document.getElementById("altNumber");
const connectionTypeInput = document.getElementById("connectionType");
const addressInput = document.getElementById("address");
const landmarkInput = document.getElementById("landmark");
const preferredTimeInput = document.getElementById("preferredTime");
const aiToggle = document.getElementById("aiToggle");
const aiWidget = document.getElementById("aiWidget");
const aiClose = document.getElementById("aiClose");
const aiForm = document.getElementById("aiForm");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");

let activeSlide = 0;
let captchaAnswer = 0;

function showSlide(index) {
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === index);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
  });

  activeSlide = index;
}

function nextSlide() {
  const nextIndex = (activeSlide + 1) % slides.length;
  showSlide(nextIndex);
}

function generateCaptcha() {
  const first = Math.floor(Math.random() * 9) + 1;
  const second = Math.floor(Math.random() * 9) + 1;
  captchaAnswer = first + second;
  captchaQuestion.textContent = `${first} + ${second} = ?`;
  captchaInput.value = "";
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/919879669892?text=${encodeURIComponent(message)}`;
}

function validateMobile(value) {
  return /^[0-9]{10}$/.test(value.trim());
}

function addChatMessage(text, sender) {
  const message = document.createElement("article");
  message.className = `ai-message ai-message--${sender}`;
  message.textContent = text;
  aiMessages.appendChild(message);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

function getAiReply(question) {
  const normalized = question.toLowerCase();

  if (normalized.includes("plan") || normalized.includes("price") || normalized.includes("cost")) {
    return "We offer example plans from 50 Mbps to 200 Mbps. Choose a plan on the website and send your booking on WhatsApp for confirmation.";
  }

  if (normalized.includes("ott") || normalized.includes("prime") || normalized.includes("hotstar") || normalized.includes("zee") || normalized.includes("shemaroo")) {
    return "Selected plans include OTT benefits like Prime Video, JioHotstar, Zee5, and Shemaroo. Final availability can be confirmed during booking.";
  }

  if (normalized.includes("install") || normalized.includes("installation") || normalized.includes("setup")) {
    return "After booking, the team checks your address, confirms availability, and guides you on installation and activation timing.";
  }

  if (normalized.includes("whatsapp") || normalized.includes("contact") || normalized.includes("number")) {
    return "You can proceed with the form and continue directly on WhatsApp at 9879669892 for booking support.";
  }

  if (normalized.includes("bsnl") || normalized.includes("provider")) {
    return "K&B NET SERVICE helps customers with BSNL broadband booking support, plan guidance, and installation follow-up.";
  }

  if (normalized.includes("address") || normalized.includes("document") || normalized.includes("details")) {
    return "Please keep your customer name, mobile number, installation address, preferred plan, and captcha ready before proceeding.";
  }

  return "I can help with plans, OTT benefits, installation, booking details, and WhatsApp support. Ask anything and I will guide you.";
}

function markInvalid(field, isInvalid) {
  field.classList.toggle("invalid", isInvalid);
}

function clearValidationState() {
  [
    customerNameInput,
    mobileNumberInput,
    altNumberInput,
    selectedPlan,
    connectionTypeInput,
    addressInput,
    landmarkInput,
    preferredTimeInput,
    captchaInput,
  ].forEach((field) => markInvalid(field, false));
}

function validateFormFields() {
  clearValidationState();

  const customerName = customerNameInput.value.trim();
  const mobileNumber = mobileNumberInput.value.trim();
  const altNumber = altNumberInput.value.trim();
  const connectionType = connectionTypeInput.value;
  const address = addressInput.value.trim();
  const plan = selectedPlan.value;
  const captchaValue = Number(captchaInput.value.trim());

  if (customerName.length < 3) {
    markInvalid(customerNameInput, true);
    return "Please enter a valid customer name.";
  }

  if (!validateMobile(mobileNumber)) {
    markInvalid(mobileNumberInput, true);
    return "Please enter a valid 10-digit mobile number.";
  }

  if (altNumber && !validateMobile(altNumber)) {
    markInvalid(altNumberInput, true);
    return "Alternate number should be a valid 10-digit mobile number.";
  }

  if (!plan) {
    markInvalid(selectedPlan, true);
    return "Please select a plan before proceeding.";
  }

  if (!connectionType) {
    markInvalid(connectionTypeInput, true);
    return "Please choose the connection type.";
  }

  if (address.length < 10) {
    markInvalid(addressInput, true);
    return "Please enter a complete installation address.";
  }

  if (!captchaInput.value.trim()) {
    markInvalid(captchaInput, true);
    return "Please solve the captcha before proceeding.";
  }

  if (captchaValue !== captchaAnswer) {
    markInvalid(captchaInput, true);
    generateCaptcha();
    return "Captcha is incorrect. Please try again.";
  }

  return "";
}

function setupRevealAnimations() {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => {
    if (!element.classList.contains("is-visible")) {
      observer.observe(element);
    }
  });
}

function setupStripAnimation() {
  stripItems.forEach((item, index) => {
    item.style.setProperty("--item-index", index);
  });
}

function openAiWidget() {
  aiWidget.hidden = false;
  aiWidget.classList.add("is-open");
  aiInput.focus();
}

function closeAiWidget() {
  aiWidget.classList.remove("is-open");
  aiWidget.hidden = true;
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

setInterval(nextSlide, 4000);

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPlan.value = button.dataset.plan;
    document.getElementById("book").scrollIntoView({ behavior: "smooth" });
  });
});

refreshCaptcha.addEventListener("click", generateCaptcha);

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const customerName = customerNameInput.value.trim();
  const mobileNumber = mobileNumberInput.value.trim();
  const altNumber = altNumberInput.value.trim();
  const connectionType = connectionTypeInput.value;
  const address = addressInput.value.trim();
  const landmark = landmarkInput.value.trim();
  const preferredTime = preferredTimeInput.value.trim();
  const plan = selectedPlan.value;

  const validationMessage = validateFormFields();
  if (validationMessage) {
    formMessage.textContent = validationMessage;
    return;
  }

  const message = [
    "Hello K&B NET SERVICE, I want to book a BSNL internet connection.",
    "",
    `Customer Name: ${customerName}`,
    `Mobile Number: ${mobileNumber}`,
    `Alternate Number: ${altNumber || "Not provided"}`,
    `Preferred Plan: ${plan}`,
    `Connection Type: ${connectionType}`,
    `Installation Address: ${address}`,
    `Landmark: ${landmark || "Not provided"}`,
    `Preferred Callback Time: ${preferredTime || "Anytime"}`,
  ].join("\n");

  formMessage.textContent = "Redirecting you to WhatsApp with your booking details...";
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  bookingForm.reset();
  clearValidationState();
  generateCaptcha();
});

[
  customerNameInput,
  mobileNumberInput,
  altNumberInput,
  selectedPlan,
  connectionTypeInput,
  addressInput,
  landmarkInput,
  preferredTimeInput,
  captchaInput,
].forEach((field) => {
  field.addEventListener("input", () => {
    markInvalid(field, false);
    if (formMessage.textContent) {
      formMessage.textContent = "";
    }
  });

  field.addEventListener("change", () => {
    markInvalid(field, false);
    if (formMessage.textContent) {
      formMessage.textContent = "";
    }
  });
});

aiToggle.addEventListener("click", () => {
  if (aiWidget.hidden) {
    openAiWidget();
  } else {
    closeAiWidget();
  }
});

aiClose.addEventListener("click", closeAiWidget);

aiForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = aiInput.value.trim();
  if (!question) {
    return;
  }

  addChatMessage(question, "user");
  aiInput.value = "";

  window.setTimeout(() => {
    addChatMessage(getAiReply(question), "bot");
  }, 320);
});

generateCaptcha();
showSlide(0);
setupRevealAnimations();
setupStripAnimation();
