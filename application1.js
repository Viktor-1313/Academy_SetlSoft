// ICONA 2.0 - Applications Page JS

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