// ICONA 2.0 Learning Platform - Construction Engineer Module
// Application data from JSON. Changed to 'let' to allow loading from localStorage.
let courseData = {
    title: "Инженер по строительству",
    totalSections: 6,
    currentSection: 2,
    progress: 33,
    timeSpent: "45 минут",
    sections: [
        {
            id: 1,
            title: "Введение в профессию",
            status: "completed",
            type: "theory",
            duration: "15 мин",
            icon: "📖",
            description: "Обзор профессии инженера по строительству, ключевые концепции и принципы работы.",
            content: `
                <div class="content-section">
                    <h4>Ключевые аспекты профессии инженера по строительству</h4>
                    <p>Профессия инженера по строительству — одна из самых ответственных и востребованных в индустрии. Этот специалист является центральной фигурой на всех этапах проекта, от замысла до сдачи объекта, гарантируя его качество, безопасность и соответствие нормативам.</p>
                    
                    <div class="key-points mt-24">
                        <h5>Основные должностные обязанности:</h5>
                        <ul>
                            <li>Стратегическое планирование и координация всех этапов строительных работ.</li>
                            <li>Многоуровневый контроль качества выполняемых работ и применяемых материалов.</li>
                            <li>Разработка и внедрение мер по обеспечению техники безопасности на объекте.</li>
                            <li>Эффективное управление строительной командой и подрядчиками.</li>
                            <li>Ведение и архивация всей необходимой технической и отчетной документации.</li>
                        </ul>
                    </div>
                    
                    <h5 class="mt-24">Современные технологии в работе</h5>
                    <p class="mt-16">Современные инженеры активно применяют передовые технологии, такие как BIM (Building Information Modeling), для создания цифровых информационных моделей зданий. Этот подход позволяет оптимизировать ресурсы, прогнозировать затраты и минимизировать риски на протяжении всего жизненного цикла объекта.</p>
                    
                    <div class="success-message mt-16">
                        <strong>Ключевая ответственность:</strong> Инженер несет персональную ответственность за безопасность персонала и итоговое качество построенного объекта.
                    </div>
                </div>
            `
        },
        {
            id: 2,
            title: "Основные функции инженера",
            status: "current",
            type: "video",
            duration: "20 мин",
            icon: "🎥",
            description: "Детальное изучение основных функций и должностных обязанностей инженера в строительной отрасли.",
            content: `
                <div class="content-section">
                    <h4>Видеоурок: Основные функции инженера</h4>
                    <p>Этот видеоматериал посвящен детальному разбору ключевых функций и ежедневных задач, которые выполняет инженер на строительной площадке.</p>
                    
                    <div class="video-container">
                        <video id="videoPlayer" controls style="display: none; width: 100%; max-height: 400px;"></video>
                        <div id="videoPlaceholder" class="video-placeholder">
                            <div class="video-placeholder-icon">🎥</div>
                            <h4>Видео: Основные функции инженера</h4>
                            <p>Нажмите на кнопку ниже, чтобы загрузить и посмотреть видео.</p>
                            <input type="file" id="videoUpload" accept="video/*" style="display: none;" onchange="handleVideoUpload(event)">
                            <button class="play-button" onclick="document.getElementById('videoUpload').click()">📥 Загрузить видео</button>
                        </div>
                    </div>
                    
                    <div class="mt-24">
                        <h5>Ключевые моменты для запоминания:</h5>
                        <ul>
                            <li>Роль инженера в предпроектной подготовке и планировании.</li>
                            <li>Методы эффективной координации работы подрядных организаций.</li>
                            <li>Процедуры и чек-листы для осуществления контроля качества.</li>
                            <li>Примеры использования цифровых инструментов для управления проектом.</li>
                        </ul>
                    </div>
                    
                    <div class="mt-16">
                        <details>
                            <summary><strong>Текстовая расшифровка и конспект видео</strong></summary>
                            <p class="mt-8">Для вашего удобства доступна полная текстовая версия видеоматериала. Используйте ее для повторения ключевых моментов и закрепления знаний.</p>
                        </details>
                    </div>
                </div>
            `
        },
        {
            id: 3,
            title: "Проектная документация",
            status: "locked",
            type: "interactive",
            duration: "25 мин",
            icon: "📋",
            description: "Освоение практических навыков работы с проектной и технической документацией.",
            content: `
                <div class="content-section">
                    <h4>Интерактивный модуль: Проектная документация</h4>
                    <p>Этот раздел позволит вам на практике освоить структуру и состав проектной документации, а также научиться работать с основными ее видами.</p>
                    
                    <div class="interactive-demo">
                        <h5>📋 Интерактивный симулятор: Конструктор документов</h5>
                        <p>Изучите структуру проектной документации в интерактивном режиме и попробуйте самостоятельно составить техническое задание по предложенному кейсу.</p>
                        <button class="demo-button" onclick="launchInteractiveDemo()">Запустить симулятор</button>
                    </div>
                    
                    <div class="mt-24">
                        <h5>Основные разделы проектной документации:</h5>
                        <div class="practice-exercises">
                            <div class="exercise-card">
                                <h6>Раздел АР (Архитектурные решения)</h6>
                                <p>Подробные планы, фасады, разрезы и визуализации объекта.</p>
                                <button class="exercise-button" onclick="showDocumentExample('drawings')">Показать пример</button>
                            </div>
                            <div class="exercise-card">
                                <h6>Раздел КР (Конструктивные решения)</h6>
                                <p>Расчеты и чертежи несущих конструкций здания.</p>
                                <button class="exercise-button" onclick="showDocumentExample('estimates')">Показать пример</button>
                            </div>
                            <div class="exercise-card">
                                <h6>Сметная документация</h6>
                                <p>Расчет полной стоимости строительства, включая материалы и работы.</p>
                                <button class="exercise-button" onclick="showDocumentExample('specs')">Показать пример</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 4,
            title: "Технический надзор",
            status: "locked",
            type: "theory",
            duration: "18 мин",
            icon: "🔍",
            description: "Принципы и методы осуществления технического надзора и контроля качества строительных работ.",
            content: `
                <div class="content-section">
                    <h4>Основы технического надзора в строительстве</h4>
                    <p>Технический надзор — это комплекс экспертно-проверочных мероприятий, целью которых является обеспечение точного соблюдения проектных решений, сроков, бюджета, а также высоких стандартов качества строительных работ и материалов.</p>
                    
                    <div class="key-points mt-24">
                        <h5>Ключевые задачи технического надзора:</h5>
                        <ul>
                            <li>Контроль соответствия работ утвержденной проектно-сметной документации и нормативным актам (СНиП, ГОСТ).</li>
                            <li>Входной контроль качества строительных материалов, изделий и конструкций.</li>
                            <li>Надзор за соблюдением технологий и последовательности выполнения строительных процессов.</li>
                            <li>Освидетельствование и приемка скрытых работ и ответственных конструкций.</li>
                            <li>Предотвращение, выявление и контроль устранения дефектов и нарушений.</li>
                        </ul>
                    </div>
                    
                    <h5 class="mt-24">Инструменты и документация</h5>
                    <p class="mt-16">Инженер по технадзору использует как измерительные инструменты (нивелиры, теодолиты, дефектоскопы), так и методы лабораторного анализа. Основой его работы является ведение общего и специальных журналов работ, а также составление актов освидетельствования.</p>
                    
                    <div class="info-message mt-16">
                        <strong>Важно:</strong> Эффективный технический надзор является гарантией долговечности, безопасности и экономической эффективности строительного проекта.
                    </div>
                </div>
            `
        },
        {
            id: 5,
            title: "Практические задания",
            status: "locked",
            type: "practice",
            duration: "30 мин",
            icon: "🛠️",
            description: "Применение теоретических знаний на практике через решение реальных кейсов и задач.",
            content: `
                <div class="content-section">
                    <h4>Практикум: Практические задания</h4>
                    <p>Закрепите полученные знания, выполнив несколько практических упражнений, основанных на реальных инженерных задачах.</p>
                    
                    <div class="practice-exercises">
                        <div class="exercise-card">
                            <h5>Задание 1: Анализ проектных чертежей</h5>
                            <p>На основе предоставленного чертежа определите последовательность возведения конструктивных элементов здания и выявите возможные коллизии.</p>
                            <button class="exercise-button" onclick="completeExercise(1)">Приступить к заданию</button>
                        </div>
                        <div class="exercise-card">
                            <h5>Задание 2: Расчет объема материалов</h5>
                            <p>Рассчитайте необходимое количество бетона (м³) для заливки монолитного фундамента размером 10x12 м, высотой 0.5 м.</p>
                            <button class="exercise-button" onclick="completeExercise(2)">Приступить к заданию</button>
                        </div>
                        <div class="exercise-card">
                            <h5>Задание 3: Оценка строительных рисков</h5>
                            <p>Проанализируйте предложенный план производства работ и определите три ключевых риска, связанных с техникой безопасности.</p>
                            <button class="exercise-button" onclick="completeExercise(3)">Приступить к заданию</button>
                        </div>
                    </div>
                    
                    <div class="success-message mt-24">
                        <strong>Рекомендация:</strong> Перед началом работы над заданиями, рекомендуем повторить материалы предыдущих теоретических и видео-разделов.
                    </div>
                </div>
            `
        },
        {
            id: 6,
            title: "Итоговый тест",
            status: "locked",
            type: "test",
            duration: "15 мин",
            icon: "📝",
            description: "Комплексная проверка знаний, полученных в ходе изучения всего учебного модуля.",
            content: `
                <div class="content-section">
                    <h4>Итоговый тест</h4>
                    <p>Пришло время проверить и систематизировать ваши знания. Итоговый тест охватывает все ключевые темы, изученные в данном модуле.</p>
                    
                    <div class="test-info">
                        <h5>Информация о тестировании:</h5>
                        <ul>
                            <li><strong>Формат:</strong> 3 вопроса с выбором одного правильного ответа.</li>
                            <li><strong>Время на выполнение:</strong> 10 минут.</li>
                            <li><strong>Проходной балл для сертификации:</strong> 80% правильных ответов.</li>
                            <li><strong>Количество попыток:</strong> не ограничено.</li>
                        </ul>
                    </div>
                    
                    <div class="mt-24">
                        <button class="btn btn--primary btn--lg" onclick="startFinalTest()">Начать итоговое тестирование</button>
                    </div>
                </div>
            `
        }
    ],
    keyPoints: [
        "Инженер отвечает за техническое планирование проектов",
        "Контроль качества строительных работ",
        "Составление проектной документации",
        "Соблюдение норм безопасности"
    ],
    currentContent: {
        title: "Основные функции инженера по строительству",
        type: "video",
        description: "В этом разделе мы изучим ключевые обязанности и функции инженера по строительству",
        videoUrl: "demo-video.mp4",
        duration: "12:34",
        transcript: "Доступна текстовая расшифровка видео..."
    }
};

// Test questions
let testQuestions = [
    {
        question: "Какова главная обязанность инженера по строительству?",
        options: [
            "Проектирование зданий",
            "Контроль строительных работ",
            "Продажа недвижимости",
            "Ремонт оборудования"
        ],
        correct: 1
    },
    {
        question: "Что включает в себя технический надзор?",
        options: [
            "Только проверка документов",
            "Контроль качества и безопасности",
            "Финансовое планирование",
            "Маркетинг проекта"
        ],
        correct: 1
    },
    {
        question: "Какие документы составляет инженер по строительству?",
        options: [
            "Только рабочие чертежи",
            "Проектную документацию и отчеты",
            "Финансовые отчеты",
            "Маркетинговые материалы"
        ],
        correct: 1
    }
];

// Application state
let currentSectionIndex = 0;
let completedSections = new Set();
let learningProgress = 0;
let timeSpentMinutes = 0;
let startTime = null;

// New global state for edit mode
let isEditMode = false;

const testState = {
    current: 0,
    answers: Array(testQuestions.length).fill(null),
    timer: null,
    timeLeft: 600 // 10 minutes
};

// DOM elements - will be initialized after DOM is ready
let pages = {};

// Initialize application
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded - Initializing ICONA 2.0 Learning Platform");
    
    // Initialize pages object after DOM is ready
    pages = {
        overview: document.getElementById("moduleOverviewPage"),
        learning: document.getElementById("learningPage"),
        test: document.getElementById("testPage"),
        certificate: document.getElementById("certificatePage")
    };
    
    console.log("Pages found:", {
        overview: !!pages.overview,
        learning: !!pages.learning,
        test: !!pages.test,
        certificate: !!pages.certificate
    });
    
    // Initialize the application
    initializeApp();
    attachEventListeners();
    
    addEditModeStyles(); // Add styles for edit mode
    console.log("Application initialized successfully");
});

document.addEventListener('DOMContentLoaded', function() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === '1' || localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    let err = document.getElementById('auth-error-msg');
    if (!err) {
      err = document.createElement('div');
      err.id = 'auth-error-msg';
      err.textContent = 'Войдите или зарегистрируйтесь';
      err.style.position = 'fixed';
      err.style.top = '24px';
      err.style.left = '50%';
      err.style.transform = 'translateX(-50%)';
      err.style.background = '#fff';
      err.style.color = '#d32f2f';
      err.style.border = '2px solid #d32f2f';
      err.style.borderRadius = '8px';
      err.style.padding = '1em 2em';
      err.style.fontWeight = '600';
      err.style.fontSize = '1.1em';
      err.style.zIndex = '9999';
      document.body.appendChild(err);
    }
    setTimeout(function() { window.location.href = 'index.html'; }, 1800);
  }
});

function initializeApp() {
    console.log("Initializing app...");
    
    loadCourseData(); // Load data from localStorage if available
    
    // Initialize progress based on course data
    learningProgress = courseData.progress;
    currentSectionIndex = courseData.currentSection - 1; // Convert to 0-based index
    
    // Mark completed sections
    courseData.sections.forEach((section, index) => {
        if (section.status === "completed") {
            completedSections.add(index);
        }
    });
    
    updateOverviewProgress();
    renderKeyPoints();
    
    console.log("Initial state:", {
        currentSectionIndex,
        completedSections: Array.from(completedSections),
        learningProgress
    });
}

function attachEventListeners() {
    console.log("Attaching event listeners...");
    
    // Get all elements
    const startBtn = document.getElementById("startLearningBtn");
    const backBtn = document.getElementById("backBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const testPrevBtn = document.getElementById("testPrevBtn");
    const testNextBtn = document.getElementById("testNextBtn");
    const finishTestBtn = document.getElementById("finishTestBtn");
    const downloadCertBtn = document.getElementById("downloadCertBtn");
    const backToModulesBtn = document.getElementById("backToModulesBtn");
    const bookmarkBtn = document.getElementById("bookmarkBtn");
    const shareBtn = document.getElementById("shareBtn");

    // Attach start button event listener
    if (startBtn) {
        startBtn.addEventListener("click", function(e) {
            console.log("Start learning button clicked");
            e.preventDefault();
            e.stopPropagation();
            startLearning();
        });
    } else {
        console.error("Start button not found! ID: startLearningBtn");
    }

    // Add Edit Mode button to the correct location within the learning page
    const learningHeader = document.querySelector("#learningPage .learning-header");
    if (learningHeader) {
        const editModeBtn = document.createElement("button");
        editModeBtn.id = "editModeBtn";
        editModeBtn.textContent = "Редактировать";
        editModeBtn.className = "btn btn--secondary btn--sm";
        editModeBtn.style.alignSelf = "flex-start"; // Align button nicely
        editModeBtn.addEventListener("click", toggleEditMode);
        learningHeader.appendChild(editModeBtn);
    } else {
        console.error("Learning header not found, could not add Edit Mode button.");
    }
    
    // Attach other event listeners
    if (backBtn) {
        backBtn.addEventListener("click", function(e) {
            console.log("Back button clicked");
            e.preventDefault();
            handleBackNavigation();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener("click", function(e) {
            console.log("Previous button clicked");
            e.preventDefault();
            navigateSection(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener("click", function(e) {
            console.log("Next button clicked");
            e.preventDefault();
            navigateSection(1);
        });
    }
    
    if (testPrevBtn) {
        testPrevBtn.addEventListener("click", function(e) {
            e.preventDefault();
            navigateTestQuestion(-1);
        });
    }
    
    if (testNextBtn) {
        testNextBtn.addEventListener("click", function(e) {
            e.preventDefault();
            navigateTestQuestion(1);
        });
    }
    
    if (finishTestBtn) {
        finishTestBtn.addEventListener("click", function(e) {
            e.preventDefault();
            finishTest();
        });
    }
    
    if (downloadCertBtn) {
        downloadCertBtn.addEventListener("click", function(e) {
            e.preventDefault();
            downloadCertificate();
        });
    }
    
    if (backToModulesBtn) {
        backToModulesBtn.addEventListener("click", function(e) {
            e.preventDefault();
            showPage("overview");
        });
    }
    
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener("click", function(e) {
            e.preventDefault();
            handleBookmark();
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener("click", function(e) {
            e.preventDefault();
            handleShare();
        });
    }
    
    console.log("All event listeners attached successfully");
}

// Page navigation
function showPage(pageName) {
    console.log("Showing page:", pageName);
    
    try {
        // Hide all pages
        Object.values(pages).forEach(page => {
            if (page) {
                page.classList.remove("active");
            }
        });
        
        // Show selected page
        if (pages[pageName]) {
            pages[pageName].classList.add("active");
            console.log("Page switched to:", pageName);
        } else {
            console.error("Page not found:", pageName);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error("Error switching pages:", error);
        return false;
    }
}

function handleBackNavigation() {
    const currentPage = getCurrentPage();
    console.log("Handling back navigation from:", currentPage);
    
    if (currentPage === "learning") {
        showPage("overview");
    } else if (currentPage === "test") {
        showPage("learning");
    } else if (currentPage === "certificate") {
        showPage("overview");
    }
}

function getCurrentPage() {
    return Object.entries(pages).find(([key, page]) => 
        page && page.classList.contains("active")
    )?.[0] || "overview";
}

// Learning functionality
function startLearning() {
    console.log("=== Starting learning session ===");
    
    try {
        // Set start time
        startTime = Date.now();
        
        // Show learning page
        const success = showPage("learning");
        if (!success) {
            throw new Error("Failed to show learning page");
        }
        
        // Initialize learning content
        renderCurrentSection();
        renderSidebarNavigation();
        updateAllProgress();
        startTimeTracking();
        
        console.log("Learning session started successfully");
        
    } catch (error) {
        console.error("Error starting learning:", error);
        alert("Произошла ошибка при запуске обучения. Попробуйте перезагрузить страницу.");
    }
}

function navigateSection(direction) {
    console.log("Navigating section:", direction);
    
    const newIndex = currentSectionIndex + direction;
    
    // Check bounds
    if (newIndex < 0 || newIndex >= courseData.sections.length) {
        console.log("Navigation out of bounds");
        return;
    }
    
    // Mark current section as completed when moving forward
    if (direction > 0) {
        completedSections.add(currentSectionIndex);
        updateLearningProgress();
    }
    
    // Check if trying to access locked section
    if (newIndex > currentSectionIndex && !completedSections.has(currentSectionIndex)) {
        alert("Пожалуйста, завершите текущий раздел перед переходом к следующему");
    return;
  }

    currentSectionIndex = newIndex;
    renderCurrentSection();
    renderSidebarNavigation();
    updateAllProgress();
    
    console.log("Section navigation completed:", currentSectionIndex);
}

function renderCurrentSection() {
    const section = courseData.sections[currentSectionIndex];
    console.log("Rendering section:", section.title);
    
    const sectionTitle = document.getElementById("sectionTitle");
    const sectionDescription = document.getElementById("sectionDescription");
    const learningBody = document.getElementById("learningBody");
    
    if (sectionTitle) {
        sectionTitle.textContent = `Раздел ${section.id}: ${section.title}`;
        sectionTitle.contentEditable = isEditMode;
    }
    
    if (sectionDescription) {
        sectionDescription.textContent = section.description;
        sectionDescription.contentEditable = isEditMode;
    }
    
    if (learningBody) {
        learningBody.innerHTML = section.content;
        learningBody.contentEditable = isEditMode;
    }
    
    updateNavigationButtons();
}

function renderSidebarNavigation() {
    const container = document.getElementById("sidebarNavItems");
    if (!container) return;
    
    container.innerHTML = courseData.sections.map((section, index) => {
        let statusClass = "";
        if (index === currentSectionIndex) {
            statusClass = "active";
        } else if (completedSections.has(index)) {
            statusClass = "completed";
        } else if (index > currentSectionIndex) {
            statusClass = "locked";
        }
        
        return `
            <div class="sidebar-nav-item ${statusClass}" data-section="${index}">
                <span class="sidebar-nav-icon">${section.icon}</span>
                <div>
                    <div class="sidebar-nav-title" contenteditable="${isEditMode}">${section.title}</div>
                    <small>${section.duration}</small>
        </div>
      </div>
    `;
    }).join("");
    
    // Add click handlers
    container.querySelectorAll(".sidebar-nav-item").forEach(item => {
        item.addEventListener("click", function(e) {
            const sectionIndex = parseInt(this.dataset.section);
            console.log("Sidebar item clicked:", sectionIndex);
            
            if (isEditMode) return; // Disable navigation in edit mode
            
            if (sectionIndex <= currentSectionIndex || completedSections.has(sectionIndex - 1)) {
                currentSectionIndex = sectionIndex;
                renderCurrentSection();
                renderSidebarNavigation();
                updateAllProgress();
            } else {
                alert("Завершите предыдущие разделы для доступа к этому разделу");
            }
      });
    });
}

function renderKeyPoints() {
    const keyPointsList = document.getElementById("keyPointsList");
    if (!keyPointsList) return;
    
    keyPointsList.innerHTML = courseData.keyPoints.map(point => 
        `<li>${point}</li>`
    ).join("");
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    
    if (prevBtn) {
        prevBtn.style.visibility = currentSectionIndex === 0 ? "hidden" : "visible";
    }
    
    if (nextBtn) {
        const isLastSection = currentSectionIndex === courseData.sections.length - 1;
        nextBtn.textContent = isLastSection ? "К финальному тесту →" : "Следующий раздел →";
    }
}

function updateAllProgress() {
    updateOverviewProgress();
    updateLearningProgress();
    updateCircularProgress();
}

function updateOverviewProgress() {
    const progressPercent = document.getElementById("progressPercent");
    const progressFill = document.getElementById("progressFill");
    
    if (progressPercent) {
        progressPercent.textContent = `${learningProgress}%`;
    }
    if (progressFill) {
        progressFill.style.width = `${learningProgress}%`;
    }
}

function updateLearningProgress() {
    const completed = completedSections.size;
    const total = courseData.sections.length;
    learningProgress = Math.round((completed / total) * 100);
    
    // Update header progress
    const headerProgressFill = document.getElementById("headerProgressFill");
    const headerProgressText = document.getElementById("headerProgressText");
    
    if (headerProgressFill) {
        headerProgressFill.style.width = `${learningProgress}%`;
    }
    if (headerProgressText) {
        headerProgressText.textContent = `${learningProgress}% завершено`;
    }
}

function updateCircularProgress() {
    const circularProgress = document.getElementById("circularProgress");
    const circularProgressValue = document.getElementById("circularProgressValue");
    
    if (circularProgress && circularProgressValue) {
        const angle = (learningProgress / 100) * 360;
        circularProgress.style.background = `conic-gradient(#dc3545 ${angle}deg, var(--color-secondary) ${angle}deg)`;
        circularProgressValue.textContent = `${learningProgress}%`;
    }
}

function startTimeTracking() {
    setInterval(() => {
        if (startTime) {
            timeSpentMinutes = Math.floor((Date.now() - startTime) / 60000);
            const timeSpentText = document.getElementById("timeSpentText");
            if (timeSpentText) {
                timeSpentText.textContent = `${timeSpentMinutes} минут`;
            }
        }
    }, 60000); // Update every minute
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
        const videoPlayer = document.getElementById('videoPlayer');
        const videoPlaceholder = document.getElementById('videoPlaceholder');
        
        if (videoPlayer && videoPlaceholder) {
            const videoUrl = URL.createObjectURL(file);
            videoPlayer.src = videoUrl;
            videoPlayer.style.display = 'block';
            videoPlaceholder.style.display = 'none';
            videoPlayer.play();
            
            videoPlayer.onended = () => {
                URL.revokeObjectURL(videoUrl);
            };
        }
    } else if (file) {
        alert('Пожалуйста, выберите видеофайл.');
    }
}

// Interactive functions
function launchInteractiveDemo() {
    alert("Запущена интерактивная демонстрация! В полной версии здесь будет интерактивный конструктор документов.");
}

function showDocumentExample(type) {
    const examples = {
        drawings: "Просмотр примера рабочих чертежей",
        estimates: "Просмотр примера сметной документации",
        specs: "Просмотр примера технических условий"
    };
    alert(examples[type] || "Просмотр примера документации");
}

function completeExercise(exerciseNumber) {
    alert(`Задание ${exerciseNumber} выполнено успешно! Ваш ответ засчитан.`);
}

function startSectionTest() {
    alert("Переход к тесту по текущему разделу! В полной версии здесь будет специализированный тест.");
}

function startFinalTest() {
    startTest();
}

function handleBookmark() {
    alert("Раздел добавлен в закладки! В полной версии закладки будут сохраняться в профиле пользователя.");
}

function handleShare() {
    alert("Ссылка на раздел скопирована в буфер обмена! В полной версии будет полная функциональность шаринга.");
}

// Test functionality
function startTest() {
    console.log("Starting test");
    completedSections.add(currentSectionIndex);
    updateAllProgress();
    
    showPage("test");
    testState.current = 0;
    testState.answers.fill(null);
    testState.timeLeft = 600;
    
    renderTestQuestion();
    updateTestProgress();
    startTestTimer();
}

function renderTestQuestion() {
    const question = testQuestions[testState.current];
    const testContent = document.getElementById("testContent");
    
    if (!testContent) return;
    
    const options = question.options.map((option, index) => {
        const isSelected = testState.answers[testState.current] === index;
        return `
            <label class="test-answer ${isSelected ? 'selected' : ''}">
                <input type="radio" name="testAnswer" value="${index}" ${isSelected ? 'checked' : ''}>
                <span class="test-answer-text">${option}</span>
            </label>
        `;
    }).join("");
    
    testContent.innerHTML = `
        <div class="test-question">
            <h3>Вопрос ${testState.current + 1}</h3>
            <p>${question.question}</p>
            <div class="test-answers">${options}</div>
        </div>
    `;
    
    // Add event listeners
    testContent.querySelectorAll('input[name="testAnswer"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            testState.answers[testState.current] = parseInt(e.target.value);
            renderTestQuestion(); // Re-render to show selection
        });
    });
    
    updateTestNavigation();
}

