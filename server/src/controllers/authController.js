const authService = require("../services/authService");

const authController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, phoneNumber, email, password } = req.body;
      await authService.register({ firstName, lastName, phoneNumber, email, password });
      res.status(201).send("User register successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to register user");
    }
  },

  login: async (req, res) => {
    try {
      const token = await authService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Login failed");
    }
  },
};

module.exports = authController;
