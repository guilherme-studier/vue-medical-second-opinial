/**
 * Formata a categoria de acordo com a string passada
 * @returns {String}
 */

export const formatCategory = (category) => {
  switch (category) {
    case 'tit':
      return 'Titular'
    case 'sup':
      return 'Suplente'
  }
}
