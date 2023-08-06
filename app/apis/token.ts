import firestore from '@react-native-firebase/firestore'

import { Token, TokenWithoutId, UpdateToken } from '../types/token'

const collection = firestore().collection('tokens')

export const getToken = async (userId: string): Promise<Token | null> => {
  let token: Token | null = null

  const tokensRef = collection.where('userId', '==', userId).limit(1)
  const tokens = await tokensRef.get()

  if (!tokens.empty) {
    token = {
      ...(tokens.docs[0].data() as TokenWithoutId),
      id: tokens.docs[0].id,
    }
  }

  return token
}

export const storeToken = async (userId: string, value: string) => {
  const now = new Date().toISOString()

  const token: TokenWithoutId = {
    value,
    userId,
    createdAt: now,
    updatedAt: now,
  }

  await collection.add(token)
}

export const updateToken = async (id: string, value: string) => {
  const now = new Date().toISOString()

  const token: UpdateToken = {
    value,
    updatedAt: now,
  }

  await collection.doc(id).update(token)
}

export const deleteToken = async (id: string) => {
  await collection.doc(id).delete()
}
