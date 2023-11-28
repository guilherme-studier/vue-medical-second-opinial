export const formatCurrency = (value) => {
  // Supondo que value seja um número
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
