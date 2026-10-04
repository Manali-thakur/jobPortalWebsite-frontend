import userModel from "../model/user.model.js";

export default class UserController {
  getLanding(req, res) {
    res.render("landing-page");
  }

  getLogin(req, res) {
    res.render("user-login");
  }

  getSignup(req, res) {
    res.render("landing-page", { showRegistration: true });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    const newUser = userModel.addUser(name, email, password);

    if (!newUser) {
      return res.render("user-login", { error: "Email already registered" });
    }
    res.render("user-login", {
      success: "Registered successfully. Please log in.",
    });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = userModel.loginUser(email, password);

    if (!user) {
      return res.render("user-login", { error: "Wrong email or password" });
    }
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    res.redirect("/jobs");
  }

  logout(req, res, next) {
    req.session.destroy((error) => {
      if (error) return next(error);
      res.clearCookie("connect.sid", { path: "/" });
      res.redirect("/");
    });
  }
}
