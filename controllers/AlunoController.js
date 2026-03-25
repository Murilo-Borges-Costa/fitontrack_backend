import { Aluno } from "../models/alunoM.js";
import bcrypt from 'bcryptjs';

export async function listar(req, res) {
    const dados = await Aluno.findAll();
    res.json(dados);
}

export async function buscarPorId(req, res) {
    const dado = await Aluno.findByPk(req.params.id);
    if (!dado) return res.status(404).json({ erro: "Não encontrado" });
    res.json(dado);
}

export async function criar(req, res) {
    const { nome, email, senha, genero_id, objetivo_id, imagem } = req.body;

    const existe = await Aluno.findOne({ where: { email } });
    if (existe) return res.status(400).json({ erro: "Email já cadastrado" });

    const hash = await bcrypt.hash(senha, 10);

    const aluno = await Aluno.create({ nome, email, senha: hash, genero_id, objetivo_id, imagem });
    res.status(201).json(aluno);
}

export async function atualizar(req, res) {
    const dados = req.body;

    if (dados.senha) {
        dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    const [linhas] = await Aluno.update(dados, { where: { id: req.params.id } });

    if (!linhas) return res.status(404).json({ erro: "Não encontrado" });
    res.json({ mensagem: "Atualizado" });
}

export async function deletar(req, res) {
    const linhas = await Aluno.destroy({ where: { id: req.params.id } });
    if (!linhas) return res.status(404).json({ erro: "Não encontrado" });
    res.json();
}

export async function login(req, res) {
    const { email, senha } = req.body;

    const aluno = await Aluno.findOne({ where: { email } });
    if (!aluno) return res.status(401).json({ erro: "Inválido" });

    const ok = await bcrypt.compare(senha, aluno.senha);
    if (!ok) return res.status(401).json({ erro: "Inválido" });

    res.json({ id: aluno.id, nome: aluno.nome });
}


// import { Aluno } from "../models/alunoM.js";
// import bcrypt from 'bcryptjs';

// // LISTAR
// export async function mostrarAlunos(req, res) {
//     try {
//         const alunos = await Aluno.findAll();
//         res.status(200).json(alunos);
//     } catch {
//         res.status(500).json({ erro: "Erro ao buscar alunos" });
//     }
// }

// // BUSCAR POR ID
// export async function buscarAlunoPorId(req, res) {
//     try {
//         const aluno = await Aluno.findByPk(req.params.id);

//         if (!aluno) {
//             return res.status(404).json({ erro: "Aluno não encontrado" });
//         }

//         res.status(200).json(aluno);
//     } catch {
//         res.status(500).json({ erro: "Erro ao buscar aluno" });
//     }
// }

// // CRIAR
// export async function criarAlunos(req, res) {
//     const { nome, email, senha, genero_id, objetivo_id, imagem } = req.body;

//     if (!nome || !email || !senha || !genero_id || !objetivo_id) {
//         return res.status(400).json({ erro: "Preencha os campos corretamente" });
//     }

//     try {
//         const alunoExistente = await Aluno.findOne({ where: { email } });

//         if (alunoExistente) {
//             return res.status(400).json({ erro: "Email já cadastrado" });
//         }

//         const hashedSenha = await bcrypt.hash(senha, 10);

//         const aluno = await Aluno.create({
//             nome,
//             email,
//             senha: hashedSenha,
//             genero_id,
//             objetivo_id,
//             imagem
//         });

//         res.status(201).json({
//             mensagem: "Aluno cadastrado com sucesso",
//             aluno,
//         });

//     } catch (error) {
//         res.status(500).json({ erro: "Erro ao cadastrar aluno" });
//     }
// }

// // ATUALIZAR
// export async function atualizarAluno(req, res) {
//     try {
//         const dados = {
//             nome: req.body.nome,
//             email: req.body.email,
//             genero_id: req.body.genero_id,
//             objetivo_id: req.body.objetivo_id,
//             imagem: req.body.imagem
//         };

//         if (req.body.senha) {
//             dados.senha = await bcrypt.hash(req.body.senha, 10);
//         }

//         const [linhasAfetadas] = await Aluno.update(
//             dados,
//             { where: { id: req.params.id } }
//         );

//         if (linhasAfetadas === 0) {
//             return res.status(404).json({ erro: "Aluno não encontrado" });
//         }

//         res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });

//     } catch {
//         res.status(500).json({ erro: "Erro ao atualizar aluno" });
//     }
// }

// // LOGIN
// export async function loginAluno(req, res) {
//     const { email, senha } = req.body;

//     if (!email || !senha) {
//         return res.status(400).json({ erro: "Email e senha são obrigatórios" });
//     }

//     try {
//         const aluno = await Aluno.findOne({ where: { email } });

//         if (!aluno) {
//             return res.status(401).json({ erro: "Credenciais inválidas" });
//         }

//         const senhaValida = await bcrypt.compare(senha, aluno.senha);

//         if (!senhaValida) {
//             return res.status(401).json({ erro: "Credenciais inválidas" });
//         }

//         res.status(200).json({
//             mensagem: "Login realizado com sucesso",
//             aluno: {
//                 id: aluno.id,
//                 nome: aluno.nome,
//                 email: aluno.email
//             }
//         });

//     } catch {
//         res.status(500).json({ erro: "Erro ao fazer login" });
//     }
// }

// // DELETAR
// export async function deletarAluno(req, res) {
//     try {
//         const linhasAfetadas = await Aluno.destroy({
//             where: { id: req.params.id }
//         });

//         if (linhasAfetadas === 0) {
//             return res.status(404).json({ erro: "Aluno não encontrado" });
//         }

//         res.status(200).json({ mensagem: "Aluno deletado com sucesso" });

//     } catch {
//         res.status(500).json({ erro: "Erro ao deletar aluno" });
//     }
// }