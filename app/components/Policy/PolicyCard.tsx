import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import { Policy } from '../../types/policy'
import { Action } from '../../types/action'

const PolicyCard = ({
  policy,
  handlePolicyAction,
}: {
  policy: Policy
  handlePolicyAction: (policy: Policy, action: Action) => void
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => handlePolicyAction(policy, 'VIEW')}
    >
      <View>
        <Text>{policy.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PolicyCard
