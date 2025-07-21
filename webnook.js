const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = 3030; // Выберите свободный порт

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('📨 Получен webhook-пинг от GitHub');

  // Выполняем git pull в указанной директории
  exec('git pull origin main', { cwd: 'C:\\Users\\Driga_va\\Academy_SetlSoft' }, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Ошибка при pull:', err);
      return res.status(500).send('Ошибка при обновлении');
    }
    console.log('✅ Репозиторий обновлён:\n', stdout);
    res.status(200).send('OK');
  });
});

app.listen(PORT, () => {
  console.log(`✅ Webhook-сервер запущен на http://localhost:${PORT}/webhook`);
});
