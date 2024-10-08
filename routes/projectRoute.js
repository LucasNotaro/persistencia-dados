const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");
const projectController = require("../controllers/projectController");

router.get("/list", async (req, res) => {
  try {
    const projects = await Project.find();
    res.render("projects/projectList", { projects });
  } catch (error) {
    res.status(500).send("Erro ao buscar projetos: " + error.message);
  }
});

router.get("/add", (req, res) => {
  res.render("projects/addProject", { errorMessage: null });
});

router.post("/add", async (req, res) => {
  try {
    const { nome, descricao, userId } = req.body;
    const newProject = new Project({ nome, descricao, userId });
    await newProject.save();
    res.redirect("/project/list"); // Redireciona para a lista de projetos após adicionar
  } catch (error) {
    let errorMessage = "Erro ao adicionar projeto.";
    if (error.name === "CastError" && error.path === "userId") {
      errorMessage = "ID do usuário inválido. Verifique o ID e tente novamente.";
    } else if (error.name === "ValidationError") {
      errorMessage = "Erro de validação. Verifique os dados inseridos.";
    }
    res.render("projects/addProject", { errorMessage });
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Projeto não encontrado");
    }
    res.render("projects/editProject", { project });
  } catch (error) {
    res.status(500).send("Erro ao buscar projeto: " + error.message);
  }
});

router.put("/update/:id", projectController.updateProject);

router.delete("/delete/:id", projectController.deleteProject);

module.exports = router;
