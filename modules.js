// ICONA 2.0 - Modules list page

// Data for modules list (adapted from user)
const modulesData = {
  modules: [
    {
      id: 1,
      title: "Настройка связей СТК в графике",
      description:
        "Модуль из 6 задач, в ходе которых вы поймете как настраивать различные связи между СТК и как они помогут вам в настройке ГТР.",
      category: "planning",
      tasks: 6,
      duration: "45 минут",
      featured: true,
      competencies: ["initial", "foreman"],
    },
    {
      id: 2,
      title: "Классификатор",
      description: "",
      category: "classifier",
      tasks: 0,
      duration: "0 минут",
      featured: false,
      competencies: ["planner"],
    },
    {
      id: 3,
      title: "Планерка",
      description: "",
      category: "planning-meeting",
      tasks: 0,
      duration: "0 минут",
      featured: false,
      competencies: ["contractor"],
    },
    {
      id: 4,
      title: "Контроль ИПС",
      description: "",
      category: "control-ips",
      tasks: 0,
      duration: "0 минут",
      featured: false,
      competencies: ["initial"],
    },
    {
      id: 5,
      title: "Контроль ЛАБ",
      description: "",
      category: "control-lab",
      tasks: 0,
      duration: "0 минут",
      featured: false,
      competencies: ["foreman"],
    },
    {
      id: 6,
      title: "Контроль ТН",
      description: "",
      category: "control-tn",
      tasks: 0,
      duration: "0 минут",
      featured: false,
      competencies: ["planner"],
    },
  ],
};

// State
let currentCategory = "all";
let selectedCompetencies = ["initial"];

// DOM refs
const moduleNavButtons = document.querySelectorAll(".module-nav-btn");
const modulesGrid = document.getElementById("modules-grid");
const competencyCheckboxes = document.querySelectorAll(
  ".competencies-list input[type='checkbox']"
);

// Boot
function initModulesPage() {
  setupModuleEvents();
  renderModules();
  updateModuleNavUI();
}

document.addEventListener("DOMContentLoaded", initModulesPage);

// Helpers
function setupModuleEvents() {
  // nav buttons
  moduleNavButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      setActiveCategory(e.currentTarget.dataset.category);
    });
  });

  // competency filters
  competencyCheckboxes.forEach((c) => {
    c.addEventListener("change", (e) => {
      const id = e.target.value;
      if (e.target.checked) {
        if (!selectedCompetencies.includes(id)) {
          selectedCompetencies.push(id);
        }
      } else {
        selectedCompetencies = selectedCompetencies.filter((x) => x !== id);
      }
      renderModules();
    });
  });
}

function setActiveCategory(cat) {
  currentCategory = cat;
  updateModuleNavUI();
  renderModules();
}

function updateModuleNavUI() {
  moduleNavButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === currentCategory);
  });
}

function getFilteredModules() {
  // Показываем все модули только если выбран блок "Все модули"
  if (currentCategory === 'all') {
    return modulesData.modules;
  }

  // В остальных случаях применяем фильтры
  return modulesData.modules.filter(module => {
    const categoryOk = module.category === currentCategory;
    const compOk = module.competencies.some(comp => selectedCompetencies.includes(comp));
    return categoryOk && compOk;
  });
}

function createModuleCard(module) {
  const isEmpty = !module.description || module.tasks === 0;
  if (isEmpty) {
    return `
      <div class="module-card empty" data-id="${module.id}">
        <div class="empty-text">${module.title}</div>
      </div>`;
  }
  return `
    <div class="module-card ${module.featured ? "featured" : ""}" data-id="${module.id}">
      <div class="module-card-header">
        <h3 class="module-card-title">${module.title}</h3>
        <p class="module-card-description">${module.description}</p>
      </div>
      <div class="module-card-meta">
        <div class="module-card-meta-item">
          <span>📝</span>
          <span>${module.tasks} задач</span>
        </div>
        <div class="module-card-meta-item">
          <span>⏱️</span>
          <span>${module.duration}</span>
        </div>
      </div>
    </div>`;
}

function renderModules() {
  const list = getFilteredModules();
  modulesGrid.innerHTML = list
    .map((m) => createModuleCard(m))
    .join("\n");

  attachCardEvents();
}

function attachCardEvents() {
  modulesGrid.querySelectorAll(".module-card").forEach((card) => {
    const id = Number(card.dataset.id);
    if (id === 1 && !card.classList.contains("empty")) {
      card.addEventListener("click", () => {
        window.location.href = "engineer.html"; // old detailed page
      });
    } else {
      card.addEventListener("click", () => {
        alert("Содержимое модуля находится в разработке");
      });
    }
  });
} 