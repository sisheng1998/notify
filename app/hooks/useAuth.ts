import { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const handleAuthStateChange = auth().onAuthStateChanged((user) =>
      setIsLoggedIn(user ? true : false)
    )

    return handleAuthStateChange
  }, [])

  return isLoggedIn
}

export default useAuth
