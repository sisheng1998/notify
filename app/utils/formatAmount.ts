import { MaskService } from 'react-native-masked-text'

export const moneyOptions = {
  precision: 2,
  separator: '.',
  delimiter: ',',
  unit: 'RM ',
  suffixUnit: '',
}

export const formatAmount = (amount: string) =>
  MaskService.toMask('money', amount, moneyOptions)
