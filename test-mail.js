const { sendConfirmationMail } = require('./mailer');
const token = 'testtoken123';

sendConfirmationMail('Driga_VA@setltech.ru', token)
  .then(() => console.log('✅ Письмо отправлено!'))
  .catch(err => console.error('❌ Ошибка отправки:', err));
