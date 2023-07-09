import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

import Container from '../components/Common/Container'
import useDebounce from '../hooks/useDebounce'
import Search from '../components/Common/Search'
import Title from '../components/Common/Title'
import ScrollableContainer from '../components/Common/ScrollableContainer'
import { Policy } from '../types/policy'
import { Category } from '../types/category'
import InfoMessage from '../components/Common/InfoMessage'
import { getCategories } from '../apis/category'

const Trash = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [policies, setPolicies] = useState<Policy[]>([])

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedValue = useDebounce<string>(searchQuery, 500)

  const [resetScroll, setResetScroll] = useState<boolean>(false)

  useEffect(() => {
    const subscriber = getCategories((categories: Category[]) => {
      setCategories(categories)
      if (isLoading) setIsLoading(false)
    })

    return () => subscriber()
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

  return (
    <Container
      header={
        <Search
          placeholder='Search by Name / Policy Number'
          value={searchQuery}
          setValue={setSearchQuery}
        />
      }
      isLoading={isLoading}
    >
      <Title text='Trash' number={results.length} />

      <ScrollableContainer
        resetScroll={resetScroll}
        setResetScroll={setResetScroll}
      >
        {categories.length === 0 || results.length === 0 ? (
          <InfoMessage
            text={
              categories.length === 0
                ? 'No Policy in Trash'
                : 'Policy Not Found'
            }
          />
        ) : (
          results.map((policy) => (
            <View key={policy.id}>
              <Text>{policy.name}</Text>
            </View>
          ))
        )}

        <View className='h-12' />
      </ScrollableContainer>
    </Container>
  )
}

export default Trash
