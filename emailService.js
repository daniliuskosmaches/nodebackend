const transporter = require('../config/emailConfig');

exports.sendBookingEmail = async (booking) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `Новая заявка: ${booking.packageType}`,
    html: `
      <h2>Детали заказа</h2>
      <p><strong>Имя:</strong> ${booking.name}</p>
      <p><strong>Телефон:</strong> ${booking.phone}</p>
      ${booking.email ? `<p><strong>Email:</strong> ${booking.email}</p>` : ''}
      ${booking.eventDate ? `<p><strong>Дата:</strong> ${new Date(booking.eventDate).toLocaleDateString()}</p>` : ''}
      
      <h3>Пакет: ${booking.packageType}</h3>
      
      ${booking.characters.length > 0 ? `
        <h4>Персонажи (${booking.characters.length})</h4>
        <ul>
          ${booking.characters.map(ch => `<li>${ch.name} - ${ch.price}₽</li>`).join('')}
        </ul>
      ` : ''}
      
      ${booking.shows.length > 0 ? `
        <h4>Шоу-программы (${booking.shows.length})</h4>
        <ul>
          ${booking.shows.map(show => `<li>${show.name} - ${show.price}₽</li>`).join('')}
        </ul>
      ` : ''}
      
      <h3>Итого: ${booking.total}₽</h3>
      <p>Дата заявки: ${new Date(booking.createdAt).toLocaleString()}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};