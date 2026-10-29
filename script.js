// Edit these entries to list only films actually watched by the group.
const films = [
  {
    title: "SIEMPREVIVA",
    year: "2015",
    category: "Historia",
    synopsis: "Una familia enfrenta dificultades económicas y la pérdida de su hogar. La desaparición de Julieta durante la toma del Palacio de Justicia, en 1985, transforma sus vidas.",
    learning: "",
    poster: "https://i.ibb.co/j9jkzMcL/57150-3482-imagen.jpg",
    source: "https://www.proimagenescolombia.com/secciones/cine_colombiano/peliculas_colombianas/pelicula_plantilla.php?id_pelicula=2125"
  },
  {
    title: "SILENCIO EN EL PARAISO",
    year: "2011",
    category: "Realidad social",
    synopsis: "Esta película colombiana muestra la vida de un joven de un barrio humilde de Bogotá que se enamora de una muchacha. Su historia se desarrolla en medio de la pobreza, la violencia y los falsos positivos, mostrando las injusticias que afectan a los jóvenes de los sectores más vulnerables.",
    learning: "",
    poster: "https://cinematecadebogota.gov.co/sites/default/files/2026-04/SEEP2.jpg",
    source: "https://cinematecadebogota.gov.co/node/peliculas/1969"
  },
  {
    title: "LOS REYES DEL MUNDO",
    year: "2022",
    category: "Realidad social",
    synopsis: "Cuenta la historia de cinco jóvenes que viven en las calles de Medellín y emprenden un viaje para recuperar unas tierras que uno de ellos tiene derecho a recibir. Durante el recorrido enfrentan la violencia, la exclusión y las dificultades de una sociedad que muchas veces los rechaza.",
    learning: "",
    poster: "https://i.ibb.co/XfJJychh/los.jpg",
    source: "https://www.proimagenescolombia.com/secciones/cine_colombiano/peliculas_colombianas/pelicula_plantilla.php?id_pelicula=2877"
  },
  {
    title: "LA VENDEDORA DE ROSAS",
    year: "1998",
    category: "Realidad social",
    synopsis: "La película relata la vida de Mónica, una niña que vive en las calles de Medellín y vende rosas para sobrevivir. A través de su historia, se muestran la pobreza, el abandono familiar, las drogas y los peligros que enfrentan muchos niños y jóvenes en las calles.",
    learning: "",
    poster: "https://upload.wikimedia.org/wikipedia/en/5/56/La_vendedora_de_rosas.jpg",
    source: "https://en.wikipedia.org/wiki/La_vendedora_de_rosas"
  },
  {
    title: "CORTOMETRAJE: DISNEY",
    year: "",
    category: "Cultura colombiana",
    synopsis: "",
    learning: "",
    poster: "https://i.ibb.co/0jnrTgCD/Whats-App-Image-2026-10-28-at-5-21-13-PM.jpg",
    source: ""
  }
];

// WhatsApp click-to-chat needs the country code and digits only.
const participationWhatsAppNumber = "573165889720";

const filmGrid = document.querySelector("#film-grid");
const movieDialog = document.querySelector("#movie-dialog");
const photoDialog = document.querySelector("#photo-dialog");
const form = document.querySelector("#participation-form");
const formStatus = document.querySelector("#form-status");

function renderFilms(filter = "Todas") {
  const visibleFilms = films
    .map((film, index) => ({ ...film, index }))
    .filter((film) => filter === "Todas" || film.category === filter);

  if (visibleFilms.length === 0) {
    filmGrid.innerHTML = '<p class="empty-films">Todavía no hay fichas en esta categoría. Añade una película en <code>script.js</code>.</p>';
    return;
  }

  filmGrid.innerHTML = visibleFilms.map((film) => {
    const hasTitle = film.title.trim().length > 0;
    const title = hasTitle ? escapeHTML(film.title) : "Añade una película";
    const year = film.year ? escapeHTML(String(film.year)) : "AÑO —";
    const image = film.poster
      ? `<img src="${escapeAttribute(film.poster)}" alt="Imagen de ${title}" loading="lazy">`
      : '<div class="poster-placeholder"><span class="poster-reel" aria-hidden="true">◉</span><strong>ESPACIO PARA EL PÓSTER</strong><small>Añade una imagen real</small></div>';
    return `<article class="film-card">
      <div class="film-poster">${image}<span class="film-tag">${escapeHTML(film.category)}</span></div>
      <div class="film-info">
        <div class="film-meta"><span>${year}</span><span>COLOMBIA</span></div>
        <h3>${title}</h3>
        ${film.synopsis ? `<p>${escapeHTML(film.synopsis)}</p>` : ""}
        ${film.source ? `<a class="film-source" href="${escapeAttribute(film.source)}" target="_blank" rel="noopener noreferrer">Fuente de la imagen ↗</a>` : ""}
        <button class="text-button" type="button" data-film-index="${film.index}">Conocer más <span aria-hidden="true">→</span></button>
      </div>
    </article>`;
  }).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function escapeAttribute(value) {
  return escapeHTML(value);
}

renderFilms();

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-button.is-active")?.classList.remove("is-active");
    document.querySelector(".filter-button[aria-pressed='true']")?.setAttribute("aria-pressed", "false");
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    renderFilms(button.dataset.filter);
  });
});

filmGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-film-index]");
  if (!button) return;
  const film = films[Number(button.dataset.filmIndex)];
  const title = film.title.trim() ? escapeHTML(film.title) : "Ficha de película por completar";
  const poster = film.poster
    ? `<img src="${escapeAttribute(film.poster)}" alt="Imagen de ${escapeHTML(film.title)}" style="width:100%;height:225px;object-fit:cover">`
    : '<div class="poster-placeholder"><span class="poster-reel" aria-hidden="true">◉</span><strong>ESPACIO PARA EL PÓSTER</strong><small>Añade una imagen real</small></div>';
  const synopsis = film.synopsis.trim() ? `<p>${escapeHTML(film.synopsis)}</p>` : "";
  const learning = film.learning.trim() ? `<h3>¿Qué descubrimos?</h3><p>${escapeHTML(film.learning)}</p>` : "";
  const source = film.source ? `<p><a class="film-source" href="${escapeAttribute(film.source)}" target="_blank" rel="noopener noreferrer">Ver ficha de referencia ↗</a></p>` : "";
  document.querySelector("#dialog-content").innerHTML = `<div class="dialog-poster">${poster}</div>
    <div class="dialog-body"><p class="eyebrow">${escapeHTML(film.category)} · ${film.year ? escapeHTML(String(film.year)) : "AÑO POR AGREGAR"}</p>
      <h2 id="dialog-title">${title}</h2>${synopsis}${learning}${source}</div>`;
  movieDialog.showModal();
});

document.querySelectorAll(".dialog-close").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

[movieDialog, photoDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

document.querySelector("#gallery-grid").addEventListener("click", (event) => {
  const tile = event.target.closest(".gallery-tile");
  if (!tile) return;
  const image = tile.querySelector("img");
  const photoImage = document.querySelector("#photo-dialog-image");
  const caption = document.querySelector("#photo-dialog-caption");
  const existingPlaceholder = photoDialog.querySelector(".photo-placeholder-view");
  existingPlaceholder?.remove();
  photoImage.hidden = Boolean(!image);
  if (image) {
    photoImage.src = image.src;
    photoImage.alt = image.alt || tile.dataset.caption;
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "photo-placeholder-view";
    placeholder.textContent = "Añade una fotografía real a este espacio";
    photoDialog.insertBefore(placeholder, caption);
    photoImage.removeAttribute("src");
  }
  caption.textContent = tile.dataset.caption;
  photoDialog.showModal();
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  navLinks.classList.toggle("is-open", !isOpen);
});
navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;
document.querySelectorAll(".purpose-card, .center-ribbon, .film-card, .leader-panel, .gallery-tile, .join-panel").forEach((element) => {
  element.classList.add("reveal");
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add("is-visible");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.classList.remove("is-error");
  formStatus.replaceChildren();
  if (!form.reportValidity()) return;

  const answers = new FormData(form);
  const message = [
    "Nueva respuesta para el Centro de Interés Luces, Cámara, Colombia",
    "",
    `Nombre completo: ${answers.get("nombre")}`,
    `Grado y curso: ${answers.get("grado")}`,
    `Correo electrónico: ${answers.get("email")}`,
    `Interés en el cine colombiano: ${answers.get("interes")}`,
    `Qué le gustaría aprender: ${answers.get("aprender")}`,
    `Ha visto una película colombiana: ${answers.get("ha_visto")}`,
    `Película: ${answers.get("pelicula") || "No indicó"}`,
    `Motivo para participar: ${answers.get("motivo")}`
  ].join("\n");
  const whatsappUrl = `https://wa.me/${participationWhatsAppNumber}?text=${encodeURIComponent(message)}`;
  const whatsappLink = document.createElement("a");
  whatsappLink.href = whatsappUrl;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
  whatsappLink.textContent = "Abrir WhatsApp con mis respuestas";

  formStatus.textContent = "Se preparó el mensaje en WhatsApp. Revísalo y pulsa Enviar allí para completar el envío. Si WhatsApp no se abrió, usa este enlace: ";
  formStatus.append(whatsappLink);
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
