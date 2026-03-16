import { Personal } from "../models/personalM.js";
import bcrypt from 'bcryptjs';

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

    try {
        const hashedSenha = await bcrypt.hash(senha, 10);
        const personal = await Personal.create({ cref, nome, email, senha: hashedSenha, genero, img });
        res.status(201).json({
            mensagem: "Personal cadastrado com sucesso",
            personal,
        });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao cadastrar personal" });
    }
}

    // Atualizar
export async function atualizarPersonal(req, res) {
    try {
        const hashedSenha = await bcrypt.hash(req.body.senha, 10);
        const [linhasAfetadas] = await Personal.update(
            {
                cref: req.body.cref,
                nome: req.body.nome,
                email: req.body.email,
                senha: hashedSenha,
                genero: req.body.genero,
                img: req.body.img
            },
            { where: { id: req.params.id } },
        );
        if (linhasAfetadas === 0) {
            return res.status(400).json({ erro: "Personal não encontrado" });
        }
        res.status(200).json({ mensagem: "Personal atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar personal" });
    }
}

// LOGIN
export async function loginPersonal(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    try {
        const personal = await Personal.findOne({ where: { email } });
        if (!personal) {
            return res.status(401).json({ erro: "Credenciais inválidas" });
        }

        const isValid = await bcrypt.compare(senha, personal.senha);
        if (!isValid) {
            return res.status(401).json({ erro: "Credenciais inválidas" });
        }

        res.status(200).json({ mensagem: "Login realizado com sucesso", personal: { id: personal.id, nome: personal.nome, email: personal.email } });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao fazer login" });
    }
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
