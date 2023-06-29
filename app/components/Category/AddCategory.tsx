import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Button from '../Button'

const AddCategory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <View className='flex-1 px-6'>
      <ScrollView>
        <Text>AddCategory</Text>
      </ScrollView>

      <Button
        text='Create'
        onPress={() => {
          setIsLoading(true)
          setTimeout(() => {
            setIsLoading(false)
          }, 1000)
        }}
        loading={isLoading}
      />
    </View>
  )
}

export default AddCategory
