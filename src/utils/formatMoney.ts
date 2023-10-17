/**
 * Formata valor monetário para real brasileiro
 * @param value valor
 * @returns Valor formatado -> R$ 1.000,00
 */
export function formatMoney(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
