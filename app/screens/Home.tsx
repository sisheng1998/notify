import React from 'react'
import { Text } from 'react-native'

import Container from '../components/Container'

const Home = () => {
  return (
    <Container header={<></>} isLoading={false}>
      <Text className='font-js'>Home Screen</Text>
    </Container>
  )
}

export default Home
