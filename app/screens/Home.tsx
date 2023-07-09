import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

import Container from '../components/Common/Container'
import useDebounce from '../hooks/useDebounce'
import Search from '../components/Common/Search'
import Title from '../components/Common/Title'
import ScrollableContainer from '../components/Common/ScrollableContainer'
import { Policy } from '../types/policy'
import InfoMessage from '../components/Common/InfoMessage'
import AddNewArea from '../components/Common/AddNewArea'
import useBottomSheet from '../hooks/useBottomSheet'
import PolicyContent from '../components/Policy/PolicyContent'
import useCategory from '../hooks/useCategory'

const Home = () => {
  const { handleOpenBottomSheet, setBottomSheetContent } = useBottomSheet()

  const { isLoading: isCategoryLoading } = useCategory()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [policies, setPolicies] = useState<Policy[]>([])

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedValue = useDebounce<string>(searchQuery, 500)

  const [resetScroll, setResetScroll] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setResetScroll(true)
  }, [debouncedValue])

  const results =
    debouncedValue === ''
      ? policies
      : policies.filter(
          (policy) =>
            policy.name.toLowerCase().includes(debouncedValue.toLowerCase()) ||
            policy.policyNo.toLowerCase().includes(debouncedValue.toLowerCase())
        )

  const handleAddNewPolicy = () => {
    setBottomSheetContent(<PolicyContent action='ADD' />)
    handleOpenBottomSheet()
  }

  return (
    <Container
      header={
        <Search
          placeholder='Search by Name / Policy Number'
          value={searchQuery}
          setValue={setSearchQuery}
        />
      }
      isLoading={isCategoryLoading || isLoading}
    >
      <Title text='Policy' number={results.length} />

      <ScrollableContainer
        resetScroll={resetScroll}
        setResetScroll={setResetScroll}
      >
        {policies.length === 0 || results.length === 0 ? (
          <InfoMessage
            text={policies.length === 0 ? 'No Policy Yet' : 'Policy Not Found'}
          />
        ) : (
          results.map((policy) => (
            <View key={policy.id}>
              <Text>{policy.name}</Text>
            </View>
          ))
        )}

        <AddNewArea text='New Policy' onPress={handleAddNewPolicy} />

        <View className='h-12' />
      </ScrollableContainer>
    </Container>
  )
}

export default Home
