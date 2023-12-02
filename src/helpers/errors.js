/**
 * Formata o erros de acordo com a string passada
 * @returns {String}
 */

export const formatErrors = (error) => {
  switch (error) {
    case 'data_in_use':
      return 'Atividade ativa em um caso clínico'
    case 'Usuário e/ou senha inválido':
      return 'Usuário e/ou senha inválido'
    case 'E-mail não cadastrado':
      return 'Usuário não encontrado'
  }
}
