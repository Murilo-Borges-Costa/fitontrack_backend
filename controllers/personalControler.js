import { Personal } from "../models/personalM.js";

// MOSTRAR
export async function mostrarPersonals(req, res) {
     Personal.findAll()
        .then(personals => {
            res.status(200).json(personals)
        })
        .catch(() => {
            res.status(500).json({ erro: "Erro ao buscar personals" })
        });
}
// CRIAR
export async function criarPersonal(req, res) {
const { cref, nome, email, senha, genero, img} = req.body;

    if (!cref || !nome || !email || !senha || !genero || !img) {
        return res.status(400).json({ erro: "Prencha os campos corretamente" });
    }
    Personal.create({ cref, nome, email, senha, genero, img })
        .then(personal => {
            res.status(201).json({
                mensagem: "Personal cadastrado com sucesso",
                personal,
            })
        })
        .catch(() => {
            res.status(500).json({ erro: "Erro ao buscar personal" })
        })
    }

    // Atualizar
export async function atualizarPersonal(req, res) {
    Personal.update(
        {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            genero: req.body.genero,
            objetivo: req.body.objetivo
        },
        { where: { id: req.params.id } },
    )
        // Then significa === "então"
        .then(([linhasAfetadas]) => {
            if (linhasAfetadas === 0) {
                return res.status(400).json({ erro: "Personal não encontrado" })
            }
            return res.status.apply(200).json({ mensagem: "Personal atualizado com sucesso!" })
        })
        .catch(() => {
            res.status(500).json({ erro: "Personal não encontrado" })
        })
}

// Deletar
export async function deletarPersonal(req, res) {
Personal.destroy({ where: { id: req.params.id } })
        .then(linhasAfetadas => {
            if (linhasAfetadas === 0) {
                return res.status(400).json({ erro: "Personal não encontrado" })
            }
            res.status(200).send();
        })
        .catch(() => {
            res.status(500).json({ erro: "Erro ao deletar personal" })
        })
    }
