import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'

import { getUserId } from './user'
import { AddCategory, Category, CategoryWithoutId } from '../types/category'

const collection = firestore().collection('categories')

export const getCategories = (callback: (categories: Category[]) => void) => {
  const userId = getUserId()

  if (userId === '') return () => {}

  const onResult = (
    querySnapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
  ) => {
    const categories: Category[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data() as CategoryWithoutId

      categories.push({
        id: doc.id,
        ...data,
      })
    })

    callback(categories)
  }

  const onError = (error: Error) => console.log(error)

  return collection
    .where('userId', '==', userId)
    .where('isTrashed', '==', false)
    .orderBy('createdAt', 'desc')
    .onSnapshot(onResult, onError)
}

export const addCategory = async (data: AddCategory) => {
  const userId = getUserId()

  if (userId === '') throw new Error('User not logged in.')

  const now = new Date().toISOString()

  const category: CategoryWithoutId = {
    ...data,
    userId,
    createdAt: now,
    updatedAt: now,
    isTrashed: false,
  }

  await collection.add(category)
}
