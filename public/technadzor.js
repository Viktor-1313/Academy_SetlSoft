// --- Адаптивный хейдер, поиск, профиль ---
document.addEventListener('DOMContentLoaded', function() {
  // --- Бургер-меню ---
  const burger = document.querySelector('.nav-burger');
  const navMenu = document.querySelector('.nav-menu');
  if (burger && navMenu) {
    burger.addEventListener('click', function() {
      navMenu.classList.toggle('open');
    });
    // Закрытие меню при клике вне
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }

  // --- Поиск ---
  const searchInput = document.getElementById('site-search');
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        alert('Поиск по запросу: ' + searchInput.value);
      }
    });
  }

  // --- Отображение пользователя в хедере ---
  updateNavUser();
  updateHeaderUserBlock();
});

function updateNavUser() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const navUserName = document.getElementById('nav-user-name');
  const navUserPhoto = document.getElementById('nav-user-photo');
  if (userData.firstname || userData.lastname) {
    navUserName.textContent = (userData.firstname || '') + (userData.lastname ? ' ' + userData.lastname : '');
  } else {
    navUserName.textContent = 'Пользователь';
  }
  const photo = localStorage.getItem('userPhoto') || userData.photo;
  if (photo) {
    navUserPhoto.src = photo;
  } else {
    navUserPhoto.src = 'https://avatars.dicebear.com/api/personas/username.svg';
  }
}

function updateHeaderUserBlock() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || localStorage.getItem('isLoggedIn') === '1';
  const userName = localStorage.getItem('userName') || 'Пользователь';
  const userPhoto = localStorage.getItem('userPhoto') || 'https://avatars.dicebear.com/api/personas/username.svg';
  const navUser = document.getElementById('nav-user');
  const profileLink = document.querySelector('.nav-item[href="profile.html"]');
  if (isLoggedIn) {
    if (navUser) {
      navUser.style.display = 'flex';
      const nameSpan = navUser.querySelector('#nav-user-name');
      const photoImg = navUser.querySelector('#nav-user-photo');
      if (nameSpan) nameSpan.textContent = userName;
      if (photoImg) photoImg.src = userPhoto;
    }
    if (profileLink) profileLink.style.display = 'none';
  } else {
    if (navUser) navUser.style.display = 'none';
    if (profileLink) profileLink.style.display = '';
  }
}
window.addEventListener('DOMContentLoaded', updateHeaderUserBlock);

// --- Логика кнопки "Войти" ---
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', function() {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', 'Иван Иванов');
    localStorage.setItem('userPhoto', 'https://avatars.dicebear.com/api/personas/ivan.svg');
    updateHeaderUserBlock();
  });
}

// --- Модальное окно профиля (заглушка) ---
window.openProfileModal = function() {
  alert('Профиль: здесь будет модальное окно профиля пользователя.');
};
window.closeProfileModal = function() {
  // Закрытие модального окна профиля (если будет)
};

// --- Модули обучения и тестирование для раздела "Технический надзор" ---

const technadzorLessons = [
  {
    id: 'intro',
    title: 'Введение',
    content: `
      <h1>Введение в технический надзор</h1>
      <p>Технический надзор – это комплекс работ по контролю качества, сроков и безопасности строительства.<br>
      <b>Роль инженера:</b> минимизация рисков, контроль за документацией и соответствием нормативам.</p>
      <div class="video-block">Здесь будет видео-“Как работает технадзор” (заглушка).</div>
      <button class="btn-main" onclick="goTechnadzorSection('functions')">Перейти к функциям &rarr;</button>
    `
  },
  {
    id: 'functions',
    title: 'Функции технического надзора',
    content: `
      <h1>Функции технического надзора</h1>
      <ul>
        <li>Контроль входных материалов и конструкций;</li>
        <li>Проверка выполнения работ по проекту;</li>
        <li>Ведение рабочих журналов, контроль актов и чек-листов;</li>
        <li>Освидетельствование скрытых работ и ответственных конструкций.</li>
      </ul>
      <div class="video-block">Видеоурок: “Основные функции инженера технадзора” (заглушка).</div>
      <button class="btn-secondary" onclick="goTechnadzorSection('intro')">&larr; Назад</button>
      <button class="btn-main" onclick="goTechnadzorSection('docs')">Далее: Документация &rarr;</button>
    `
  },
  {
    id: 'docs',
    title: 'Документация',
    content: `
      <h1>Документооборот при технадзоре</h1>
      <ul>
        <li>Журналы производства работ</li>
        <li>Акты освидетельствования скрытых работ</li>
        <li>Протоколы входного контроля</li>
        <li>Фотоотчёты, чек-листы и электронные базы</li>
      </ul>
      <div class="simulator-block">
        Интерактив: попробуйте заполнить акт (заглушка).<br>
        <input placeholder="Типовой акт (пример)" style="width: 80%;margin:8px 0;">
      </div>
      <button class="btn-secondary" onclick="goTechnadzorSection('functions')">&larr; Назад</button>
      <button class="btn-main" onclick="goTechnadzorSection('test')">Перейти к тесту &rarr;</button>
    `
  },
  {
    id: 'test',
    title: 'Итоговый тест',
    content: `
      <h1>Тест по разделу “Технический надзор”</h1>
      <form id="technadzor-test-form"></form>
      <div id="technadzor-test-result" style="margin-top:15px;"></div>
      <button class="btn-secondary" onclick="goTechnadzorSection('docs')">&larr; Назад</button>
    `
  },
  {
    id: 'certificate',
    title: 'Сертификат',
    content: `
      <h1>Поздравляем!</h1>
      <div style="color:#219944;margin-bottom:10px;">Вы успешно завершили тест. Теперь доступен именной сертификат:</div>
      <div class="profile-block" style="margin: 20px 0;">
        <label for="username">ФИО для сертификата:</label>
        <input type="text" id="username" value="Иван Иванов">
      </div>
      <div class="certificate-img-block">
        <img id="certificate-img" src="sertificate.jpg" alt="Сертификат" style="max-width:320px;border-radius:7px;">
      </div>
      <button onclick="downloadPersonalizedTechnadzor()">Скачать сертификат (JPG)</button>
      <div class="note">Имя появится на самом сертификате при скачивании</div>
      <div id="result-message"></div>
      <canvas id="canvas" width="800" height="600" style="display:none;"></canvas>
      <img id="certificate" src="sertificate.jpg" style="display:none;" crossorigin="anonymous">
    `
  }
];

