import React, { useEffect, useRef } from 'react'
import { ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

const ScrollableContainer = ({
  children,
  resetScroll = false,
  setResetScroll,
}: {
  children: React.ReactNode
  resetScroll?: boolean
  setResetScroll?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const isFocused = useIsFocused()

  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (isFocused || resetScroll) {
      scrollViewRef.current?.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      })

      setResetScroll && setResetScroll(false)
    }
  }, [isFocused, resetScroll])

  return (
    <ScrollView ref={scrollViewRef} className='-mr-4 flex-1 pr-4'>
      {children}
    </ScrollView>
  )
}

export default ScrollableContainer
