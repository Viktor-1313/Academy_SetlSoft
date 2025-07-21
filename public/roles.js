// ... main.js полный контент ... 
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