// =============================
// CONFIGURAÇÕES DO SITE
// =============================
const WHATSAPP = "5514999999999"; // TROQUE pelo WhatsApp com DDI + DDD, somente números.
const INSTAGRAM = "https://instagram.com/seuinstagram";
const FACEBOOK = "https://facebook.com/seufacebook";

// Links de WhatsApp
function whatsappLink(service = "") {
  const text = service
    ? `Olá! Gostaria de agendar o serviço "${service}". Poderia me passar os horários disponíveis?`
    : "Olá! Gostaria de agendar um horário. Poderia me passar os horários disponíveis?";
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach(link => {
  link.href = whatsappLink(link.dataset.service || "");
  link.target = "_blank";
  link.rel = "noopener";
});

// Redes sociais
document.querySelectorAll('a[href="https://instagram.com/"]').forEach(a => a.href = INSTAGRAM);
document.querySelectorAll('a[href="https://facebook.com/"]').forEach(a => a.href = FACEBOOK);

// Menu mobile
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("mobile-open");
});

document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("mobile-open"));
});

// Modal de pacotes
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalList = document.getElementById("modal-list");
const modalWa = document.getElementById("modal-wa");
const closeModal = () => modal.classList.remove("open");

const packages = {
  brow: {
    title: "Designer de Sobrancelhas",
    items: [
      ["Design Simples", "Modelagem + hidratação", "R$ 50,00"],
      ["Design Completo", "Modelagem + hidratação + coloração", "R$ 70,00"],
      ["Design Premium", "Design + coloração + finalização", "R$ 90,00"]
    ]
  },
  lash: {
    title: "Lash Lifting",
    items: [
      ["Lash Lifting", "Curvatura natural dos fios", "R$ 80,00"],
      ["Lash + Tintura", "Curvatura + coloração", "R$ 100,00"],
      ["Lash Premium", "Curvatura + tintura + nutrição", "R$ 120,00"]
    ]
  },
  wax: {
    title: "Depilação",
    items: [
      ["Sobrancelha", "Depilação facial", "R$ 30,00"],
      ["Buço", "Depilação facial", "R$ 20,00"],
      ["Axilas", "Depilação", "R$ 30,00"],
      ["Meia perna", "Depilação", "R$ 60,00"],
      ["Perna inteira", "Depilação", "R$ 90,00"],
      ["Virilha completa", "Depilação", "R$ 80,00"]
    ]
  },
  massage: {
    title: "Massagem",
    items: [
      ["Relaxante", "30 minutos", "R$ 80,00"],
      ["Modeladora", "40 minutos", "R$ 100,00"],
      ["Drenagem", "50 minutos", "R$ 120,00"],
      ["Massagem + Drenagem", "1 hora", "R$ 160,00"]
    ]
  }
};

document.querySelectorAll("[data-open]").forEach(button => {
  button.addEventListener("click", () => {
    const data = packages[button.dataset.open];
    modalTitle.textContent = data.title;
    modalList.innerHTML = data.items.map(item => `
      <div class="modal-row">
        <div><strong>${item[0]}</strong><br><small>${item[1]}</small></div>
        <strong>${item[2]}</strong>
      </div>
    `).join("");
    modalWa.href = whatsappLink(data.title);
    modalWa.target = "_blank";
    modal.classList.add("open");
  });
});

document.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// Header com sombra ao rolar
window.addEventListener("scroll", () => {
  document.getElementById("header").style.boxShadow =
    window.scrollY > 30 ? "0 8px 30px rgba(0,0,0,.18)" : "none";
});
