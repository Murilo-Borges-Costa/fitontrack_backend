import { Treino } from "../models/treinoM.js";

// MOSTRAR
export async function mostrarTreino(req, res) {
    Treino.findAll()
        .then(treinos => {
            res.status(200).json(treinos)
        })
        .catch(() => {
            res.status(500).json({ erro: "Erro ao buscar treinos" })
        });
}
// CRIAR
export async function criarTreino(req, res) {
    const { nome, repeticoes, descanso, img } = req.body;

    if (!nome || !repeticoes || !descanso || !img) {
        return res.status(400).json({ erro: "Prencha os campos corretamente" });
    }
    Treino.create({ nome, repeticoes, descanso, img })
        .then(treino => {
            res.status(201).json({
                mensagem: "Treino cadastrado com sucesso",
                treino,
            })
        })
        .catch(() => {
            res.status(500).json({ erro: "Erro ao buscar produtos" })
        })
}

// Atualizar
export async function atualizarTreino(req, res) {
    Treino.update(
        {
            nome: req.body.nome,
            repeticoes: req.body.repeticoes,
            descanso: req.body.descanso,
            img: req.body.img
        },
        { where: { id: req.params.id } },
    )
        // Then significa === "então"
        .then(([linhasAfetadas]) => {
            if (linhasAfetadas === 0) {
                return res.status(400).json({ erro: "Treino não encontrado" })
            }
            return res.status.apply(200).json({ mensagem: "Treino atualizado com sucesso!" })
        })
        .catch(() => {
            res.status(500).json({ erro: "Treino não encontrado" })
        })
}

// Deletar
export async function deletarTreino(req, res) {
    Treino.destroy({ where: { id: req.params.id } })
        .then(linhasAfetadas => {
            if (linhasAfetadas === 0) {
                return res.status(400).json({ erro: "Treino não encontrado" })
            }
            res.status(200).send();
        })
        .catch(() => {
            res.status(500).json({ erro: "Erro ao deletar treino" })
        })
}
