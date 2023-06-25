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
  onPress: (content: ReactNode) => void
}
const BottomSheetContext = createContext<BottomSheetContextProps>({
  onPress: () => {},
})

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode>(null)

  const ref = useRef<BottomSheetRefProps>(null)

  const onPress = useCallback((content: ReactNode) => {
    const isActive = ref.current?.isActive()

    if (!isActive) {
      setContent(content)
    }

    ref.current?.scrollTo(isActive ? 0 : -SCREEN_HEIGHT / 1.25)
  }, [])

  return (
    <BottomSheetContext.Provider
      value={{
        onPress,
      }}
    >
      {children}
      <BottomSheet ref={ref}>{content}</BottomSheet>
    </BottomSheetContext.Provider>
  )
}

export default BottomSheetContext
