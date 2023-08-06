import { registerRootComponent } from 'expo'

import App from './App'
import {
  subscribeBackgroundMessage,
  handleNotifeeBackgroundEvent,
} from './app/apis/fcm'

subscribeBackgroundMessage()
handleNotifeeBackgroundEvent()

const HeadlessCheck = ({ isHeadless }) => {
  if (isHeadless) {
    return null
  }

  return <App />
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(HeadlessCheck)
