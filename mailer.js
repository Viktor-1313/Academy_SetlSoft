const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 587,
  secure: false, // true для 465, false для других портов
  auth: {
    user: 'confirmation.academysetlsoft@yandex.ru',
    pass: 'mymkkpfmcvkftxgm'
  }
});

function sendVerificationMail(email, token) {
  const link = `http://icona_academy.corppn.ru:3001/verify-email?token=${token}`;
  return transporter.sendMail({
    from: '"Setl Soft" <confirmation.academysetlsoft@yandex.ru>',
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `
      <p>Здравствуйте!</p>
      <p>Для подтверждения регистрации перейдите по ссылке:</p>
      <a href="${link}">Подтвердить e-mail</a>
      <p>Если вы не регистрировались, просто проигнорируйте это письмо.</p>
    `
  });
}

module.exports = { sendVerificationMail };
