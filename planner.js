let plannerModuleData = {
  title: "Планировщик",
  totalSections: 5,
  currentSection: 1,
  progress: 0,
  keyPoints: [
    "Разработка и оптимизация графиков производства работ",
    "Координация ресурсных потоков проекта",
    "Анализ, корректировка и контроль исполнения сроков",
    "Ведение отчётности, взаимодействие с участниками"
  ],
  sections: [
    {
      id: 1,
      title: "Роль и задачи планировщика",
      status: "current",
      type: "theory",
      duration: "10 мин",
      icon: "📅",
      description: "Определение, должностные функции, роль в команде проекта.",
      content: `
        <div>
          <h4>Кто такой планировщик?</h4>
          <p>Планировщик — специалист по управлению сроками и координации проектных или строительных работ.</p>
          <ul>
            <li>Формирует общий и подробные графики работ</li>
            <li>Контролирует сдерживание сроков</li>
            <li>Инициирует корректирующие мероприятия при отклонениях</li>
          </ul>
        </div>
      `
    },
    {
      id: 2,
      title: "Виды и методы построения графиков",
      status: "locked",
      type: "theory",
      duration: "10 мин",
      icon: "⏳",
      description: "Классификация графиков. Инструменты: сетевые, Gantt, PERT, CPM.",
      content: `
        <div>
          <h4>Типы графиков:</h4>
          <ul>
            <li>Календарные планы</li>
            <li>Сетевые графики (PERT, CPM)</li>
            <li>Диаграммы Ганта</li>
          </ul>
          <h5 class="mt-16">Инструменты автоматизации</h5>
          <ul>
            <li>MS Project, Spider Project, Primavera и др.</li>
          </ul>
        </div>
      `
    },
    {
      id: 3,
      title: "Анализ и управление отклонениями",
      status: "locked",
      type: "theory",
      duration: "10 мин",
      icon: "📈",
      description: "Мониторинг исполнения, выявление критических точек, анализ задержек.",
      content: `
        <div>
          <h4>Работа с отклонениями:</h4>
          <ol>
            <li>Регулярный мониторинг графика</li>
            <li>Определение причин отставания</li>
            <li>Реализация корректирующих действий</li>
          </ol>
          <div class="mt-16 info-message"><strong>Совет:</strong> Фиксируйте все вмешательства в план – для анализа и предотвращения ошибок в будущем.</div>
        </div>
      `
    },
    {
      id: 4,
      title: "Практическое задание",
      status: "locked",
      type: "practice",
      duration: "10 мин",
      icon: "📝",
      description: "Составление и анализ простого графика работ, выявление рисков.",
      content: `
        <div>
          <h4>Практика: Построение диаграммы Ганта</h4>
          <p>Выполните схематичное построение графика для этапа строительства по шаблону.</p>
          <button class="exercise-button" onclick="completeExercisePlanner(1)">Отметить как выполнено</button>
        </div>
      `
    },
    {
      id: 5,
      title: "Итоговый тест",
      status: "locked",
      type: "test",
      duration: "10 мин",
      icon: "✅",
      description: "Проверьте свои знания по модулю «Планировщик».",
      content: `
        <div>
          <h4>Итоговый тест</h4>
          <p>Ответьте на вопросы. Сертификат выдаётся при результате от 80%.</p>
          <button class="btn btn--primary btn--lg" onclick="startFinalTestPlanner()">Начать тестирование</button>
        </div>
      `
    }
  ]
};

let plannerTestQuestions = [
  {
    question: "Что является основной функцией планировщика?",
    options: [
      "Обеспечение финансового контроля",
      "Разработка и координация графиков работ",
      "Проведение закупок",
      "Ведение юридической документации"
    ],
    correct: 1
  },
  {
    question: "Какой график часто используют для отображения этапов и их длительности?",
    options: [
      "Диаграмма Ганта",
      "Блок-схема",
      "Оргструктура",
      "Техническое задание"
    ],
    correct: 0
  },
  {
    question: "Что должен делать планировщик при обнаружении отставания?",
    options: [
      "Сообщить только руководителю",
      "Игнорировать отклонения",
      "Анализировать причины и инициировать корректирующие мероприятия",
      "Передать ответственность подрядчику"
    ],
    correct: 2
  }
];

