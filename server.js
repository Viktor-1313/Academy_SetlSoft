const express = require('express');
const fs = require('fs');
const path = require('path');
const Busboy = require('busboy');

const app = express();
const PORT = 3001;
const USERS_FILE = path.join(__dirname, 'users.json');
const MODULES_STRUCTURE_FILE = path.join(__dirname, 'modules_structure.json');

// --- middlewares ---
app.use(express.json({ limit: '10mb' })); // для JSON-тел
app.use(express.static(path.join(__dirname, 'public'))); // для отдачи index.html и статики

// --- CORS ---
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// --- util-функции работы с users ---
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// --- API endpoints ---

// Регистрация пользователя
app.post('/api/register', (req, res) => {
  const data = req.body;
  let users = readUsers();
  if (users.find(u => u.email === data.email)) {
    return res.status(400).json({ error: 'Пользователь уже существует' });
  }
  users.push({
    email: data.email,
    password: data.password,
    profile: {
      firstname: data.firstname,
      lastname: data.lastname,
      middlename: data.middlename,
      birthdate: data.birthdate,
      company: data.company,
      position: data.position,
      phone: data.phone,
      photo: data.photo || ''
    }
  });
  writeUsers(users);
  res.json({ success: true });
});

// Обновление профиля пользователя
app.post('/api/profile', (req, res) => {
  const data = req.body;
  let users = readUsers();
  const idx = users.findIndex(u => u.email === data.email);
  if (idx === -1) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }

  let emailChanged = false;
  // Обновляем email, если он изменился
  if (data.profile && data.profile.email && data.profile.email !== users[idx].email) {
    // Проверяем, не занят ли новый email
    if (users.some(u => u.email === data.profile.email)) {
      return res.status(400).json({ error: 'Этот email уже используется' });
    }
    users[idx].email = data.profile.email;
    emailChanged = true;
  }

  // Обновляем пароль, если он был передан
  if (data.newPassword) {
    users[idx].password = data.newPassword;
  }

  // Обновляем остальные данные профиля
  users[idx].profile = { ...users[idx].profile, ...data.profile };
  
  writeUsers(users);
  res.json({ success: true, emailChanged });
});

// Получение профиля
app.get('/api/profile', (req, res) => {
  const email = req.query.email;
  let users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json(user);
});

// Вход пользователя
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user: { email: user.email, profile: user.profile } });
  } else {
    res.status(401).json({ error: 'Неверные учетные данные' });
  }
});

// Загрузка фото (base64) через /api/upload-photo
app.post('/api/upload-photo', (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  let userEmail = '';
  let fileBuffer = [];
  let fileMime = '';
  
  busboy.on('field', (fieldname, val) => {
    if (fieldname === 'email') userEmail = val;
  });
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    fileMime = mimetype;
    file.on('data', (data) => fileBuffer.push(data));
  });
  busboy.on('finish', () => {
    let users = readUsers();
    const userIdx = users.findIndex(u => (u.email || '').toLowerCase() === (userEmail || '').toLowerCase());
    if (userIdx === -1) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    if (!users[userIdx].profile) users[userIdx].profile = {};
    const base64 = Buffer.concat(fileBuffer).toString('base64');
    users[userIdx].profile.photo = `data:${fileMime};base64,${base64}`;
    writeUsers(users);
    res.json({ success: true });
  });
  req.pipe(busboy);
});

// Удаление профиля
app.post('/api/delete-profile', (req, res) => {
    const { email } = req.body;
    let users = readUsers();
    const updatedUsers = users.filter(u => u.email !== email);
    
    if (users.length === updatedUsers.length) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    writeUsers(updatedUsers);
    res.json({ success: true });
});

// --- API: структура модулей ---
app.get('/api/modules-structure', (req, res) => {
  if (!fs.existsSync(MODULES_STRUCTURE_FILE)) return res.status(404).json({ error: 'Нет структуры модулей' });
  const structure = JSON.parse(fs.readFileSync(MODULES_STRUCTURE_FILE, 'utf8'));
  res.json(structure);
});

// --- API: прогресс обучения пользователя ---
// Получить прогресс
app.get('/api/learning-progress', (req, res) => {
  const { email } = req.query;
  let users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
  res.json({ learningProgress: user.learningProgress || {} });
});
// Обновить прогресс (модуль/раздел/курс)
app.post('/api/learning-progress', (req, res) => {
  const { email, moduleId, sectionId, courseId, progress } = req.body;
  if (!email || !moduleId || typeof progress !== 'number') {
    return res.status(400).json({ error: 'Некорректные данные' });
  }
  let users = readUsers();
  const idx = users.findIndex(u => u.email === email);
  if (idx === -1) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }
  if (!users[idx].learningProgress) users[idx].learningProgress = {};
  if (!users[idx].learningProgress[moduleId]) users[idx].learningProgress[moduleId] = { progress: 0, sections: {} };
  if (sectionId) {
    if (!users[idx].learningProgress[moduleId].sections[sectionId]) users[idx].learningProgress[moduleId].sections[sectionId] = { progress: 0, courses: {} };
    if (courseId) {
      users[idx].learningProgress[moduleId].sections[sectionId].courses[courseId] = progress;
    } else {
      users[idx].learningProgress[moduleId].sections[sectionId].progress = progress;
    }
  } else {
    users[idx].learningProgress[moduleId].progress = progress;
  }
  writeUsers(users);
  res.json({ success: true });
});

// 404 для остальных маршрутов
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// --- запуск сервера ---
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
