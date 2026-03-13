import { Aluno } from "../models/alunoM.js";

// MOSTRAR
export async function mostrarAlunos(req, res) {
    Aluno.findAll()
        .then(alunos => {
            res.status(200).json(alunos)
        })
        .catch(() => {
            res.status(500).json({ erro: "Erro ao buscar alunos" })
        });
}

// CRIAR
export async function criarAlunos(req, res) {
    const { nome, email, senha, genero, objetivo, img } = req.body;

    if (!nome || !email || !senha || !genero || !objetivo || !img) {
        return res.status(400).json({ erro: "Prencha os campos corretamente" });
    }
    Aluno.create({ nome, email, senha, genero, objetivo, img })
        .then(aluno => {
            res.status(201).json({
                mensagem: "Aluno cadastrado com sucesso",
                aluno,
            })
        })
        .catch(() => {
            res.status(500).json({ erro: "Erro ao buscar produtos" })
        })
}

// Atualizar
export async function atualizarAluno(req, res) {
    Aluno.update(
        {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            genero: req.body.genero,
            objetivo: req.body.objetivo,
            img: req.body.img
        },
        { where: { id: req.params.id } },
    )
        // Then significa === "então"
        .then(([linhasAfetadas]) => {
            if (linhasAfetadas === 0) {
                return res.status(400).json({ erro: "Aluno não encontrado" })
            }
            return res.status.apply(200).json({ mensagem: "Aluno atualizado com sucesso!" })
        })
        .catch(() => {
            res.status(500).json({ erro: "Aluno não encontrado" })
        })
}

// Deletar
export async function deletarAluno(req, res) {
    Aluno.destroy({ where: { id: req.params.id } })
        .then(linhasAfetadas => {
            if (linhasAfetadas === 0) {
                return res.status(400).json({ erro: "Aluno não encontrado" })
            }
            res.status(200).send();
        })
        .catch(() => {
            res.status(500).json({ erro: "Erro ao deletar aluno" })
        })
}
