class Booking {
  constructor({ name, phone, email, eventDate, packageType, characters = [], shows = [] }) {
    this.name = name;
    this.phone = this.normalizePhone(phone);
    this.email = email || null;
    this.eventDate = eventDate || null;
    this.packageType = packageType;
    this.characters = characters;
    this.shows = shows;
    this.createdAt = new Date();
  }

  normalizePhone(phone) {
    // Удаляем все нецифровые символы
    return phone.replace(/\D/g, '');
  }

  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length < 2) {
      errors.push("Имя должно содержать минимум 2 символа");
    }
    
    if (!this.phone || this.phone.length < 10) {
      errors.push("Укажите корректный телефон (минимум 10 цифр)");
    }
    
    if (!this.packageType) {
      errors.push("Выберите пакет услуг");
    }
    
    return errors;
  }

  calculateTotal() {
    const charactersSum = this.characters.reduce((sum, ch) => sum + (ch.price || 0), 0);
    const showsSum = this.shows.reduce((sum, show) => sum + (show.price || 0), 0);
    
    return charactersSum + showsSum;
  }
}

module.exports = Booking;
