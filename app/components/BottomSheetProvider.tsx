import React, {
  createContext,
  useRef,
  useCallback,
  useState,
  ReactNode,
} from 'react'
import { Dimensions } from 'react-native'

import BottomSheet, { BottomSheetRefProps } from './BottomSheet'

type BottomSheetContextProps = {
  handleOpenBottomSheet: () => void
  setBottomSheetContent: React.Dispatch<React.SetStateAction<ReactNode>>
}
const BottomSheetContext = createContext<BottomSheetContextProps>({
  handleOpenBottomSheet: () => {},
  setBottomSheetContent: () => {},
})

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [content, setBottomSheetContent] = useState<ReactNode>(null)

  const ref = useRef<BottomSheetRefProps>(null)

  const handleOpenBottomSheet = useCallback(() => {
    const isActive = ref.current?.isActive()
    ref.current?.scrollTo(isActive ? 0 : -SCREEN_HEIGHT / 1.25)
  }, [])

  return (
    <BottomSheetContext.Provider
      value={{
        handleOpenBottomSheet,
        setBottomSheetContent,
      }}
    >
      {children}
      <BottomSheet ref={ref} setBottomSheetContent={setBottomSheetContent}>
        {content}
      </BottomSheet>
    </BottomSheetContext.Provider>
  )
}

export default BottomSheetContext
