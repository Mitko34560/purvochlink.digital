const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector("#navMenu");
const filterButtons = document.querySelectorAll("[data-filter]");
const newsCards = document.querySelectorAll(".news-card");
const newsSearch = document.querySelector("#newsSearch");
const newsEmpty = document.querySelector("#newsEmpty");
const tabButtons = document.querySelectorAll("[data-tab]");
const form = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

document.querySelector("#year").textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

function updateNews() {
  const activeFilter = document.querySelector("[data-filter].is-active").dataset.filter;
  const query = newsSearch.value.trim().toLocaleLowerCase("bg-BG");
  let visibleCount = 0;

  newsCards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.textContent.toLocaleLowerCase("bg-BG").includes(query);
    const isVisible = matchesFilter && matchesSearch;
    card.hidden = !isVisible;
    visibleCount += Number(isVisible);
  });

  newsEmpty.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    updateNews();
  });
});

newsSearch.addEventListener("input", updateNews);

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((tab) => {
      tab.classList.remove("is-active");
      tab.setAttribute("aria-selected", "false");
    });

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.remove("is-active");
      panel.hidden = true;
    });

    const panel = document.querySelector(`#${button.dataset.tab}`);
    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
    panel.classList.add("is-active");
    panel.hidden = false;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  formStatus.textContent = "Съобщението е подготвено. Свържете формата с бекенд за реално изпращане.";
});
