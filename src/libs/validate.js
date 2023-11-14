class Validate {
  name(name) {
    if (!name || name.length < 3) {
      throw new Error("Name should have more than 3 characters");
    }
  }

  email(email) {
    if (!email || !email.includes("@") || !email.includes(".")) {
      throw new Error("E-mail is invalid");
    }
  }

  categoryId(category_id) {
    if (!category_id || typeof category_id !== "number") {
      throw new Error("Category id is invalid");
    }
  }

  color(color) {
    if (!color || color.length !== 7 || !color.includes("#")) {
      throw new Error("Color is invalid");
    }
  }

  iconUrl(icon_url) {
    if (!icon_url || !icon_url.includes(".") || !icon_url.includes("/")) {
      throw new Error("Icon url is invalid");
    }
  }

  financeId(finance_id) {
    if (!finance_id || typeof finance_id !== "number") {
      throw new Error("Finance id is invalid");
    }
  }

  title(title) {
    if (!title || title.length < 3) {
      throw new Error("Title should have more than 3 characters");
    }
  }

  date(date) {
    if (!date || date.length !== 10) {
      throw new Error("Date should be DD-MM-YYYY format");
    }
  }

  value(value) {
    if (!value || !typeof value !== "number") {
      throw new Error("Value is invalid");
    }
  }
}

module.exports = { validate: new Validate() };
