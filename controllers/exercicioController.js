import { Exercicio } from "../models/index.js";

export async function createExercicio(req, res) {
  try {
    const { nome, descricao, grupo_muscular, img } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "O campo 'nome' é obrigatório" });
    }

    const exercicio = await Exercicio.create({
      nome,
      descricao: descricao || null,
      grupo_muscular: grupo_muscular || null,
      img: img || null,
    });

    return res.status(201).json({
      mensagem: "Exercício criado com sucesso",
      exercicio,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao criar exercício" });
  }
}

export async function getExercicios(req, res) {
  try {
    const exercicios = await Exercicio.findAll();
    return res.status(200).json(exercicios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao listar exercícios" });
  }
}

export async function getExercicioById(req, res) {
  try {
    const { id } = req.params;
    const exercicio = await Exercicio.findByPk(id);

    if (!exercicio) {
      return res.status(404).json({ erro: "Exercício não encontrado" });
    }

    return res.status(200).json(exercicio);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao buscar exercício" });
  }
}

export async function updateExercicio(req, res) {
  try {
    const { id } = req.params;
    const { nome, descricao, grupo_muscular, img } = req.body;

    const exercicio = await Exercicio.findByPk(id);
    if (!exercicio) {
      return res.status(404).json({ erro: "Exercício não encontrado" });
    }

    await exercicio.update({
      nome: nome || exercicio.nome,
      descricao: descricao || exercicio.descricao,
      grupo_muscular: grupo_muscular || exercicio.grupo_muscular,
      img: img || exercicio.img,
    });

    return res.status(200).json({
      mensagem: "Exercício atualizado com sucesso",
      exercicio,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao atualizar exercício" });
  }
}

export async function deleteExercicio(req, res) {
  try {
    const { id } = req.params;
    const exercicio = await Exercicio.findByPk(id);

    if (!exercicio) {
      return res.status(404).json({ erro: "Exercício não encontrado" });
    }

    await exercicio.destroy();

    return res.status(200).json({ mensagem: "Exercício deletado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao deletar exercício" });
  }
}
