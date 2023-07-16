import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'

import { getUserId } from './user'
import { AddPolicy, Policy, PolicyWithoutId, EditPolicy } from '../types/policy'

const collection = firestore().collection('policies')

export const getPolicies = (
  isTrashed = false,
  callback: (policies: Policy[]) => void
) => {
  const userId = getUserId()

  if (userId === '') return () => {}

  const onResult = (
    querySnapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
  ) => {
    const policies: Policy[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as PolicyWithoutId

      policies.push({
        id: doc.id,
        ...data,
      })
    })

    callback(policies)
  }

  const onError = (error: Error) => console.log(error)

  return collection
    .where('userId', '==', userId)
    .where('isTrashed', '==', isTrashed)
    .orderBy('name', 'asc')
    .onSnapshot(onResult, onError)
}

export const addPolicy = async (data: AddPolicy) => {
  const userId = getUserId()

  if (userId === '') throw new Error('User not logged in.')

  const now = new Date().toISOString()

  const policy: PolicyWithoutId = {
    ...data,
    userId,
    createdAt: now,
    updatedAt: now,
    isTrashed: false,
  }

  await collection.add(policy)
}

export const editPolicy = async (id: string, data: EditPolicy) => {
  const now = new Date().toISOString()

  const policy: EditPolicy = {
    ...data,
    updatedAt: now,
  }

  await collection.doc(id).update(policy)
}

export const deletePolicy = async (id: string) => {
  await collection.doc(id).delete()
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
