import { Avaliacao } from "../models/avaliacaoM.js";

// Criar avaliação
export async function criarAvaliacao(req, res) {
    const { id_avaliador, id_avaliado, tipo_avaliador, nota } = req.body;

    if (!id_avaliador || !id_avaliado || !tipo_avaliador || !nota) {
        return res.status(400).json({ erro: "Preencha os campos obrigatórios" });
    }

    try {
        const avaliacao = await Avaliacao.create({ id_avaliador, id_avaliado, tipo_avaliador, nota });
        res.status(201).json({ mensagem: "Avaliação criada com sucesso", avaliacao });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar avaliação" });
    }
}

// Listar avaliações de um usuário (ex.: todas as avaliações recebidas por um personal)
export async function listarAvaliacoes(req, res) {
    const { id: id_avaliado } = req.params;  // :id da rota é o id_avaliado

    try {
        const avaliacoes = await Avaliacao.findAll({
            where: { id_avaliado },  // Corrigido: filtra por id_avaliado, não por id da avaliação
            attributes: ['id', 'id_avaliador', 'id_avaliado', 'tipo_avaliador', 'nota']  // Seleciona apenas esses campos
            // Removido include, pois você quer apenas campos da tabela Avaliacao
        });
        res.status(200).json(avaliacoes);
    } catch (error) {
        console.error(error);  // Adicione para debugar no console
        res.status(500).json({ erro: "Erro ao buscar avaliações" });
    }
}

// Atualizar avaliação
export async function atualizarAvaliacoes(req, res) {
    const { nota } = req.body;  // Campos que podem ser atualizados
    const { id } = req.params;  // ID da avaliação a ser atualizada

    // Validação básica: pelo menos um campo deve ser fornecido
    if (!nota) {
        return res.status(400).json({ erro: "O campo nota deve ser fornecido para atualização" });
    }

    // Se nota for fornecida, validar se está entre 1 e 5
    if (nota && (nota < 1 || nota > 5)) {
        return res.status(400).json({ erro: "Nota deve ser entre 1 e 5" });
    }

    try {
        const [linhasAfetadas] = await Avaliacao.update(
            { nota },  // Campos a atualizar
            { where: { id } }       // Condição: pelo ID
        );

        if (linhasAfetadas === 0) {
            return res.status(404).json({ erro: "Avaliação não encontrada" });
        }

    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar avaliação" });
    }
}