function updateTestNavigation() {
    const testPrevBtn = document.getElementById("testPrevBtn");
    const testNextBtn = document.getElementById("testNextBtn");
    const finishTestBtn = document.getElementById("finishTestBtn");
    
    if (testPrevBtn) {
        testPrevBtn.style.visibility = testState.current === 0 ? "hidden" : "visible";
    }
    
    const isLastQuestion = testState.current === testQuestions.length - 1;
    
    if (testNextBtn) {
        testNextBtn.classList.toggle("hidden", isLastQuestion);
    }
    if (finishTestBtn) {
        finishTestBtn.classList.toggle("hidden", !isLastQuestion);
    }
}

function navigateTestQuestion(direction) {
    const newIndex = testState.current + direction;
    if (newIndex >= 0 && newIndex < testQuestions.length) {
        testState.current = newIndex;
        renderTestQuestion();
        updateTestProgress();
    }
}

function updateTestProgress() {
    const progress = Math.round(((testState.current + 1) / testQuestions.length) * 100);
    const testProgressFill = document.getElementById("testProgressFill");
    const testProgressText = document.getElementById("testProgressText");
    
    if (testProgressFill) {
        testProgressFill.style.width = `${progress}%`;
    }
    if (testProgressText) {
        testProgressText.textContent = `Вопрос ${testState.current + 1} из ${testQuestions.length}`;
    }
}

