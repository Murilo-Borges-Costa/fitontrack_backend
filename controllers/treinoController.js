import { Treino } from "../models/treinoM.js";

export async function listar(req, res) {
    res.json(await Treino.findAll());
}

export async function criar(req, res) {
    res.status(201).json(await Treino.create(req.body));
}

export async function deletar(req, res) {
    const linhas = await Treino.destroy({ where: { id: req.params.id } });
    if (!linhas) return res.status(404).json({ erro: "Não encontrado" });
    res.json();
}