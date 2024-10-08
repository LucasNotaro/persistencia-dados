const Project = require("../models/projectModel");

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).send("Projeto não encontrado");
    }

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.status(200).json(updatedProject);
    } else {
      res.redirect("/project/list");
    }
  } catch (error) {
    res.status(500).send("Erro ao atualizar projeto: " + error.message);
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).send("Projeto não encontrado");
    }

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.status(200).json({ message: "Projeto removido com sucesso" });
    } else {
      res.redirect("/project/list");
    }
  } catch (error) {
    res.status(500).send("Erro ao deletar projeto: " + error.message);
  }
};
