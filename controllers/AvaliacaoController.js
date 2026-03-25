import { Avaliacao } from "../models/avaliacaoM.js";

export async function listar(req, res) {
    res.json(await Avaliacao.findAll());
}

export async function criar(req, res) {
    res.status(201).json(await Avaliacao.create(req.body));
}