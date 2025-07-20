let adminModuleData = {
  title: "Администратор ПО",
  totalSections: 5,
  currentSection: 1,
  progress: 0,
  keyPoints: [
    "Развёртывание и сопровождение корпоративных систем",
    "Автоматизация и контроль обновлений программного обеспечения",
    "Управление проектами и портфелем СТК",
    "Диагностика, безопасность и резервное копирование",
    "Управление пользователями и правами доступа"
  ],
  sections: [
    {
      id: 1,
      title: "Роль и полномочия администратора ПО",
      status: "current",
      type: "theory",
      duration: "12 мин",
      icon: "🛠️",
      description: "Ключевые функции, задачи и ответственность.",
      content: `
        <div>
          <h4>Кто такой администратор ПО?</h4>
          <p>Это специалист, отвечающий за стабильную работу программных продуктов и инфраструктуры, а также за применение новых СТК, управление несколькими проектами и обеспечение полной безопасности ИТ-среды.</p>
        </div>
      `
    },
    {
      id: 2,
      title: "Создание и управление СТК",
      status: "locked",
      type: "theory",
      duration: "10 мин",
      icon: "📝",
      description: "Принципы работы со специфическими технологическими картами — от добавления до оптимизации.",
      content: `
        <div>
          <h4>Работа со СТК</h4>
          <ul>
            <li>Создание типовых карт с комплексами работ (например, бетонирование перекрытий: опалубка, армирование, бетонирование)</li>
            <li>Добавление/удаление шагов в СТК</li>
            <li>Использование шаблонов и автоматизация повторяющихся операций</li>
          </ul>
        </div>
      `
    },
    {
      id: 3,
      title: "Управление проектами и замечаниями",
      status: "locked",
      type: "theory",
      duration: "10 мин",
      icon: "📁",
      description: "Создание, редактирование и удаление проектов. Управление замечаниями по качеству.",
      content: `
        <div>
          <h4>Портфель проектов администратора</h4>
          <ul>
            <li>Добавление/удаление проектов</li>
            <li>Редактирование проектных данных</li>
            <li>Работа с замечаниями: добавление, удаление, ведение истории</li>
          </ul>
        </div>
      `
    },
    {
      id: 4,
      title: "Безопасность и восстановление",
      status: "locked",
      type: "theory",
      duration: "7 мин",
      icon: "🔒",
      description: "Резервное копирование, контроль уязвимостей, откат и безопасность.",
      content: `
        <div>
          <h4>Базовые меры ИТ-безопасности:</h4>
          <ul>
            <li>Мониторинг серверов и приложений</li>
            <li>Резервное копирование и контроль восстановлений</li>
            <li>Управление обновлениями ПО — автоматизация процессов</li>
          </ul>
        </div>
      `
    },
    {
      id: 5,
      title: "Итоговый тест",
      status: "locked",
      type: "test",
      duration: "6 мин",
      icon: "🧪",
      description: "Проверьте свои знания по модулям «Администратор ПО».",
      content: `
        <div>
          <h4>Итоговый тест</h4>
          <p>Ответьте на вопросы. Сертификат выдаётся при результате от 80%.</p>
          <button class="btn btn--primary btn--lg" onclick="startFinalTestAdmin()">Начать тестирование</button>
        </div>
      `
    }
  ]
};

let adminTestQuestions = [
  {
    question: "Какова основная задача администратора ПО?",
    options: [
      "Разработка архитектуры БД",
      "Обеспечение бесперебойной работы систем и приложений",
      "Проведение маркетинговых исследований",
      "Управление закупками"
    ],
    correct: 1
  },
  {
    question: "Что включают типовые СТК (специфические технологические карты)?",
    options: [
      "Только инструкцию по технике безопасности",
      "Комплекс СМР и последовательность операций",
      "Список финансовых расходов",
      "Таблицу кадрового состава"
    ],
    correct: 1
  },
  {
    question: "Что обязан сделать администратор при критической уязвимости?",
    options: [
      "Немедленно установить обновление",
      "Игнорировать проблему",
      "Сообщить только пользователям",
      "Отключить сервер"
    ],
    correct: 0
  },
  {
    question: "Что позволяет «портфель проектов»?",
    options: [
      "Следить за курсами валют",
      "Вести учет проектов, их статусов и замечаний",
      "Обрабатывать закупочные заявки",
      "Анализировать рынок труда"
    ],
    correct: 1
  },
  {
    question: "Какой вид резервного копирования включает только изменения с последнего копирования?",
    options: [
      "Инкрементное",
      "Полное",
      "Дифференциальное",
      "Локальное"
    ],
    correct: 0
  }
];