const technadzorTestQuestions = [
  {
    q: "Что обязательно проверяет инженер технадзора?",
    options: [
      "Только сроки окончания работ",
      "Качество и соответствие материалов",
      "Работу бухгалтерии"
    ],
    correct: 1
  },
  {
    q: "Для чего необходим акт освидетельствования скрытых работ?",
    options: [
      "Для отчёта руководству компании",
      "Для фиксации проведения технологически важных, позднее недоступных работ",
      "Для контроля графика строительства"
    ],
    correct: 1
  },
  {
    q: "Какой проходной балл необходим для получения сертификата?",
    options: [
      "70%",
      "60%",
      "80%"
    ],
    correct: 2
  }
];

let technadzorProgress = {};
let technadzorCurrent = 'intro';
let technadzorScore = 0;

function renderTechnadzorLesson() {
  const lesson = technadzorLessons.find(l => l.id === technadzorCurrent);
  document.title = `ICONA — ${lesson.title}`;
  document.getElementById('main-content-block').innerHTML = lesson.content;
  renderTechnadzorSidebar();

  // Тест — инициализация и обработчик
  if (technadzorCurrent === 'test') renderTechnadzorTest();
  if (technadzorCurrent === 'certificate') setupCertButton();
}

function goTechnadzorSection(id) {
  technadzorCurrent = id;
  technadzorProgress[id] = true;
  renderTechnadzorLesson();
  window.scrollTo(0,0);
}

function renderTechnadzorSidebar() {
  const nav = document.querySelector('.sidebar-list');
  nav.innerHTML = '';
  technadzorLessons.forEach(l => {
    let mark = technadzorProgress[l.id] ? '✔️' : '';
    let show = (l.id !== 'certificate') || (technadzorScore >= 80);
    let active = l.id === technadzorCurrent ? 'active' : '';
    if (show) {
      nav.insertAdjacentHTML('beforeend',
        `<li class="sidebar-item ${active}">${mark} ${l.title}</li>`);
    }
  });
}

function renderTechnadzorTest() {
  const f = document.getElementById('technadzor-test-form');
  let html = '';
  technadzorTestQuestions.forEach((q, i) => {
    html += `<div><b>${i+1}. ${q.q}</b></div>`;
    q.options.forEach((opt, j) => {
      html += `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label><br>`;
    });
    html += `<br>`;
  });
  html += `<button type="submit" class="btn-main" style="margin:14px 0 0 0;">Проверить результат</button>`;
  f.innerHTML = html;
  f.onsubmit = technadzorTestCheck;
}

function technadzorTestCheck(e) {
  e.preventDefault();
  let correct = 0;
  technadzorTestQuestions.forEach((q, i) => {
    const val = document.querySelector(`input[name="q${i}"]:checked`);
    if (val && parseInt(val.value) === q.correct) correct++;
  });
  let percent = Math.round((correct / technadzorTestQuestions.length) * 100);
  technadzorScore = percent;
  const res = document.getElementById('technadzor-test-result');
  if (percent >= 80) {
    res.innerHTML = `<span style="color:green;">Тест сдан на ${percent}%.<br>Доступен сертификат!</span>
    <div class="notice-green">Нажмите “Перейти к сертификату” — далее вы сможете скачать его с вашим ФИО.</div>
    <button class="btn-main" onclick="goTechnadzorSection('certificate')">Перейти к сертификату</button>`;
    technadzorProgress['certificate'] = true;
  } else {
    res.innerHTML = `<span style="color:#d51e25;">Недостаточно баллов: ${percent}%. Сертификат не выдан, попробуйте заново!</span>`;
  }
}

function setupCertButton() {
  if (document.getElementById('downloadCertificateBtn')) return; // уже был обработчик
  var btn = document.querySelector('button[onclick="downloadPersonalizedTechnadzor()"]');
  if (btn) btn.onclick = downloadPersonalizedTechnadzor;
}

function downloadPersonalizedTechnadzor() {
  const username = document.getElementById('username').value.trim() || "Пользователь";
  const img = document.getElementById('certificate');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  if (img.complete) {
    drawAndDownloadCert();
  } else {
    img.onload = drawAndDownloadCert;
  }
  function drawAndDownloadCert() {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#b90c13';
    ctx.textAlign = 'center';
    ctx.fillText(username, canvas.width/2, 350);
    canvas.toBlob(function(blob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "certificate_" + username.replace(/[^\wа-яА-ЯёЁ]/g, '_') + ".jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      document.getElementById('result-message').textContent = "Сертификат успешно скачан.";
    }, "image/jpeg");
  }
}

// ----- Инициализация -----
window.onload = renderTechnadzorLesson;
window.goTechnadzorSection = goTechnadzorSection;
window.downloadPersonalizedTechnadzor = downloadPersonalizedTechnadzor;
