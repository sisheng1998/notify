import { useContext } from 'react'
import BottomSheetContext from '../components/BottomSheetProvider'

const useBottomSheet = () => useContext(BottomSheetContext)

export default useBottomSheet
