import { Aluno } from "../models/alunoM.js";
import bcrypt from 'bcryptjs';

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

    try {
        const hashedSenha = await bcrypt.hash(senha, 10);
        const aluno = await Aluno.create({ nome, email, senha: hashedSenha, genero, objetivo, img });
        res.status(201).json({
            mensagem: "Aluno cadastrado com sucesso",
            aluno,
        });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao cadastrar aluno" });
    }
}

// Atualizar
export async function atualizarAluno(req, res) {
    try {
        const hashedSenha = await bcrypt.hash(req.body.senha, 10);
        const [linhasAfetadas] = await Aluno.update(
            {
                nome: req.body.nome,
                email: req.body.email,
                senha: hashedSenha,
                genero: req.body.genero,
                objetivo: req.body.objetivo,
                img: req.body.img
            },
            { where: { id: req.params.id } },
        );
        if (linhasAfetadas === 0) {
            return res.status(400).json({ erro: "Aluno não encontrado" });
        }
        res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar aluno" });
    }
}

// LOGIN
export async function loginAluno(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    try {
        const aluno = await Aluno.findOne({ where: { email } });
        if (!aluno) {
            return res.status(401).json({ erro: "Credenciais inválidas" });
        }

        const isValid = await bcrypt.compare(senha, aluno.senha);
        if (!isValid) {
            return res.status(401).json({ erro: "Credenciais inválidas" });
        }

        res.status(200).json({ mensagem: "Login realizado com sucesso", aluno: { id: aluno.id, nome: aluno.nome, email: aluno.email } });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao fazer login" });
    }
}

// Deletar
export async function deletarAluno(req, res) {
    try {
        const linhasAfetadas = await Aluno.destroy({ where: { id: req.params.id } });
        if (linhasAfetadas === 0) {
            return res.status(400).json({ erro: "Aluno não encontrado" });
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar aluno" });
    }
}
