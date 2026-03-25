import { Exercicio } from "../models/exercicioM.js";

export async function listar(req, res) {
    res.json(await Exercicio.findAll());
}

export async function criar(req, res) {
    res.status(201).json(await Exercicio.create(req.body));
}

export async function deletar(req, res) {
    const linhas = await Exercicio.destroy({ where: { id: req.params.id } });
    if (!linhas) return res.status(404).json({ erro: "Não encontrado" });
    res.json();
}