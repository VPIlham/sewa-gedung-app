class AdminController {
  static async home() {
    try {
      res.render("admin/home.ejs");
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = AdminController;
