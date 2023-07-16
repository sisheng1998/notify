import React, { useState, useEffect } from 'react'
import { View } from 'react-native'

import Container from '../components/Common/Container'
import useDebounce from '../hooks/useDebounce'
import Search from '../components/Common/Search'
import Title from '../components/Common/Title'
import ScrollableContainer from '../components/Common/ScrollableContainer'
import { Policy } from '../types/policy'
import InfoMessage from '../components/Common/InfoMessage'
import useBottomSheet from '../hooks/useBottomSheet'
import useCategory from '../hooks/useCategory'
import { getPolicies } from '../apis/policy'
import PolicyContent from '../components/Policy/PolicyContent'
import PolicyCard from '../components/Policy/PolicyCard'
import { Action } from '../types/action'

const Trash = () => {
  const { handleOpenBottomSheet, setBottomSheetContent } = useBottomSheet()

  const { isLoading: isCategoryLoading } = useCategory()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [policies, setPolicies] = useState<Policy[]>([])

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedValue = useDebounce<string>(searchQuery, 500)

  const [resetScroll, setResetScroll] = useState<boolean>(false)

  useEffect(() => {
    const subscriber = getPolicies(true, (policies: Policy[]) => {
      setPolicies(policies)
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

  const handlePolicyAction = (policy: Policy, action: Action) => {
    setBottomSheetContent(<PolicyContent policy={policy} action={action} />)
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
      <Title text='Trash' number={results.length} />

      <ScrollableContainer
        resetScroll={resetScroll}
        setResetScroll={setResetScroll}
      >
        {policies.length === 0 || results.length === 0 ? (
          <InfoMessage
            text={
              policies.length === 0
                ? 'No policy in trash.'
                : 'Policy not found.'
            }
          />
        ) : (
          results.map((policy) => (
            <PolicyCard
              key={policy.id}
              policy={policy}
              handlePolicyAction={handlePolicyAction}
            />
          ))
        )}

        <View className='h-12' />
      </ScrollableContainer>
    </Container>
  )
}

export default Trash
