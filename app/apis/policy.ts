import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'

import { getUserId } from './user'
import { AddPolicy, Policy, PolicyWithoutId, EditPolicy } from '../types/policy'

const collection = firestore().collection('policies')

export const editPolicy = async (id: string, data: EditPolicy) => {
  const now = new Date().toISOString()

  const category: EditPolicy = {
    ...data,
    updatedAt: now,
  }

  await collection.doc(id).update(category)
}

export const deleteAllPoliciesInTrash = async () => {
  const userId = getUserId()

  if (userId === '') throw new Error('User not logged in.')

  const trashedPolicies = await collection
    .where('userId', '==', userId)
    .where('isTrashed', '==', true)
    .get()

  const batch = firestore().batch()

  trashedPolicies.forEach((documentSnapshot) =>
    batch.delete(documentSnapshot.ref)
  )

  await batch.commit()
}
