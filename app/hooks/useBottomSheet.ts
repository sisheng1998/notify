import { useContext } from 'react'

import BottomSheetContext from '../components/BottomSheet/BottomSheetProvider'

const useBottomSheet = () => useContext(BottomSheetContext)

export default useBottomSheet
