let indepModuleData = {
  title: "Специалист независимого контроля",
  totalSections: 5,
  currentSection: 1,
  progress: 0,
  keyPoints: [
    "Независимая оценка качества объектов и работ",
    "Экспертная проверка строительных материалов",
    "Ведение объективной документации",
    "Выдача заключений и рекомендаций"
  ],
  sections: [
    {
      id: 1,
      title: "Роль независимого контроля",
      status: "current",
      type: "theory",
      duration: "10 мин",
      icon: "🧑‍🔬",
      description: "Основы профессии, задачи и ответственность.",
      content: `
        <div>
          <h4>Что делает специалист независимого контроля?</h4>
          <p>Его главная задача — беспристрастная оценка строительных процессов и материалов, выявление и документирование нарушений.</p>
          <ul>
            <li>Обеспечение прозрачности приёмки работ</li>
            <li>Техническая экспертиза и аудит</li>
            <li>Защита интересов заказчика</li>
          </ul>
          <div class="info-message mt-16"><strong>Важно:</strong> Независимый контроль выполняется вне зоны влияния подрядчика.</div>
        </div>
      `
    },
    {
      id: 2,
      title: "Процедуры контроля качества",
      status: "locked",
      type: "theory",
      duration: "10 мин",
      icon: "⚙️",
      description: "Методы определения соответствия работ стандартам.",
      content: `
        <div>
          <h4>Контрольные процедуры</h4>
          <ol>
            <li>Анализ проектной и рабочей документации</li>
            <li>Проверка материалов, входной контроль</li>
            <li>Направление замечаний, фиксация нарушений</li>
            <li>Подготовка актов и заключений</li>
          </ol>
          <div class="practice-exercises mt-16">
            <div class="exercise-card">
              <h6>Практика: Составьте заключение по кейсу</h6>
              <p>Оформите короткое техническое заключение по выявленному дефекту.</p>
              <button class="exercise-button" onclick="completeExerciseIC(1)">Выполнить</button>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 3,
      title: "Документирование и отчетность",
      status: "locked",
      type: "theory",
      duration: "10 мин",
      icon: "📑",
      description: "Правила оформления документов, требования к отчётам.",
      content: `
        <div>
          <h4>Основные формы и документы:</h4>
          <ul>
            <li>Акты выявленных нарушений</li>
            <li>Журналы работ независимого контроля</li>
            <li>Фотоматериалы и приложения</li>
          </ul>
          <div class="info-message mt-16"><strong>Совет:</strong> Всю доказательную базу желательно хранить в электронном архиве.</div>
        </div>
      `
    },
    {
      id: 4,
      title: "Интерактивные кейсы",
      status: "locked",
      type: "practice",
      duration: "10 мин",
      icon: "🧩",
      description: "Проблемные ситуации, сценарии анализа.",
      content: `
        <div>
          <h4>Кейс 1: Оценка дефекта</h4>
          <p>Дано: фото и параметры несоответствия слоя гидроизоляции. Определите риски и предложите действия.</p>
          <button class="exercise-button" onclick="completeExerciseIC(2)">Отметить как выполнено</button>
        </div>
      `
    },
    {
      id: 5,
      title: "Итоговый тест",
      status: "locked",
      type: "test",
      duration: "10 мин",
      icon: "📝",
      description: "Проверка знаний по материалу.",
      content: `
        <div>
          <h4>Итоговый тест</h4>
          <p>Ответьте на вопросы. Сертификат выдаётся при результате от 80%.</p>
          <button class="btn btn--primary btn--lg" onclick="startFinalTestIC()">Начать тестирование</button>
        </div>
      `
    }
  ]
};

// Тест – вопросы и ответы
let indepTestQuestions = [
  {
    question: "В чем состоит основная задача специалиста независимого контроля?",
    options: [
      "Управление проектом",
      "Проведение независимой экспертизы соответствия и качества",
      "Только закупка материалов",
      "Подписание актов без проверки"
    ],
    correct: 1
  },
  {
    question: "Какие документы обязательно оформляют при независимом контроле?",
    options: [
      "Техусловия на электроснабжение",
      "Акты дефектов и заключения",
      "Сметы расходов",
      "Договор с подрядчиком"
    ],
    correct: 1
  },
  {
    question: "Что делать при обнаружении нарушения?",
    options: [
      "Игнорировать",
      "Фиксировать в актах и информировать заинтересованные стороны",
      "Закрыть акт без замечаний",
      "Согласовать только с подрядчиком"
    ],
    correct: 1
  }
];

// --- App State ---
let icCurrentSectionIndex = 0;
let icCompletedSections = new Set();
let icProgress = 0;
let icStartTime = null;
let icTestState = {
  current: 0,
  answers: Array(indepTestQuestions.length).fill(null),
  timer: null,
  timeLeft: 600
};
let icPages = {};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", function() {
  icPages = {
    overview: document.getElementById("moduleOverviewPage"),
    learning: document.getElementById("learningPage"),
    test: document.getElementById("testPage"),
    certificate: document.getElementById("certificatePage")
  };
  icInitializeApp();
  icAttachEventListeners();
  icUpdateAuthHeader();
});

function icInitializeApp() {
  icProgress = indepModuleData.progress;
  icCurrentSectionIndex = indepModuleData.currentSection - 1;
  indepModuleData.sections.forEach((section, idx) => {
    if (section.status === "completed") icCompletedSections.add(idx);
  });
  icUpdateOverviewProgress();
  icRenderKeyPoints();
}

function icAttachEventListeners() {
  const startBtn = document.getElementById("startLearningBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const testPrevBtn = document.getElementById("testPrevBtn");
  const testNextBtn = document.getElementById("testNextBtn");
  const finishTestBtn = document.getElementById("finishTestBtn");
  const downloadCertBtn = document.getElementById("downloadCertBtn");
  const backToModulesBtn = document.getElementById("backToModulesBtn");

  if (startBtn) startBtn.addEventListener("click", icStartLearning);
  if (prevBtn) prevBtn.addEventListener("click", () => icNavigateSection(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => icNavigateSection(1));
  if (testPrevBtn) testPrevBtn.addEventListener("click", () => icNavigateTest(-1));
  if (testNextBtn) testNextBtn.addEventListener("click", () => icNavigateTest(1));
  if (finishTestBtn) finishTestBtn.addEventListener("click", icFinishTest);
  if (downloadCertBtn) downloadCertBtn.addEventListener("click", icDownloadCertificate);
  if (backToModulesBtn) backToModulesBtn.addEventListener("click", () => icShowPage("overview"));
}

function icShowPage(page) {
  Object.values(icPages).forEach(pg => { if (pg) pg.classList.remove("active"); });
  if (icPages[page]) icPages[page].classList.add("active");
}

function icStartLearning() {
  icStartTime = Date.now();
  icShowPage("learning");
  icRenderCurrentSection();
  icRenderSidebar();
  icUpdateAllProgress();
}

function icNavigateSection(direction) {
  const newIndex = icCurrentSectionIndex + direction;
  if (newIndex < 0 || newIndex >= indepModuleData.sections.length) return;
  // Не давать переходить вперёд, пока не завершён текущий
  if (direction > 0 && !icCompletedSections.has(icCurrentSectionIndex)) {
    icCompletedSections.add(icCurrentSectionIndex);
    icUpdateLearningProgress();
  }
  if (newIndex > icCurrentSectionIndex && !icCompletedSections.has(icCurrentSectionIndex)) return;
  icCurrentSectionIndex = newIndex;
  icRenderCurrentSection();
  icRenderSidebar();
  icUpdateAllProgress();
}

function icRenderCurrentSection() {
  const section = indepModuleData.sections[icCurrentSectionIndex];
  document.getElementById("sectionTitle").textContent = `Раздел ${section.id}: ${section.title}`;
  document.getElementById("sectionDescription").textContent = section.description;
  document.getElementById("learningBody").innerHTML = section.content;
  icUpdateNavigationButtons();
}

function icRenderSidebar() {
  const c = document.getElementById("sidebarNavItems");
  if (!c) return;
  c.innerHTML = indepModuleData.sections.map((s, idx) => {
    let status = "";
    if (idx === icCurrentSectionIndex) status = "active";
    else if (icCompletedSections.has(idx)) status = "completed";
    else if (idx > icCurrentSectionIndex) status = "locked";
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
      if (idx <= icCurrentSectionIndex || icCompletedSections.has(idx - 1)) {
        icCurrentSectionIndex = idx;
        icRenderCurrentSection();
        icRenderSidebar();
        icUpdateAllProgress();
      } else {
        alert("Завершите предыдущие разделы для доступа");
      }
    });
  });
}

function icRenderKeyPoints() {
  const c = document.getElementById("keyPointsList");
  if (!c) return;
  c.innerHTML = indepModuleData.keyPoints.map(p => `<li>${p}</li>`).join('');
}

function icUpdateNavigationButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn) prevBtn.style.visibility = icCurrentSectionIndex === 0 ? "hidden" : "visible";
  if (nextBtn) {
    nextBtn.textContent = icCurrentSectionIndex === indepModuleData.sections.length - 1
      ? "К финальному тесту →" : "Следующий раздел →";
  }
}

function icUpdateAllProgress() {
  icUpdateOverviewProgress();
  icUpdateLearningProgress();
}

function icUpdateOverviewProgress() {
  const progress = Math.round((icCompletedSections.size / indepModuleData.sections.length) * 100);
  icProgress = progress;
  const pPercent = document.getElementById("progressPercent");
  const pFill = document.getElementById("progressFill");
  if (pPercent) pPercent.textContent = `${progress}%`;
  if (pFill) pFill.style.width = `${progress}%`;
}

function icUpdateLearningProgress() {
  const fill = document.getElementById("headerProgressFill");
  const text = document.getElementById("headerProgressText");
  if (fill) fill.style.width = `${icProgress}%`;
  if (text) text.textContent = `${icProgress}% завершено`;
}

// --- Практика, интерактив --
function completeExerciseIC(idx) {
  alert(`Задание ${idx} выполнено!`);
  icCompletedSections.add(icCurrentSectionIndex);
  icUpdateLearningProgress();
}

// --- Тестирование и сертификат ---
function startFinalTestIC() { icStartTest(); }
function icStartTest() {
  icCompletedSections.add(icCurrentSectionIndex);
  icUpdateAllProgress();
  icShowPage("test");
  icTestState.current = 0;
  icTestState.answers.fill(null);
  icTestState.timeLeft = 600;
  icRenderTestQuestion();
  icUpdateTestProgress();
  icStartTestTimer();
}

function icRenderTestQuestion() {
  const q = indepTestQuestions[icTestState.current];
  const c = document.getElementById("testContent");
  if (!c) return;
  c.innerHTML = `
    <div class="test-question">
      <h3>Вопрос ${icTestState.current + 1}</h3>
      <p>${q.question}</p>
      <div class="test-answers">
        ${q.options.map((o, i) => `
          <label class="test-answer ${icTestState.answers[icTestState.current] === i ? 'selected' : ''}">
            <input type="radio" name="icTestAnswer" value="${i}" ${icTestState.answers[icTestState.current] === i ? 'checked' : ''}>
            <span class="test-answer-text">${o}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `;
  c.querySelectorAll('input[name="icTestAnswer"]').forEach(radio => {
    radio.addEventListener('change', function(e) {
      icTestState.answers[icTestState.current] = parseInt(e.target.value);
      icRenderTestQuestion();
    });
  });
  icUpdateTestNavigation();
}

function icUpdateTestNavigation() {
  const prevBtn = document.getElementById("testPrevBtn");
  const nextBtn = document.getElementById("testNextBtn");
  const finishBtn = document.getElementById("finishTestBtn");
  if (prevBtn) prevBtn.style.visibility = icTestState.current === 0 ? "hidden" : "visible";
  const isLast = icTestState.current === indepTestQuestions.length - 1;
  if (nextBtn) nextBtn.classList.toggle("hidden", isLast);
  if (finishBtn) finishBtn.classList.toggle("hidden", !isLast);
}

function icNavigateTest(dir) {
  const newIdx = icTestState.current + dir;
  if (newIdx >= 0 && newIdx < indepTestQuestions.length) {
    icTestState.current = newIdx;
    icRenderTestQuestion();
    icUpdateTestProgress();
  }
}
function icUpdateTestProgress() {
  const p = Math.round(((icTestState.current + 1) / indepTestQuestions.length) * 100);
  const fill = document.getElementById("testProgressFill");
  const text = document.getElementById("testProgressText");
  if (fill) fill.style.width = `${p}%`;
  if (text) text.textContent = `Вопрос ${icTestState.current + 1} из ${indepTestQuestions.length}`;
}
function icStartTestTimer() {
  icUpdateTestTimer();
  if (icTestState.timer) clearInterval(icTestState.timer);
  icTestState.timer = setInterval(() => {
    icTestState.timeLeft--;
    icUpdateTestTimer();
    if (icTestState.timeLeft <= 0) {
      clearInterval(icTestState.timer);
      icFinishTest();
    }
  }, 1000);
}
function icUpdateTestTimer() {
  const m = Math.floor(icTestState.timeLeft / 60);
  const s = icTestState.timeLeft % 60;
  const t = document.getElementById("testTimer");
  if (t) t.textContent = `${m}:${s.toString().padStart(2, '0')}`;
}
function icFinishTest() {
  if (icTestState.timer) clearInterval(icTestState.timer);
  const correct = indepTestQuestions.reduce(
    (acc, q, idx) => acc + (icTestState.answers[idx] === q.correct ? 1 : 0), 0
  );
  const score = Math.round((correct / indepTestQuestions.length) * 100);
  if (score >= 80) {
    icProgress = 100;
    icUpdateAllProgress();
    icShowCertificate(score);
  } else {
    alert(`Ваш результат: ${score}%. Для получения сертификата необходимо минимум 80%.`);
    icTestState.current = 0;
    icTestState.answers.fill(null);
    icTestState.timeLeft = 600;
    icRenderTestQuestion();
    icUpdateTestProgress();
    icStartTestTimer();
  }
}
function icShowCertificate(score) {
  document.getElementById("certificateDate").textContent = new Date().toLocaleDateString("ru-RU");
  document.getElementById("certificateScore").textContent = `${score}%`;
  icShowPage("certificate");
}
function icDownloadCertificate() {
  const t = `
СЕРТИФИКАТ ICONA 2.0
Специалист независимого контроля

Подтверждает успешное завершение программы обучения.
Дата: ${new Date().toLocaleDateString("ru-RU")}
Результат теста: ${document.getElementById("certificateScore").textContent}
`;
  const blob = new Blob([t], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "certificate_icona_indepcontrol.txt";
  a.click();
  URL.revokeObjectURL(url);
  alert("Сертификат успешно загружен!");
}

// --- Аутентификация для шапки ---
function icUpdateAuthHeader() {
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
window.addEventListener('focus', icUpdateAuthHeader);
document.addEventListener('DOMContentLoaded', icUpdateAuthHeader);
document.getElementById('nav-user')?.addEventListener('click', function() {
  window.location.href = 'profile.html';
});
