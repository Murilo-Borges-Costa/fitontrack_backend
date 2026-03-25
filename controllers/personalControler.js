import { Personal } from "../models/personalM.js";
import bcrypt from "bcryptjs";

export async function listar(req, res) {
    res.json(await Personal.findAll());
}

export async function criar(req, res) {
    const { cref, nome, email, senha, genero_id, imagem } = req.body;

    const hash = await bcrypt.hash(senha, 10);

    const personal = await Personal.create({
        cref, nome, email, senha: hash, genero_id, imagem
    });

    res.status(201).json(personal);
}

export async function atualizar(req, res) {
    const dados = req.body;

    if (dados.senha) {
        dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    const [linhas] = await Personal.update(dados, {
        where: { id: req.params.id }
    });

    if (!linhas) return res.status(404).json({ erro: "Não encontrado" });

    res.json();
}

export async function deletar(req, res) {
    const linhas = await Personal.destroy({ where: { id: req.params.id } });
    if (!linhas) return res.status(404).json({ erro: "Não encontrado" });
    res.json();
}

export async function login(req, res) {
    const { email, senha } = req.body;

    const user = await Personal.findOne({ where: { email } });
    if (!user) return res.status(401).json({ erro: "Inválido" });

    const ok = await bcrypt.compare(senha, user.senha);
    if (!ok) return res.status(401).json({ erro: "Inválido" });

    res.json(user);
}


// import { Personal } from "../models/personalM.js";
// import bcrypt from 'bcryptjs';

// // LISTAR
// export async function mostrarPersonais(req, res) {
//     try {
//         const personais = await Personal.findAll();
//         res.status(200).json(personais);
//     } catch {
//         res.status(500).json({ erro: "Erro ao buscar personais" });
//     }
// }

// // BUSCAR POR ID
// export async function buscarPersonalPorId(req, res) {
//     try {
//         const personal = await Personal.findByPk(req.params.id);

//         if (!personal) {
//             return res.status(404).json({ erro: "Personal não encontrado" });
//         }

//         res.status(200).json(personal);
//     } catch {
//         res.status(500).json({ erro: "Erro ao buscar personal" });
//     }
// }

// // CRIAR
// export async function criarPersonal(req, res) {
//     const { cref, nome, email, senha, genero_id, imagem } = req.body;

//     if (!cref || !nome || !email || !senha || !genero_id) {
//         return res.status(400).json({ erro: "Preencha os campos corretamente" });
//     }

//     try {
//         // evitar duplicação
//         const existeEmail = await Personal.findOne({ where: { email } });
//         if (existeEmail) {
//             return res.status(400).json({ erro: "Email já cadastrado" });
//         }

//         const existeCref = await Personal.findOne({ where: { cref } });
//         if (existeCref) {
//             return res.status(400).json({ erro: "CREF já cadastrado" });
//         }

//         const hashedSenha = await bcrypt.hash(senha, 10);

//         const personal = await Personal.create({
//             cref,
//             nome,
//             email,
//             senha: hashedSenha,
//             genero_id,
//             imagem
//         });

//         res.status(201).json({
//             mensagem: "Personal cadastrado com sucesso",
//             personal,
//         });

//     } catch {
//         res.status(500).json({ erro: "Erro ao cadastrar personal" });
//     }
// }

// // ATUALIZAR
// export async function atualizarPersonal(req, res) {
//     try {
//         const dados = {
//             cref: req.body.cref,
//             nome: req.body.nome,
//             email: req.body.email,
//             genero_id: req.body.genero_id,
//             imagem: req.body.imagem
//         };

//         if (req.body.senha) {
//             dados.senha = await bcrypt.hash(req.body.senha, 10);
//         }

//         const [linhasAfetadas] = await Personal.update(
//             dados,
//             { where: { id: req.params.id } }
//         );

//         if (linhasAfetadas === 0) {
//             return res.status(404).json({ erro: "Personal não encontrado" });
//         }

//         res.status(200).json({ mensagem: "Personal atualizado com sucesso!" });

//     } catch {
//         res.status(500).json({ erro: "Erro ao atualizar personal" });
//     }
// }

// // LOGIN
// export async function loginPersonal(req, res) {
//     const { email, senha } = req.body;

//     if (!email || !senha) {
//         return res.status(400).json({ erro: "Email e senha são obrigatórios" });
//     }

//     try {
//         const personal = await Personal.findOne({ where: { email } });

//         if (!personal) {
//             return res.status(401).json({ erro: "Credenciais inválidas" });
//         }

//         const senhaValida = await bcrypt.compare(senha, personal.senha);

//         if (!senhaValida) {
//             return res.status(401).json({ erro: "Credenciais inválidas" });
//         }

//         res.status(200).json({
//             mensagem: "Login realizado com sucesso",
//             personal: {
//                 id: personal.id,
//                 nome: personal.nome,
//                 email: personal.email
//             }
//         });

//     } catch {
//         res.status(500).json({ erro: "Erro ao fazer login" });
//     }
// }

// // DELETAR
// export async function deletarPersonal(req, res) {
//     try {
//         const linhasAfetadas = await Personal.destroy({
//             where: { id: req.params.id }
//         });

//         if (linhasAfetadas === 0) {
//             return res.status(404).json({ erro: "Personal não encontrado" });
//         }

//         res.status(200).json({ mensagem: "Personal deletado com sucesso" });

//     } catch {
//         res.status(500).json({ erro: "Erro ao deletar personal" });
//     }
// }