import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import { Policy } from '../../types/policy'
import { Action } from '../../types/action'
import EditIcon from '../../icons/Edit'
import Tag from '../Common/Tag'
import useCategory from '../../hooks/useCategory'
import NotificationIcon from '../../icons/Notification'
import { formatAmount } from '../../utils/formatAmount'

const PolicyCard = ({
  policy,
  handlePolicyAction,
}: {
  policy: Policy
  handlePolicyAction: (policy: Policy, action: Action) => void
}) => {
  const { categories } = useCategory()

  const category = categories.find(
    (category) => category.id === policy.categoryId
  )

  const amount = formatAmount(policy.amount)

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        handlePolicyAction(policy, policy.isTrashed ? 'DELETE' : 'VIEW')
      }
    >
      <View className='mb-2 rounded-lg bg-white shadow-sm'>
        <View className='flex-row items-start justify-between'>
          <View className='flex-1 p-4 pb-3'>
            <Tag
              text={category ? category.name : 'Uncategorized'}
              colorIndex={category ? category.color : -1}
            />

            <Text className='mt-2.5 font-js text-neutral-700'>
              {policy.name}
            </Text>

            <Text className='font-js-mid text-lg text-neutral-900'>
              {policy.policyNo}
            </Text>

            {policy.plan !== '' && (
              <Text className='mt-0.5 font-js text-xs text-neutral-500'>
                {policy.plan}
              </Text>
            )}
          </View>

          <TouchableWithoutFeedback
            onPress={(e) => {
              e.stopPropagation()
              handlePolicyAction(policy, policy.isTrashed ? 'DELETE' : 'EDIT')
            }}
          >
            <View className='p-4'>
              <EditIcon className='-mr-0.5 h-5 w-5 text-primary' />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View className='h-px bg-neutral-200' />

        <View className='flex-row items-start justify-between space-x-4 p-4 pt-3'>
          <View className='flex-1'>
            <Text className='mb-0.5 font-js text-xs text-neutral-500'>
              Payment Due
            </Text>

            <View className='flex-row items-center space-x-1.5'>
              <Text className='font-js-mid text-base text-neutral-900'>
                {policy.paymentDueDate}
              </Text>

              {policy.getNotified && (
                <NotificationIcon className='h-5 w-5 text-primary' />
              )}
            </View>
          </View>

          <View className='flex-1'>
            <Text className='mb-0.5 font-js text-xs text-neutral-500'>
              Amount - {policy.paymentFrequency}
            </Text>

            <Text className='font-js-mid text-base text-neutral-900'>
              {amount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PolicyCard