let plannerCurrentSectionIndex = 0;
let plannerCompletedSections = new Set();
let plannerProgress = 0;
let plannerTestState = {
  current: 0,
  answers: Array(plannerTestQuestions.length).fill(null),
  timer: null,
  timeLeft: 600
};
let plannerPages = {};

document.addEventListener("DOMContentLoaded", function() {
  plannerPages = {
    overview: document.getElementById("moduleOverviewPage"),
    learning: document.getElementById("learningPage"),
    test: document.getElementById("testPage"),
    certificate: document.getElementById("certificatePage")
  };
  plannerInitializeApp();
  plannerAttachEventListeners();
  plannerUpdateAuthHeader();
});

// ------------ ОСНОВНОЙ КОД ----------
function plannerInitializeApp() {
  plannerProgress = plannerModuleData.progress;
  plannerCurrentSectionIndex = plannerModuleData.currentSection - 1;
  plannerModuleData.sections.forEach((section, idx) => {
    if (section.status === "completed") plannerCompletedSections.add(idx);
  });
  plannerUpdateOverviewProgress();
  plannerRenderKeyPoints();
}
function plannerAttachEventListeners() {
  const startBtn = document.getElementById("startLearningBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const testPrevBtn = document.getElementById("testPrevBtn");
  const testNextBtn = document.getElementById("testNextBtn");
  const finishTestBtn = document.getElementById("finishTestBtn");
  const downloadCertBtn = document.getElementById("downloadCertBtn");
  const backToModulesBtn = document.getElementById("backToModulesBtn");

  if (startBtn) startBtn.addEventListener("click", plannerStartLearning);
  if (prevBtn) prevBtn.addEventListener("click", () => plannerNavigateSection(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => plannerNavigateSection(1));
  if (testPrevBtn) testPrevBtn.addEventListener("click", () => plannerNavigateTest(-1));
  if (testNextBtn) testNextBtn.addEventListener("click", () => plannerNavigateTest(1));
  if (finishTestBtn) finishTestBtn.addEventListener("click", plannerFinishTest);
  if (downloadCertBtn) downloadCertBtn.addEventListener("click", plannerDownloadCertificate);
  if (backToModulesBtn) backToModulesBtn.addEventListener("click", () => plannerShowPage("overview"));
}
function plannerShowPage(page) {
  Object.values(plannerPages).forEach(pg => { if (pg) pg.classList.remove("active"); });
  if (plannerPages[page]) plannerPages[page].classList.add("active");
}
function plannerStartLearning() {
  plannerShowPage("learning");
  plannerRenderCurrentSection();
  plannerRenderSidebar();
  plannerUpdateAllProgress();
}
function plannerNavigateSection(direction) {
  const newIndex = plannerCurrentSectionIndex + direction;
  if (newIndex < 0 || newIndex >= plannerModuleData.sections.length) return;
  if (direction > 0 && !plannerCompletedSections.has(plannerCurrentSectionIndex)) {
    plannerCompletedSections.add(plannerCurrentSectionIndex);
    plannerUpdateLearningProgress();
  }
  if (newIndex > plannerCurrentSectionIndex && !plannerCompletedSections.has(plannerCurrentSectionIndex)) return;
  plannerCurrentSectionIndex = newIndex;
  plannerRenderCurrentSection();
  plannerRenderSidebar();
  plannerUpdateAllProgress();
}
function plannerRenderCurrentSection() {
  const section = plannerModuleData.sections[plannerCurrentSectionIndex];
  document.getElementById("sectionTitle").textContent = `Раздел ${section.id}: ${section.title}`;
  document.getElementById("sectionDescription").textContent = section.description;
  document.getElementById("learningBody").innerHTML = section.content;
  plannerUpdateNavigationButtons();
}
function plannerRenderSidebar() {
  const c = document.getElementById("sidebarNavItems");
  if (!c) return;
  c.innerHTML = plannerModuleData.sections.map((s, idx) => {
    let status = "";
    if (idx === plannerCurrentSectionIndex) status = "active";
    else if (plannerCompletedSections.has(idx)) status = "completed";
    else if (idx > plannerCurrentSectionIndex) status = "locked";
    return `<div class="sidebar-nav-item ${status}" data-section="${idx}">
      <span class="sidebar-nav-icon">${s.icon}</span>
      <div>
        <div class="sidebar-nav-title">${s.title}</div>
        <small>${s.duration}</small>
      </div>
    </div>`;
  }).join("");
  c.querySelectorAll(".sidebar-nav-item").forEach(item => {
    item.addEventListener("click", function() {
      const idx = parseInt(this.dataset.section);
      if (idx <= plannerCurrentSectionIndex || plannerCompletedSections.has(idx - 1)) {
        plannerCurrentSectionIndex = idx;
        plannerRenderCurrentSection();
        plannerRenderSidebar();
        plannerUpdateAllProgress();
      } else {
        alert("Завершите предыдущие разделы для доступа");
      }
    });
  });
}
function plannerRenderKeyPoints() {
  const c = document.getElementById("keyPointsList");
  if (!c) return;
  c.innerHTML = plannerModuleData.keyPoints.map(p => `<li>${p}</li>`).join('');
}
function plannerUpdateNavigationButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn) prevBtn.style.visibility = plannerCurrentSectionIndex === 0 ? "hidden" : "visible";
  if (nextBtn) {
    nextBtn.textContent = plannerCurrentSectionIndex === plannerModuleData.sections.length - 1
      ? "К финальному тесту →" : "Следующий раздел →";
  }
}
function plannerUpdateAllProgress() {
  plannerUpdateOverviewProgress();
  plannerUpdateLearningProgress();
}
function plannerUpdateOverviewProgress() {
  const progress = Math.round((plannerCompletedSections.size / plannerModuleData.sections.length) * 100);
  plannerProgress = progress;
  const pPercent = document.getElementById("progressPercent");
  const pFill = document.getElementById("progressFill");
  if (pPercent) pPercent.textContent = `${progress}%`;
  if (pFill) pFill.style.width = `${progress}%`;
}
function plannerUpdateLearningProgress() {
  const fill = document.getElementById("headerProgressFill");
  const text = document.getElementById("headerProgressText");
  if (fill) fill.style.width = `${plannerProgress}%`;
  if (text) text.textContent = `${plannerProgress}% завершено`;
}
function completeExercisePlanner(idx) {
  alert(`Практическое задание выполнено!`);
  plannerCompletedSections.add(plannerCurrentSectionIndex);
  plannerUpdateLearningProgress();
}
// --- Тест и сертификат ---
function startFinalTestPlanner() { plannerStartTest(); }
function plannerStartTest() {
  plannerCompletedSections.add(plannerCurrentSectionIndex);
  plannerUpdateAllProgress();
  plannerShowPage("test");
  plannerTestState.current = 0;
  plannerTestState.answers.fill(null);
  plannerTestState.timeLeft = 600;
  plannerRenderTestQuestion();
  plannerUpdateTestProgress();
  plannerStartTestTimer();
}
function plannerRenderTestQuestion() {
  const q = plannerTestQuestions[plannerTestState.current];
  const c = document.getElementById("testContent");
  if (!c) return;
  c.innerHTML = `
    <div class="test-question">
      <h3>Вопрос ${plannerTestState.current + 1}</h3>
      <p>${q.question}</p>
      <div class="test-answers">
        ${q.options.map((o, i) => `
          <label class="test-answer ${plannerTestState.answers[plannerTestState.current] === i ? 'selected' : ''}">
            <input type="radio" name="plannerTestAnswer" value="${i}" ${plannerTestState.answers[plannerTestState.current] === i ? 'checked' : ''}>
            <span class="test-answer-text">${o}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `;
  c.querySelectorAll('input[name="plannerTestAnswer"]').forEach(radio => {
    radio.addEventListener('change', function(e) {
      plannerTestState.answers[plannerTestState.current] = parseInt(e.target.value);
      plannerRenderTestQuestion();
    });
  });
  plannerUpdateTestNavigation();
}
function plannerUpdateTestNavigation() {
  const prevBtn = document.getElementById("testPrevBtn");
  const nextBtn = document.getElementById("testNextBtn");
  const finishBtn = document.getElementById("finishTestBtn");
  if (prevBtn) prevBtn.style.visibility = plannerTestState.current === 0 ? "hidden" : "visible";
  const isLast = plannerTestState.current === plannerTestQuestions.length - 1;
  if (nextBtn) nextBtn.classList.toggle("hidden", isLast);
  if (finishBtn) finishBtn.classList.toggle("hidden", !isLast);
}
function plannerNavigateTest(dir) {
  const newIdx = plannerTestState.current + dir;
  if (newIdx >= 0 && newIdx < plannerTestQuestions.length) {
    plannerTestState.current = newIdx;
    plannerRenderTestQuestion();
    plannerUpdateTestProgress();
  }
}
function plannerUpdateTestProgress() {
  const p = Math.round(((plannerTestState.current + 1) / plannerTestQuestions.length) * 100);
  const fill = document.getElementById("testProgressFill");
  const text = document.getElementById("testProgressText");
  if (fill) fill.style.width = `${p}%`;
  if (text) text.textContent = `Вопрос ${plannerTestState.current + 1} из ${plannerTestQuestions.length}`;
}
function plannerStartTestTimer() {
  plannerUpdateTestTimer();
  if (plannerTestState.timer) clearInterval(plannerTestState.timer);
  plannerTestState.timer = setInterval(() => {
    plannerTestState.timeLeft--;
    plannerUpdateTestTimer();
    if (plannerTestState.timeLeft <= 0) {
      clearInterval(plannerTestState.timer);
      plannerFinishTest();
    }
  }, 1000);
}
function plannerUpdateTestTimer() {
  const m = Math.floor(plannerTestState.timeLeft / 60);
  const s = plannerTestState.timeLeft % 60;
  const t = document.getElementById("testTimer");
  if (t) t.textContent = `${m}:${s.toString().padStart(2, '0')}`;
}
function plannerFinishTest() {
  if (plannerTestState.timer) clearInterval(plannerTestState.timer);
  const correct = plannerTestQuestions.reduce(
    (acc, q, idx) => acc + (plannerTestState.answers[idx] === q.correct ? 1 : 0), 0
  );
  const score = Math.round((correct / plannerTestQuestions.length) * 100);
  if (score >= 80) {
    plannerProgress = 100;
    plannerUpdateAllProgress();
    plannerShowCertificate(score);
  } else {
    alert(`Ваш результат: ${score}%. Для получения сертификата необходимо минимум 80%.`);
    plannerTestState.current = 0;
    plannerTestState.answers.fill(null);
    plannerTestState.timeLeft = 600;
    plannerRenderTestQuestion();
    plannerUpdateTestProgress();
    plannerStartTestTimer();
  }
}
function plannerShowCertificate(score) {
  document.getElementById("certificateDate").textContent = new Date().toLocaleDateString("ru-RU");
  document.getElementById("certificateScore").textContent = `${score}%`;
  plannerShowPage("certificate");
}
function plannerDownloadCertificate() {
  const t = `
СЕРТИФИКАТ ICONA 2.0
Планировщик

Подтверждает успешное завершение программы.
Дата: ${new Date().toLocaleDateString("ru-RU")}
Результат теста: ${document.getElementById("certificateScore").textContent}
`;
  const blob = new Blob([t], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "certificate_icona_planner.txt";
  a.click();
  URL.revokeObjectURL(url);
  alert("Сертификат успешно загружен!");
}

// --- Аутентификация для шапки ---
function plannerUpdateAuthHeader() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === '1' || localStorage.getItem('isLoggedIn') === 'true';
  const navUser = document.getElementById('nav-user');
  const loginBtn = document.getElementById('login-btn');
  const navUserName = document.getElementById('nav-user-name');
  const navUserPhoto = document.getElementById('nav-user-photo');
  let userData = {};
  try { userData = JSON.parse(localStorage.getItem('userData') || '{}'); } catch {}
  let name = (userData.firstname || '') + (userData.lastname ? ' ' + userData.lastname : '') || "Пользователь";
  if (isLoggedIn) {
    if (navUser) navUser.style.display = 'flex';
    if (loginBtn) loginBtn.style.display = 'none';
    if (navUserName) navUserName.textContent = name;
    if (navUserPhoto) navUserPhoto.src = localStorage.getItem('userPhoto') || userData.photo || 'https://avatars.dicebear.com/api/personas/username.svg';
  } else {
    if (navUser) navUser.style.display = 'none';
    if (loginBtn) loginBtn.style.display = 'inline-block';
  }
}
window.addEventListener('focus', plannerUpdateAuthHeader);
document.addEventListener('DOMContentLoaded', plannerUpdateAuthHeader);
document.getElementById('nav-user')?.addEventListener('click', function() {
  window.location.href = 'profile.html';
});
