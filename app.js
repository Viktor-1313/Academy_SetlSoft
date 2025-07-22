
document.addEventListener('DOMContentLoaded', function() {
  
  // --- Глобальные переменные ---
  let photoChanged = false;
  let newPhotoData = '';

  // --- Утилиты ---
  function isEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(val);
  }

  function formatPhone(input) {
    let digits = input.replace(/\D/g, '');
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    if (!digits.startsWith('7')) digits = '7' + digits;
    digits = digits.slice(0, 11);
    let formatted = '+7';
    if (digits.length > 1) formatted += '-' + digits.slice(1, 4);
    if (digits.length > 4) formatted += '-' + digits.slice(4, 7);
    if (digits.length > 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length > 9) formatted += '-' + digits.slice(9, 11);
    return formatted;
  }

  // --- Обновление UI ---
  function updateProfileHeader() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const profileNameShort = document.getElementById('profile-name-short');
    if(profileNameShort) profileNameShort.textContent = (userData.firstname || '') + ' ' + (userData.lastname || 'Имя Фамилия');
    const profileUsername = document.getElementById('profile-username');
    if(profileUsername) profileUsername.textContent = userData.email || '';
    const profileCompanyShort = document.getElementById('profile-company-short');
    if(profileCompanyShort) profileCompanyShort.textContent = userData.company || 'Компания';
    const profilePositionShort = document.getElementById('profile-position-short');
    if(profilePositionShort) profilePositionShort.textContent = userData.position || 'Должность';
    const profilePhotoFloating = document.getElementById('profile-photo-floating');
    const photo = localStorage.getItem('userPhoto') || userData.photo;
    if(profilePhotoFloating) profilePhotoFloating.src = photo || 'https://avatars.dicebear.com/api/personas/username.svg';
  }

  function updateNavUser() {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const navUserName = document.getElementById('nav-user-name');
      const navUserPhoto = document.getElementById('nav-user-photo');
      if (navUserName) {
          if (userData.firstname || userData.lastname) {
              navUserName.textContent = (userData.firstname || '') + (userData.lastname ? ' ' + userData.lastname : '');
          } else {
              navUserName.textContent = 'Пользователь';
          }
      }
      if(navUserPhoto) {
          const photo = localStorage.getItem('userPhoto') || userData.photo;
          navUserPhoto.src = photo || 'https://avatars.dicebear.com/api/personas/username.svg';
      }
  }

  // --- Модальное окно профиля ---
  window.openProfileModal = function() {
    const profileModal = document.getElementById('profile-modal');
    if(profileModal) profileModal.style.display = 'flex';
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const email = userData.email;
    if (!email) return;

    fetch('http://localhost:3001/api/profile?email=' + encodeURIComponent(email))
      .then(res => res.json())
      .then(data => {
        if (!data.profile) throw new Error('Профиль не найден');
        Object.keys(data.profile).forEach(key => {
          const input = document.getElementById('modal-' + key);
          if (input) {
            if (input.type === 'file') {
              input.value = '';
            } else {
              input.value = data.profile[key] || '';
            }
          }
        });
        const emailInput = document.getElementById('modal-email');
        if (emailInput) emailInput.value = data.email || userData.email || '';
        const modalPhotoPreview = document.getElementById('modal-photo-preview');
        const photo = data.profile.photo || '';
        if(modalPhotoPreview) modalPhotoPreview.src = photo || 'https://avatars.dicebear.com/api/personas/username.svg';
      })
      .catch(e => {
        alert('Ошибка при получении профиля: ' + e);
      });
  }

  window.closeProfileModal = function() {
    const profileModal = document.getElementById('profile-modal');
    if(profileModal) profileModal.style.display = 'none';
  }
  
  // --- Обработчики событий ---
  const loginForm = document.getElementById('login-form');
  if(loginForm) {
      loginForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          const loginInput = document.getElementById('login');
          const val = loginInput.value.trim();
          const pass = document.getElementById('password').value;
          const errorDiv = document.getElementById('login-error');
          const confirmMsgDiv = document.getElementById('email-confirm-message');
          const resendBtn = document.getElementById('resend-confirm-btn');

          if (!isEmail(val) && !/^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/.test(val)) {
              if (errorDiv) {
                  errorDiv.textContent = 'Введите корректный номер телефона или email';
                  errorDiv.style.display = 'block';
              }
              return;
          }

          if (errorDiv) {
              errorDiv.style.display = 'none';
          }

          try {
              const response = await fetch('http://localhost:3001/api/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: val, password: pass })
              });
              const result = await response.json();
              if (response.ok && result.success) {
                  localStorage.clear();
                  localStorage.setItem('isLoggedIn', '1');
                  localStorage.setItem('userData', JSON.stringify({ ...result.user.profile, email: result.user.email }));
                  if (result.user.profile.photo) {
                      localStorage.setItem('userPhoto', result.user.profile.photo);
                  }
                  window.location.href = 'index.html';
              } else {
                  if (result.error === 'Email не подтвержден') {
                    if (confirmMsgDiv) {
                      confirmMsgDiv.textContent = 'Ваш email не подтвержден. Проверьте почту и перейдите по ссылке.';
                      confirmMsgDiv.style.display = 'block';
                    }
                    if (resendBtn) {
                      resendBtn.style.display = 'inline-block';
                      resendBtn.onclick = async function() {
                        resendBtn.disabled = true;
                        resendBtn.textContent = 'Отправка...';
                        const resp = await fetch('http://localhost:3001/api/resend-confirmation', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: val })
                        });
                        const data = await resp.json();
                        if (resp.ok && data.success) {
                          confirmMsgDiv.textContent = 'Письмо отправлено повторно. Проверьте почту.';
                        } else {
                          confirmMsgDiv.textContent = data.error || 'Ошибка отправки письма';
                        }
                        resendBtn.textContent = 'Отправить письмо повторно';
                        resendBtn.disabled = true;
                      };
                    }
                  } else {
                    if (errorDiv) {
                        errorDiv.textContent = result.error || 'Неверный логин или пароль';
                        errorDiv.style.display = 'block';
                    }
                    if (confirmMsgDiv) confirmMsgDiv.style.display = 'none';
                    if (resendBtn) resendBtn.style.display = 'none';
                  }
              }
          } catch (err) {
              if (errorDiv) {
                  errorDiv.textContent = 'Ошибка соединения с сервером';
                  errorDiv.style.display = 'block';
              }
          }
      });
  }
  
  // --- Сохранение фото при регистрации ---
  let regPhotoBase64 = '';
  const regPhotoInput = document.getElementById('reg-photo');
  if (regPhotoInput) {
    regPhotoInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
          regPhotoBase64 = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const regPhotoLabel = document.getElementById('reg-photo-label');
  const regPhotoFilename = document.getElementById('reg-photo-filename');
  if (regPhotoInput && regPhotoLabel && regPhotoFilename) {
    regPhotoInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      regPhotoFilename.textContent = file ? file.name : '';
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
      registerForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          const fname = document.getElementById('reg-firstname').value.trim();
          const lname = document.getElementById('reg-lastname').value.trim();
          const middlename = document.getElementById('reg-middlename').value.trim();
          const birthdate = document.getElementById('reg-birthdate').value;
          const company = document.getElementById('reg-company').value.trim();
          const position = document.getElementById('reg-position').value.trim();
          const email = document.getElementById('reg-email').value.trim();
          const regPhone = document.getElementById('reg-phone');
          const phone = regPhone.value.trim();
          const pass = document.getElementById('reg-password').value;
          const pass2 = document.getElementById('reg-password-confirm').value;
          const errorDiv = document.getElementById('register-error');

          if (!fname || !lname || !company || !position || !email || !phone || !pass || !pass2) {
              if(errorDiv) {
                  errorDiv.textContent = 'Пожалуйста, заполните все поля';
                  errorDiv.style.display = 'block';
              }
              return;
          }
          if (!isEmail(email)) {
              if(errorDiv) {
                  errorDiv.textContent = 'Введите корректную почту';
                  errorDiv.style.display = 'block';
              }
              return;
          }
          if (!/^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/.test(phone)) {
              if(errorDiv) {
                  errorDiv.textContent = 'Введите корректный номер телефона';
                  errorDiv.style.display = 'block';
              }
              return;
          }
          if (pass !== pass2) {
              if(errorDiv) {
                  errorDiv.textContent = 'Пароли не совпадают';
                  errorDiv.style.display = 'block';
              }
              return;
          }
          if(errorDiv) {
              errorDiv.style.display = 'none';
          }

          try {
              const response = await fetch('http://localhost:3001/api/register', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      email: email,
                      password: pass,
                      firstname: fname,
                      lastname: lname,
                      middlename: middlename,
                      birthdate: birthdate,
                      company: company,
                      position: position,
                      phone: phone,
                      photo: regPhotoBase64 // <-- добавлено фото
                  })
              });
              const result = await response.json();
              if (result.success) {
                  // Показываем сообщение о необходимости подтверждения email
                  const confirmMsgDiv = document.getElementById('email-confirm-message');
                  if (confirmMsgDiv) {
                    confirmMsgDiv.textContent = 'Регистрация успешна! На вашу почту отправлено письмо для подтверждения. Перейдите по ссылке из письма.';
                    confirmMsgDiv.style.display = 'block';
                  }
                  // Скрываем форму регистрации
                  document.getElementById('register-page').style.display = 'none';
                  return;
              } else {
                  if (errorDiv) {
                      errorDiv.textContent = result.error || 'Ошибка регистрации';
                      errorDiv.style.display = 'block';
                  }
              }
          } catch (err) {
              if (errorDiv) {
                  errorDiv.textContent = 'Ошибка соединения с сервером';
                  errorDiv.style.display = 'block';
              }
          }
      });
  }

  // --- Форматирование телефона при вводе в регистрации ---
  const regPhoneInput = document.getElementById('reg-phone');
  if (regPhoneInput) {
    regPhoneInput.addEventListener('input', function(e) {
      let val = regPhoneInput.value.replace(/\D/g, '');
      if (val.startsWith('8')) val = '7' + val.slice(1);
      if (!val.startsWith('7')) val = '7' + val;
      val = val.slice(0, 11);
      let formatted = '+7';
      if (val.length > 1) formatted += '-' + val.slice(1, 4);
      if (val.length > 4) formatted += '-' + val.slice(4, 7);
      if (val.length > 7) formatted += '-' + val.slice(7, 9);
      if (val.length > 9) formatted += '-' + val.slice(9, 11);
      regPhoneInput.value = formatted;
    });
  }

  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.onsubmit = async function(e) {
      e.preventDefault();
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const email = userData.email;
      if (!email) return;

      let oldProfile = {};
      try {
        const res = await fetch('http://localhost:3001/api/profile?email=' + encodeURIComponent(email));
        const data = await res.json();
        oldProfile = data.profile || {};
      } catch {}

      const changedProfile = {};
      Object.keys(oldProfile).forEach(key => {
        if (key === 'photo') return;
        const input = document.getElementById('modal-' + key);
        if (input && String(input.value) !== String(oldProfile[key] || '')) {
          changedProfile[key] = input.value;
        }
      });

      const emailInput = document.getElementById('modal-email');
      if (emailInput && String(emailInput.value) !== String(email)) {
        changedProfile.email = emailInput.value;
      }

      if (photoChanged && newPhotoData) {
        changedProfile.photo = newPhotoData;
      }

      const newPasswordInput = document.getElementById('modal-new-password');
      const newPassword = newPasswordInput && newPasswordInput.value.trim();

      if (Object.keys(changedProfile).length === 0 && !newPassword) {
        alert('Нет изменений для сохранения.');
        return;
      }

      const body = {
        email,
        profile: changedProfile
      };
      if (newPassword) {
        body.newPassword = newPassword;
      }

      const response = await fetch('http://localhost:3001/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const result = await response.json();
      if (result.success) {
        const updatedUserData = { ...userData, ...changedProfile };
        if (changedProfile.email) {
          updatedUserData.email = changedProfile.email;
        }
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        if (changedProfile.photo) {
          localStorage.setItem('userPhoto', changedProfile.photo);
        }
        alert('Профиль успешно обновлён!');
        if (result.emailChanged) {
          alert('Email успешно изменён! Теперь вход только по новому адресу.');
        }
        updateProfileHeader();
        updateNavUser();
        closeProfileModal();
      } else {
        alert(result.error || 'Ошибка обновления профиля');
      }
      photoChanged = false;
      newPhotoData = '';
    };
  }
  
  const modalPhotoInput = document.getElementById('modal-photo');
  if (modalPhotoInput) {
    modalPhotoInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
          const photoData = ev.target.result;
          const modalPhotoPreview = document.getElementById('modal-photo-preview');
          if (modalPhotoPreview) modalPhotoPreview.src = photoData;
          photoChanged = true;
          newPhotoData = photoData;
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  // --- Инициализация ---
  updateProfileHeader();
  updateNavUser();

  // --- Проверка подтверждения email по ссылке ---
  const urlParams = new URLSearchParams(window.location.search);
  const confirmToken = urlParams.get('token');
  if (confirmToken) {
    fetch('http://localhost:3001/api/confirm-email?token=' + encodeURIComponent(confirmToken))
      .then(res => res.text())
      .then(msg => {
        const msgDiv = document.getElementById('email-confirm-message');
        if (msgDiv) {
          msgDiv.textContent = msg;
          msgDiv.style.display = 'block';
        }
      });
  }

  const deleteProfileBtn = document.getElementById('delete-profile-btn');
  if (deleteProfileBtn) {
    deleteProfileBtn.onclick = function() {
      const deleteProfileModal = document.getElementById('delete-profile-modal');
      if(deleteProfileModal) deleteProfileModal.style.display = 'flex';
    };
  }

  const deleteProfileCancel = document.getElementById('delete-profile-cancel');
  if(deleteProfileCancel) {
    deleteProfileCancel.onclick = function() {
      const deleteProfileModal = document.getElementById('delete-profile-modal');
      if(deleteProfileModal) deleteProfileModal.style.display = 'none';
    };
  }

  const deleteProfileConfirm = document.getElementById('delete-profile-confirm');
  if(deleteProfileConfirm) {
    deleteProfileConfirm.onclick = async function() {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const email = userData.email;
      if (!email) return;

      await fetch('http://localhost:3001/api/delete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      localStorage.clear();
      window.location.href = 'index.html';
    };
  }

  // --- Показать форму регистрации по кнопке ---
  const registerBtn = document.getElementById('register-btn');
  if (registerBtn) {
    registerBtn.addEventListener('click', function() {
      document.getElementById('register-page').style.display = 'flex';
      document.getElementById('auth-page').style.display = 'none';
      const confirmMsgDiv = document.getElementById('email-confirm-message');
      if (confirmMsgDiv) confirmMsgDiv.style.display = 'none';
      const resendBtn = document.getElementById('resend-confirm-btn');
      if (resendBtn) resendBtn.style.display = 'none';
    });
  }
  // --- Кнопка отмены в форме регистрации ---
  const registerCancel = document.getElementById('register-cancel');
  if (registerCancel) {
    registerCancel.addEventListener('click', function() {
      document.getElementById('register-page').style.display = 'none';
      document.getElementById('auth-page').style.display = 'flex';
      const errorDiv = document.getElementById('register-error');
      if (errorDiv) errorDiv.style.display = 'none';
    });
  }

  // --- Вывод прогресса модулей в личном кабинете ---
  if (document.getElementById('user-modules-progress')) {
    let userData = {};
    try { userData = JSON.parse(localStorage.getItem('userData') || '{}'); } catch {}
    const email = userData.email;
    const progressDiv = document.getElementById('user-modules-progress');
    if (email && progressDiv) {
      fetch('http://localhost:3001/api/module-progress?email=' + encodeURIComponent(email))
        .then(res => res.json())
        .then(data => {
          const modulesProgress = data.modulesProgress || {};
          // Список модулей (id: название)
          const moduleNames = {
            'planning': 'Планирование',
            'classifier': 'Классификатор',
            'control-tn': 'Контроль ТН',
            'control-ips': 'Контроль ИПС',
            'control-lab': 'Контроль ЛАБ',
            'contractors': 'База подрядчиков',
            'user-creation': 'Создание пользователя',
            'planning-meeting': 'Планерка'
          };
          const started = Object.entries(modulesProgress).filter(([_, v]) => v > 0);
          if (started.length === 0) {
            progressDiv.innerHTML = '<div style="color:#888;text-align:center;">Вы ещё не начали обучение ни по одному модулю.</div>';
          } else {
            progressDiv.innerHTML = started.map(([id, percent]) => {
              const name = moduleNames[id] || id;
              const done = percent >= 100;
              return `<div style="display:flex;align-items:center;gap:18px;margin-bottom:12px;">
                <span style="font-size:1.13em;font-weight:600;min-width:180px;">${name}</span>
                <div style="flex:1;height:12px;background:#eee;border-radius:6px;overflow:hidden;">
                  <div style="width:${percent}%;height:100%;background:${done ? '#4caf50' : '#d32f2f'};transition:width 0.3s;"></div>
                </div>
                <span style="font-size:1.08em;font-weight:700;color:${done ? '#4caf50' : '#d32f2f'};margin-left:12px;">${percent}%${done ? ' (Завершён)' : ''}</span>
              </div>`;
            }).join('');
          }
        });
    }
  }

  // --- Вывод дерева прогресса обучения в личном кабинете ---
  if (document.getElementById('user-modules-progress')) {
    let userData = {};
    try { userData = JSON.parse(localStorage.getItem('userData') || '{}'); } catch {}
    const email = userData.email;
    const progressDiv = document.getElementById('user-modules-progress');
    if (email && progressDiv) {
      Promise.all([
        fetch('http://localhost:3001/api/modules-structure').then(r => r.json()),
        fetch('http://localhost:3001/api/learning-progress?email=' + encodeURIComponent(email)).then(r => r.json())
      ]).then(([structure, progressData]) => {
        const progress = progressData.learningProgress || {};
        let html = '';
        for (const [modId, modObj] of Object.entries(structure)) {
          const modProg = progress[modId]?.progress || 0;
          html += `<div style="margin-bottom:18px;">
            <div style="font-size:1.18em;font-weight:700;color:#d32f2f;">${modObj.title} <span style='font-size:0.95em;font-weight:400;color:#555;'>${modProg}%</span></div>`;
          for (const [secId, secObj] of Object.entries(modObj.sections || {})) {
            const secProg = progress[modId]?.sections?.[secId]?.progress || 0;
            html += `<div style="margin-left:22px;font-size:1.07em;font-weight:600;color:#b71c1c;">${secObj.title} <span style='font-size:0.93em;font-weight:400;color:#888;'>${secProg}%</span></div>`;
            for (const [courseId, courseTitle] of Object.entries(secObj.courses || {})) {
              const courseProg = progress[modId]?.sections?.[secId]?.courses?.[courseId] || 0;
              html += `<div style="margin-left:44px;font-size:1em;color:#333;">${courseTitle} <span style='font-size:0.93em;font-weight:400;color:#888;'>${courseProg}%</span></div>`;
            }
          }
          html += '</div>';
        }
        progressDiv.innerHTML = html || '<div style="color:#888;text-align:center;">Нет данных о прогрессе.</div>';
      });
    }
  }

  // --- Открывать форму регистрации по ?register=1 ---
  if (window.location.pathname.endsWith('auth.html')) {
    const params = new URLSearchParams(window.location.search);
    if (params.get('register') === '1') {
      const regPage = document.getElementById('register-page');
      const authPage = document.getElementById('auth-page');
      if (regPage && authPage) {
        regPage.style.display = 'flex';
        authPage.style.display = 'none';
      }
    }
  }

});

// --- DEMO BUTTON ANIMATION ---
const demoBtn = document.getElementById('demo-btn');
if (demoBtn) {
  demoBtn.addEventListener('mouseenter', function() {
    demoBtn.classList.add('glow');
  });
  demoBtn.addEventListener('mouseleave', function() {
    demoBtn.classList.remove('glow');
  });
  demoBtn.addEventListener('click', function() {
    window.scrollTo({
      top: document.getElementById('hero-video-section').offsetTop,
      behavior: 'smooth'
    });
    // Можно заменить на открытие модального окна с видео-демо
  });
}

// --- Анимация облёта кнопки "Смотреть демо" ---
if (demoBtn) {
  let animating = false;
  demoBtn.addEventListener('mouseenter', function() {
    if (animating) return;
    animating = true;
    demoBtn.classList.add('animating');
  });
  demoBtn.addEventListener('animationend', function() {
    demoBtn.classList.remove('animating');
    animating = false;
  });
}
