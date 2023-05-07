/**
 * Destaca as palavras-chave de um bloco de texto
 * @param {String} string String do parágrafo
 * @param {String} keyWord Palavra-chave
 * @param {String} class Classe que será retornada dentro do parágrafo
 * @returns {String}
 */

export const highlight = (string, keyWord, className = 'highlight') => {
  return string.replace(keyWord, (match) => {
    return `<span class="${className}">` + match + '</span>'
  })
}

/**
 * Cria um arquivo a partir de uma string
 *
 * @param {String} data - Conteúdo do arquivo
 * @param {String} name - Nome do arquivo
 */

export const downloadFile = (data, name = 'download.txt') => {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
  )
  element.setAttribute('download', name)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
