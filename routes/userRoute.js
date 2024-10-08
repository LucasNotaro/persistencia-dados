const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userController = require("../controllers/userController");

router.get("/list", async (req, res) => {
  try {
    const users = await User.find();
    res.render("users/userList", { users });
  } catch (error) {
    res.status(500).send("Erro ao buscar usuários: " + error.message);
  }
});

router.get("/add", (req, res) => {
  res.render("users/addUser");
});

router.post("/add", async (req, res) => {
  try {
    const { nome, email } = req.body;
    const newUser = new User({ nome, email });
    await newUser.save();
    res.redirect("/user/list"); // Redireciona para a lista de usuários após adicionar
  } catch (error) {
    res.status(500).send("Erro ao adicionar usuário: " + error.message);
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }
    res.render("users/editUser", { user });
  } catch (error) {
    res.status(500).send("Erro ao buscar usuário: " + error.message);
  }
});

router.put("/update/:id", userController.updateUser);

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