function startTestTimer() {
    updateTestTimer();
    testState.timer = setInterval(() => {
        testState.timeLeft--;
        updateTestTimer();
        
        if (testState.timeLeft <= 0) {
            clearInterval(testState.timer);
        finishTest();
      }
    }, 1000);
}

function updateTestTimer() {
    const minutes = Math.floor(testState.timeLeft / 60);
    const seconds = testState.timeLeft % 60;
    const testTimer = document.getElementById("testTimer");
    
    if (testTimer) {
        testTimer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  function finishTest() {
    console.log("Finishing test");
    clearInterval(testState.timer);
    
    const correctAnswers = testState.answers.reduce((count, answer, index) => {
        return answer === testQuestions[index].correct ? count + 1 : count;
    }, 0);
    
    const score = Math.round((correctAnswers / testQuestions.length) * 100);
    
    if (score >= 80) {
        learningProgress = 100;
        updateAllProgress();
        showCertificate(score);
    } else {
        alert(`Ваш результат: ${score}%. Необходимо набрать минимум 80%. Попробуйте еще раз!`);
        // Reset test
        testState.current = 0;
        testState.answers.fill(null);
        testState.timeLeft = 600;
        renderTestQuestion();
        updateTestProgress();
        startTestTimer();
    }
}

// Certificate functionality
function showCertificate(score) {
    console.log("Showing certificate");
    const certificateDate = document.getElementById("certificateDate");
    const certificateScore = document.getElementById("certificateScore");
    
    if (certificateDate) {
        certificateDate.textContent = new Date().toLocaleDateString("ru-RU");
    }
    if (certificateScore) {
        certificateScore.textContent = `${score}%`;
    }
    
    showPage("certificate");
}

function downloadCertificate() {
    const certificateText = `
СЕРТИФИКАТ ICONA 2.0
Система онлайн-обучения

Подтверждает, что специалист успешно завершил обучение по программе
"Инженер по строительству"

Дата выдачи: ${new Date().toLocaleDateString("ru-RU")}
Результат: ${document.getElementById("certificateScore").textContent}

Сертификат подтверждает освоение ключевых компетенций:
- Планирование строительных работ
- Контроль качества и безопасности
- Работа с проектной документацией
- Технический надзор
    `;
    
    const blob = new Blob([certificateText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "certificate_icona_construction_engineer.txt";
    link.click();
    URL.revokeObjectURL(url);
    
    alert("Сертификат успешно загружен!");
}

// --- New functions for Edit Mode and Data Persistence ---

function toggleEditMode() {
    isEditMode = !isEditMode;
    const editBtn = document.getElementById('editModeBtn');

    if (!isEditMode) { // Exiting edit mode
        console.log("Saving changes...");

        // 1. Save sidebar titles
        const sidebarTitles = document.querySelectorAll('.sidebar-nav-title');
        sidebarTitles.forEach((titleEl, index) => {
            if (courseData.sections[index]) {
                courseData.sections[index].title = titleEl.textContent.trim();
            }
        });

        // 2. Save currently open section's main content
        const currentSection = courseData.sections[currentSectionIndex];
        const sectionTitleEl = document.getElementById("sectionTitle");
        const sectionDescriptionEl = document.getElementById("sectionDescription");
        const learningBodyEl = document.getElementById("learningBody");

        if (sectionTitleEl) {
            // Title is in format "Раздел X: Title". We only want "Title".
            const titleText = sectionTitleEl.textContent.trim();
            currentSection.title = titleText.substring(titleText.indexOf(':') + 1).trim();
        }
        if (sectionDescriptionEl) {
            currentSection.description = sectionDescriptionEl.textContent.trim();
        }
        if (learningBodyEl) {
            currentSection.content = learningBodyEl.innerHTML;
        }

        saveCourseData();
        if (editBtn) {
            editBtn.textContent = 'Редактировать';
            editBtn.classList.remove('btn--danger');
        }
        document.body.classList.remove('edit-mode-active');
        alert('Изменения сохранены в локальном хранилище браузера!');

    } else { // Entering edit mode
        if (editBtn) {
            editBtn.textContent = 'Сохранить и выйти';
            editBtn.classList.add('btn--danger');
        }
        document.body.classList.add('edit-mode-active');
        alert('Режим редактирования включен. Вы можете изменять текст прямо на странице.');
    }

    // Re-render views to apply/remove contentEditable attributes
    renderCurrentSection();
    renderSidebarNavigation();
}

function saveCourseData() {
    try {
        const dataToSave = JSON.stringify(courseData);
        localStorage.setItem('iconaCourseData', dataToSave);
        console.log("Course data saved to localStorage.");
    } catch (error) {
        console.error("Failed to save course data to localStorage:", error);
    }
}

function loadCourseData() {
    try {
        const savedData = localStorage.getItem('iconaCourseData');
        if (savedData) {
            courseData = JSON.parse(savedData);
            // After loading, ensure test questions content is dynamic
            const testSection = courseData.sections.find(s => s.type === 'test');
            if (testSection) {
                 testSection.content = testSection.content.replace(/\d+ вопроса/, `${testQuestions.length} вопроса`);
            }
            console.log("Course data loaded from localStorage.");
        } else {
            console.log("No saved data found, using default data.");
        }
    } catch (error) {
        console.error("Failed to load course data from localStorage:", error);
    }
}

function addEditModeStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .edit-mode-active [contenteditable="true"] {
            outline: 2px dashed #dc3545;
            background-color: #fff9f9;
            padding: 2px;
            cursor: text;
        }
    `;
    document.head.appendChild(style);
}

function updateNavAuthState() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === '1' || localStorage.getItem('isLoggedIn') === 'true';
  const navUser = document.getElementById('nav-user');
  const loginBtn = document.getElementById('login-btn');
  const navUserName = document.getElementById('nav-user-name');
  const navUserPhoto = document.getElementById('nav-user-photo');
  if (isLoggedIn) {
    if (navUser) navUser.style.display = 'flex';
    if (loginBtn) loginBtn.style.display = 'none';
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (navUserName) {
      navUserName.textContent = (userData.firstname || '') + (userData.lastname ? ' ' + userData.lastname : '') || 'Пользователь';
    }
    if (navUserPhoto) {
      navUserPhoto.src = localStorage.getItem('userPhoto') || userData.photo || 'https://avatars.dicebear.com/api/personas/username.svg';
    }
  } else {
    if (navUser) navUser.style.display = 'none';
    if (loginBtn) loginBtn.style.display = 'inline-block';
  }
}
document.addEventListener('DOMContentLoaded', updateNavAuthState);
window.addEventListener('focus', updateNavAuthState);

// Global fallback function for debugging
window.testStartLearning = function() {
    console.log("Manual test function called");
    startLearning();
};

function blockNavForGuests() {
  document.querySelectorAll('.nav-item[href="roles.html"], .nav-item[href="engineer.html"], .nav-item[href="application1.html"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === '1' || localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) {
        e.preventDefault();
        let err = document.getElementById('auth-error-msg');
        if (!err) {
          err = document.createElement('div');
          err.id = 'auth-error-msg';
          err.textContent = 'Войдите или зарегистрируйтесь';
          err.style.position = 'fixed';
          err.style.top = '24px';
          err.style.left = '50%';
          err.style.transform = 'translateX(-50%)';
          err.style.background = '#fff';
          err.style.color = '#d32f2f';
          err.style.border = '2px solid #d32f2f';
          err.style.borderRadius = '8px';
          err.style.padding = '1em 2em';
          err.style.fontWeight = '600';
          err.style.fontSize = '1.1em';
          err.style.zIndex = '9999';
          document.body.appendChild(err);
          setTimeout(() => { err.remove(); }, 2200);
        }
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', blockNavForGuests);

console.log("JavaScript loaded successfully"); 