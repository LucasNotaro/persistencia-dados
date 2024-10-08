const User = require("../models/userModel");

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).send("Usuário não encontrado");
    }

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.status(200).json(updatedUser);
    } else {
      res.redirect("/user/list");
    }
  } catch (error) {
    res.status(500).send("Erro ao atualizar usuário: " + error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send("Usuário não encontrado");
    }

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.status(200).json({ message: "Usuário removido com sucesso" });
    } else {
      res.redirect("/user/list");
    }
  } catch (error) {
    res.status(500).send("Erro ao deletar usuário: " + error.message);
  }
};
