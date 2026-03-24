import { Treino, Exercicio, Aluno } from "../models/index.js";

export async function createTreino(req, res) {
  try {
    const { nome, personal_id, exercicios } = req.body;

    if (!nome || !personal_id || !Array.isArray(exercicios)) {
      return res.status(400).json({ erro: "nome, personal_id e exercicios são obrigatórios" });
    }

    const treino = await Treino.create({ nome, personal_id });

    for (const item of exercicios) {
      const { exercicio_id, repeticoes, descanso, ordem, series, carga } = item;

      if (!exercicio_id) {
        await treino.destroy();
        return res.status(400).json({ erro: "exercicio_id faltando em um item" });
      }

      const exercicio = await Exercicio.findByPk(exercicio_id);
      if (!exercicio) {
        await treino.destroy();
        return res.status(404).json({ erro: `Exercicio ${exercicio_id} não encontrado` });
      }

      await treino.addExercicio(exercicio, {
        through: {
          repeticoes: repeticoes || null,
          descanso: descanso || null,
          ordem: ordem || null,
          series: series || null,
          carga: carga || null,
        },
      });
    }

    const created = await Treino.findByPk(treino.id, {
      include: [
        {
          model: Exercicio,
          as: 'exercicios',
          through: {
            attributes: ['repeticoes', 'descanso', 'ordem', 'series', 'carga'],
          },
        },
      ],
    });

    return res.status(201).json({ mensagem: 'Treino criado', treino: created });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro no servidor ao criar treino' });
  }
}

export async function getTreinosByPersonal(req, res) {
  try {
    const personal_id = Number(req.params.id);
    if (!personal_id) {
      return res.status(400).json({ erro: 'personal_id inválido' });
    }

    const treinos = await Treino.findAll({
      where: { personal_id },
      include: [
        {
          model: Exercicio,
          as: 'exercicios',
          through: {
            attributes: ['repeticoes', 'descanso', 'ordem', 'series', 'carga'],
          },
        },
      ],
    });

    return res.status(200).json(treinos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro no servidor ao listar treinos do personal' });
  }
}

export async function getTreinosByAluno(req, res) {
  try {
    const aluno_id = Number(req.params.id);
    if (!aluno_id) {
      return res.status(400).json({ erro: 'aluno_id inválido' });
    }

    const aluno = await Aluno.findByPk(aluno_id, {
      include: [
        {
          model: Treino,
          as: 'treinos',
          through: { attributes: [] },
          include: [
            {
              model: Exercicio,
              as: 'exercicios',
              through: {
                attributes: ['repeticoes', 'descanso', 'ordem', 'series', 'carga'],
              },
            },
          ],
        },
      ],
    });

    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    return res.status(200).json(aluno.treinos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro no servidor ao listar treinos do aluno' });
  }
}

// export async function linkAlunoTreino(req, res) {
//   try {
//     const { aluno_id, treino_id, repeticoes, series, descanso, ordem, carga } = req.body;

//     if (!aluno_id || !treino_id) {
//       return res.status(400).json({ erro: 'aluno_id e treino_id são obrigatórios' });
//     }

//     const aluno = await Aluno.findByPk(aluno_id);
//     const treino = await Treino.findByPk(treino_id);

//     if (!aluno || !treino) {
//       return res.status(404).json({ erro: 'Aluno ou treino não encontrado' });
//     }

//     await aluno.addTreino(treino);

//     return res.status(201).json({ mensagem: 'Treino vinculado ao aluno com sucesso' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ erro: 'Erro no servidor ao vincular aluno e treino' });
//   }
// }

export async function linkAlunoTreino(req, res) {
  try {
    const {
      aluno_id,
      treino_id,
      repeticoes,
      series,
      descanso,
      ordem,
      carga
    } = req.body;

    if (!aluno_id || !treino_id) {
      return res.status(400).json({
        erro: 'aluno_id e treino_id são obrigatórios'
      });
    }

    const aluno = await Aluno.findByPk(aluno_id);
    const treino = await Treino.findByPk(treino_id);

    if (!aluno || !treino) {
      return res.status(404).json({
        erro: 'Aluno ou treino não encontrado'
      });
    }

    await aluno.addTreino(treino, {
      through: {
        repeticoes,
        series,
        descanso,
        ordem,
        carga
      }
    });

    return res.status(201).json({
      mensagem: 'Treino vinculado ao aluno com sucesso',
      dados: {
        aluno_id,
        treino_id,
        repeticoes,
        series,
        descanso,
        ordem,
        carga
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro no servidor ao vincular aluno e treino'
    });
  }
}

// Mostar
export async function mostrarTreino(req, res) {
    Treino.findAll()
        .then(treinos => {
            res.status(200).json(treinos)
        })
        .catch(() => {
            res.status(500).json({ erro: "Erro ao buscar treinos" })
        });
}

// Delete
export async function deleteAlunoTreino(req, res) {
  try {
    const { aluno_id, treino_id } = req.params;

    if (!aluno_id || !treino_id) {
      return res.status(400).json({
        erro: 'aluno_id e treino_id são obrigatórios'
      });
    }

    const aluno = await Aluno.findByPk(aluno_id);
    const treino = await Treino.findByPk(treino_id);

    if (!aluno || !treino) {
      return res.status(404).json({
        erro: 'Aluno ou treino não encontrado'
      });
    }

    await aluno.removeTreino(treino);

    return res.status(200).json({
      mensagem: 'Treino removido do aluno com sucesso'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao remover treino do aluno'
    });
  }
}

// Atualizar
import { TreinoExercicio } from '../models/treinoExercicioM.js'; // ajuste o caminho

export async function atualizarAlunoTreino(req, res) {
  try {
    const { aluno_id, treino_id } = req.params;

    const {
      repeticoes,
      series,
      descanso,
      ordem,
      carga
    } = req.body;

    const registro = await TreinoExercicio.findOne({
      where: {
        aluno_id,
        treino_id
      }
    });

    if (!registro) {
      return res.status(404).json({
        erro: 'Vínculo não encontrado'
      });
    }

    await registro.update({
      repeticoes,
      series,
      descanso,
      ordem,
      carga
    });

    return res.status(200).json({
      mensagem: 'Treino atualizado com sucesso',
      dados: registro
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao atualizar treino do aluno'
    });
  }
}