export const formatAmount = (amount: string) => {
  const parsedAmount = parseFloat(amount)

  if (isNaN(parsedAmount)) return amount

  const formattedAmount = parsedAmount.toLocaleString('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formattedAmount
}
