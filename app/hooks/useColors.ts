import colors from 'tailwindcss/colors'

interface Color {
  text: string
  background: string
}

const neutralColor: Color = {
  text: colors.neutral[600],
  background: colors.neutral[100],
}

const primaryColor: Color = {
  text: '#ED1C24',
  background: 'rgba(237, 28, 36, 0.05)',
}

const useColors = () => {
  const COLORS: Color[] = [
    {
      text: colors.red[600],
      background: colors.red[100],
    },
    {
      text: colors.orange[600],
      background: colors.orange[100],
    },
    {
      text: colors.yellow[600],
      background: colors.yellow[100],
    },
    {
      text: colors.green[600],
      background: colors.green[100],
    },
    {
      text: colors.blue[600],
      background: colors.blue[100],
    },
    {
      text: colors.indigo[600],
      background: colors.indigo[100],
    },
    {
      text: colors.violet[600],
      background: colors.violet[100],
    },
  ]

  return COLORS
}

export const getColor = (color: number) => {
  if (color < 0) return color === -1 ? neutralColor : primaryColor

  const colors = useColors()
  return colors[color % colors.length]
}

export default useColors
