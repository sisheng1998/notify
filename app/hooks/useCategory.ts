import { useContext } from 'react'

import CategoryContext from '../components/Category/CategoryProvider'

const useCategory = () => useContext(CategoryContext)

export default useCategory
