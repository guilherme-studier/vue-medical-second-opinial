/** ==================================================
 * Helper para ajudar no tratamento de erros da API
 * =================================================== */

/**
 * Trata a mensagem de erro e retorna um objeto com um array de mensagens
 * @param {Object} error
 * @returns {Object} - Objeto com a/as mensagens de erro
 */
export const errorMessageHandler = (error) => {
  const messagesObj = {
    messages: ['Ocorreu algum erro com a requisição.']
  }

  if (error.response.data) {
    const {
      response: { data }
    } = error /** Extrai o parametro data da resposta de erro */

    if (Array.isArray(data)) {
      messagesObj.messages = data.map((item) => item.message)
    }
  }

  return messagesObj
}
