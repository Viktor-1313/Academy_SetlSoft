const http = require('http');
const fs = require('fs');
const path = require('path');
const Busboy = require('busboy');
const USERS_FILE = './users.json';

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

const server = http.createServer((req, res) => {
  console.log('Запрос:', req.method, req.url);
  // --- CORS preflight ---
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': 86400
    });
    res.end();
    return;
  }

  // --- Регистрация пользователя ---
  if (req.url === '/api/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        let users = readUsers();
        if (users.find(u => u.email === data.email)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Пользователь уже существует' }));
          return;
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
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ошибка регистрации' }));
      }
    });
    return;
  }

  // --- Обновление профиля пользователя ---
  if (req.url === '/api/profile' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('profile:', data.profile); // ЛОГИРУЕМ
        let users = readUsers();
        const idx = users.findIndex(u => u.email === data.email);
        if (idx === -1) {
          res.writeHead(404, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          });
          res.end(JSON.stringify({ error: 'Пользователь не найден' }));
          return;
        }
        users[idx].profile = { ...users[idx].profile, ...data.profile };
        writeUsers(users);
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(JSON.stringify({ error: 'Ошибка обновления профиля' }));
      }
    });
    return;
  }

  // --- Загрузка фото ---
  if (req.url === '/api/upload-photo' && req.method === 'POST') {
    const busboy = new Busboy({ headers: req.headers });
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
        res.writeHead(404, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(JSON.stringify({ error: 'Пользователь не найден' }));
        return;
      }
      if (!users[userIdx].profile) users[userIdx].profile = {};
      const base64 = Buffer.concat(fileBuffer).toString('base64');
      users[userIdx].profile.photo = `data:${fileMime};base64,${base64}`;
      writeUsers(users);
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      res.end(JSON.stringify({ success: true }));
    });
    req.pipe(busboy);
    return;
  }

  // --- Получение профиля пользователя по email ---
  if (req.url.startsWith('/api/profile') && req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const email = url.searchParams.get('email');
    let users = readUsers();
    const user = users.find(u => u.email === email);
    res.writeHead(user ? 200 : 404, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(user || { error: 'Пользователь не найден' }));
    return;
  }

  // 404 для остальных
  res.writeHead(404, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(3001, () => console.log('Server started')); 