let adminCurrentSectionIndex = 0;
let adminCompletedSections = new Set();
let adminProgress = 0;
let adminTestState = {
  current: 0,
  answers: Array(adminTestQuestions.length).fill(null),
  timer: null,
  timeLeft: 600
};
let adminPages = {};

document.addEventListener("DOMContentLoaded", function() {
  adminPages = {
    overview: document.getElementById("moduleOverviewPage"),
    learning: document.getElementById("learningPage"),
    test: document.getElementById("testPage"),
    certificate: document.getElementById("certificatePage")
  };
  adminInitializeApp();
  adminAttachEventListeners();
  adminUpdateAuthHeader();
});

function adminInitializeApp() {
  adminProgress = adminModuleData.progress;
  adminCurrentSectionIndex = adminModuleData.currentSection - 1;
  adminModuleData.sections.forEach((section, idx) => {
    if (section.status === "completed") adminCompletedSections.add(idx);
  });
  adminUpdateOverviewProgress();
  adminRenderKeyPoints();
}
function adminAttachEventListeners() {
  const startBtn = document.getElementById("startLearningBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const testPrevBtn = document.getElementById("testPrevBtn");
  const testNextBtn = document.getElementById("testNextBtn");
  const finishTestBtn = document.getElementById("finishTestBtn");
  const downloadCertBtn = document.getElementById("downloadCertBtn");
  const backToModulesBtn = document.getElementById("backToModulesBtn");

  if (startBtn) startBtn.addEventListener("click", adminStartLearning);
  if (prevBtn) prevBtn.addEventListener("click", () => adminNavigateSection(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => adminNavigateSection(1));
  if (testPrevBtn) testPrevBtn.addEventListener("click", () => adminNavigateTest(-1));
  if (testNextBtn) testNextBtn.addEventListener("click", () => adminNavigateTest(1));
  if (finishTestBtn) finishTestBtn.addEventListener("click", adminFinishTest);
  if (downloadCertBtn) downloadCertBtn.addEventListener("click", adminDownloadCertificate);
  if (backToModulesBtn) backToModulesBtn.addEventListener("click", () => adminShowPage("overview"));
}

function adminShowPage(page) {
  Object.values(adminPages).forEach(pg => { if (pg) pg.classList.remove("active"); });
  if (adminPages[page]) adminPages[page].classList.add("active");
}
function adminStartLearning() {
  adminShowPage("learning");
  adminRenderCurrentSection();
  adminRenderSidebar();
  adminUpdateAllProgress();
}
function adminNavigateSection(direction) {
  const newIndex = adminCurrentSectionIndex + direction;
  if (newIndex < 0 || newIndex >= adminModuleData.sections.length) return;
  if (direction > 0 && !adminCompletedSections.has(adminCurrentSectionIndex)) {
    adminCompletedSections.add(adminCurrentSectionIndex);
    adminUpdateLearningProgress();
  }
  if (newIndex > adminCurrentSectionIndex && !adminCompletedSections.has(adminCurrentSectionIndex)) return;
  adminCurrentSectionIndex = newIndex;
  adminRenderCurrentSection();
  adminRenderSidebar();
  adminUpdateAllProgress();
}
function adminRenderCurrentSection() {
  const section = adminModuleData.sections[adminCurrentSectionIndex];
  document.getElementById("sectionTitle").textContent = `Раздел ${section.id}: ${section.title}`;
  document.getElementById("sectionDescription").textContent = section.description;
  document.getElementById("learningBody").innerHTML = section.content;
  adminUpdateNavigationButtons();
}
function adminRenderSidebar() {
  const c = document.getElementById("sidebarNavItems");
  if (!c) return;
  c.innerHTML = adminModuleData.sections.map((s, idx) => {
    let status = "";
    if (idx === adminCurrentSectionIndex) status = "active";
    else if (adminCompletedSections.has(idx)) status = "completed";
    else if (idx > adminCurrentSectionIndex) status = "locked";
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
      if (idx <= adminCurrentSectionIndex || adminCompletedSections.has(idx - 1)) {
        adminCurrentSectionIndex = idx;
        adminRenderCurrentSection();
        adminRenderSidebar();
        adminUpdateAllProgress();
      } else {
        alert("Завершите предыдущие разделы для доступа");
      }
    });
  });
}
function adminRenderKeyPoints() {
  const c = document.getElementById("keyPointsList");
  if (!c) return;
  c.innerHTML = adminModuleData.keyPoints.map(p => `<li>${p}</li>`).join('');
}
function adminUpdateNavigationButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn) prevBtn.style.visibility = adminCurrentSectionIndex === 0 ? "hidden" : "visible";
  if (nextBtn) {
    nextBtn.textContent = adminCurrentSectionIndex === adminModuleData.sections.length - 1
      ? "К финальному тесту →" : "Следующий раздел →";
  }
}
function adminUpdateAllProgress() {
  adminUpdateOverviewProgress();
  adminUpdateLearningProgress();
}
function adminUpdateOverviewProgress() {
  const progress = Math.round((adminCompletedSections.size / adminModuleData.sections.length) * 100);
  adminProgress = progress;
  const pPercent = document.getElementById("progressPercent");
  const pFill = document.getElementById("progressFill");
  if (pPercent) pPercent.textContent = `${progress}%`;
  if (pFill) pFill.style.width = `${progress}%`;
}
function adminUpdateLearningProgress() {
  const fill = document.getElementById("headerProgressFill");
  const text = document.getElementById("headerProgressText");
  if (fill) fill.style.width = `${adminProgress}%`;
  if (text) text.textContent = `${adminProgress}% завершено`;
}
function completeExerciseAdmin(idx) {
  alert(`Попрактика по роли администратора выполнена!`);
  adminCompletedSections.add(adminCurrentSectionIndex);
  adminUpdateLearningProgress();
}
// --- Тест и сертификат ---
function startFinalTestAdmin() { adminStartTest(); }
function adminStartTest() {
  adminCompletedSections.add(adminCurrentSectionIndex);
  adminUpdateAllProgress();
  adminShowPage("test");
  adminTestState.current = 0;
  adminTestState.answers.fill(null);
  adminTestState.timeLeft = 600;
  adminRenderTestQuestion();
  adminUpdateTestProgress();
  adminStartTestTimer();
}
function adminRenderTestQuestion() {
  const q = adminTestQuestions[adminTestState.current];
  const c = document.getElementById("testContent");
  if (!c) return;
  c.innerHTML = `
    <div class="test-question">
      <h3>Вопрос ${adminTestState.current + 1}</h3>
      <p>${q.question}</p>
      <div class="test-answers">
        ${q.options.map((o, i) => `
          <label class="test-answer ${adminTestState.answers[adminTestState.current] === i ? 'selected' : ''}">
            <input type="radio" name="adminTestAnswer" value="${i}" ${adminTestState.answers[adminTestState.current] === i ? 'checked' : ''}>
            <span class="test-answer-text">${o}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `;
  c.querySelectorAll('input[name="adminTestAnswer"]').forEach(radio => {
    radio.addEventListener('change', function(e) {
      adminTestState.answers[adminTestState.current] = parseInt(e.target.value);
      adminRenderTestQuestion();
    });
  });
  adminUpdateTestNavigation();
}
function adminUpdateTestNavigation() {
  const prevBtn = document.getElementById("testPrevBtn");
  const nextBtn = document.getElementById("testNextBtn");
  const finishBtn = document.getElementById("finishTestBtn");
  if (prevBtn) prevBtn.style.visibility = adminTestState.current === 0 ? "hidden" : "visible";
  const isLast = adminTestState.current === adminTestQuestions.length - 1;
  if (nextBtn) nextBtn.classList.toggle("hidden", isLast);
  if (finishBtn) finishBtn.classList.toggle("hidden", !isLast);
}
function adminNavigateTest(dir) {
  const newIdx = adminTestState.current + dir;
  if (newIdx >= 0 && newIdx < adminTestQuestions.length) {
    adminTestState.current = newIdx;
    adminRenderTestQuestion();
    adminUpdateTestProgress();
  }
}
function adminUpdateTestProgress() {
  const p = Math.round(((adminTestState.current + 1) / adminTestQuestions.length) * 100);
  const fill = document.getElementById("testProgressFill");
  const text = document.getElementById("testProgressText");
  if (fill) fill.style.width = `${p}%`;
  if (text) text.textContent = `Вопрос ${adminTestState.current + 1} из ${adminTestQuestions.length}`;
}
function adminStartTestTimer() {
  adminUpdateTestTimer();
  if (adminTestState.timer) clearInterval(adminTestState.timer);
  adminTestState.timer = setInterval(() => {
    adminTestState.timeLeft--;
    adminUpdateTestTimer();
    if (adminTestState.timeLeft <= 0) {
      clearInterval(adminTestState.timer);
      adminFinishTest();
    }
  }, 1000);
}
function adminUpdateTestTimer() {
  const m = Math.floor(adminTestState.timeLeft / 60);
  const s = adminTestState.timeLeft % 60;
  const t = document.getElementById("testTimer");
  if (t) t.textContent = `${m}:${s.toString().padStart(2, '0')}`;
}
function adminFinishTest() {
  if (adminTestState.timer) clearInterval(adminTestState.timer);
  const correct = adminTestQuestions.reduce(
    (acc, q, idx) => acc + (adminTestState.answers[idx] === q.correct ? 1 : 0), 0
  );
  const score = Math.round((correct / adminTestQuestions.length) * 100);
  if (score >= 80) {
    adminProgress = 100;
    adminUpdateAllProgress();
    adminShowCertificate(score);
  } else {
    alert(`Ваш результат: ${score}%. Для получения сертификата необходимо минимум 80%.`);
    adminTestState.current = 0;
    adminTestState.answers.fill(null);
    adminTestState.timeLeft = 600;
    adminRenderTestQuestion();
    adminUpdateTestProgress();
    adminStartTestTimer();
  }
}
function adminShowCertificate(score) {
  document.getElementById("certificateDate").textContent = new Date().toLocaleDateString("ru-RU");
  document.getElementById("certificateScore").textContent = `${score}%`;
  adminShowPage("certificate");
}
function adminDownloadCertificate() {
  const t = `
СЕРТИФИКАТ ICONA 2.0
Администратор ПО

Подтверждает успешное завершение программы.
Дата: ${new Date().toLocaleDateString("ru-RU")}
Результат теста: ${document.getElementById("certificateScore").textContent}
`;
  const blob = new Blob([t], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "certificate_icona_admin.txt";
  a.click();
  URL.revokeObjectURL(url);
  alert("Сертификат успешно загружен!");
}

// --- Аутентификация для шапки ---
function adminUpdateAuthHeader() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === '1' || localStorage.getItem('isLoggedIn') === 'true';
  const navUser = document.getElementById('nav-user');
  const loginBtn = document.getElementById('login-btn');
  const navUserName = document.getElementById('nav-user-name');
  const navUserPhoto = document.getElementById('nav-user-photo');
  let userData = {};
  try { userData = JSON.parse(localStorage.getItem('userData') || '{}'); } catch {}
  let name = (userData.firstname || '') + (userData.lastname ? ' ' + userData.lastname : '') || "Администратор";
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
window.addEventListener('focus', adminUpdateAuthHeader);
document.getElementById('nav-user')?.addEventListener('click', function() {
  window.location.href = 'profile.html';
});
