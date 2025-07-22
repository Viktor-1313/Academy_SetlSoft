// Данные о приложениях
const applications = [
    {
        id: 'icona-mobile',
        title: 'ICONA Mobile',
        description: 'Мобильное приложение для работы с системой ICONA',
        icon: 'ТН Моб.png',
        platforms: ['iOS', 'Android'],
        downloadLinks: {
            ios: 'https://apps.apple.com/icona',
            android: 'https://play.google.com/store/icona'
        }
    },
    {
        id: 'icona-desktop',
        title: 'ICONA Desktop',
        description: 'Десктопное приложение для полноценной работы с системой',
        icon: 'desktop-app.png',
        platforms: ['Windows', 'MacOS'],
        downloadLinks: {
            windows: 'https://download.icona.com/desktop/windows',
            macos: 'https://download.icona.com/desktop/macos'
        }
    }
];

// Функция для отображения приложений
function renderApplications() {
    const container = document.querySelector('.applications-grid');
    if (!container) return;

    container.innerHTML = applications.map(app => `
        <div class="application-card" data-id="${app.id}">
            <div class="application-icon">
                <img src="${app.icon}" alt="${app.title}" />
            </div>
            <div class="application-info">
                <h3>${app.title}</h3>
                <p>${app.description}</p>
                <div class="application-platforms">
                    ${app.platforms.map(platform => `<span class="platform-badge">${platform}</span>`).join('')}
                </div>
                <div class="application-actions">
                    ${Object.entries(app.downloadLinks).map(([platform, link]) => `
                        <a href="${link}" class="download-btn" target="_blank" rel="noopener noreferrer">
                            Скачать для ${platform}
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderApplications();
}); 