import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import notifee, { Event, EventType } from '@notifee/react-native'

import { getUserId } from './user'
import { deleteToken, getToken, storeToken, updateToken } from './token'

export const requestFCMPermission = async () => {
  const userId = getUserId()

  if (userId === '') return

  const token = await getToken(userId)

  try {
    const response = await messaging().requestPermission()
    const enabled =
      response === messaging.AuthorizationStatus.AUTHORIZED ||
      response === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      const fcmToken = await messaging().getToken()

      if (token) {
        if (token.value !== fcmToken) {
          await updateToken(token.id, fcmToken)
        }
      } else {
        await storeToken(userId, fcmToken)
      }
    } else if (token) {
      await deleteToken(token.id)
    }
  } catch (error) {
    if (token) {
      await deleteToken(token.id)
    }
  }
}

export const subscribeOnMessage = () => messaging().onMessage(onMessageReceived)

export const subscribeBackgroundMessage = () =>
  messaging().setBackgroundMessageHandler(onMessageReceived)

const onMessageReceived = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) => {
  const { notification } = remoteMessage

  if (notification) {
    const { title, body } = notification

    await notifee.displayNotification({
      title,
      body,
    })
  }
}

export const subscribeNotifeeEvent = () =>
  notifee.onForegroundEvent(onForegroundEvent)

const onForegroundEvent = ({ type, detail }: Event) => {
  switch (type) {
    case EventType.DISMISSED:
      break
    case EventType.PRESS:
      break
  }
}

export const handleNotifeeBackgroundEvent = () =>
  notifee.onBackgroundEvent(async ({ type, detail }: Event) => {
    const { notification } = detail

    if (notification && notification.id && type === EventType.ACTION_PRESS) {
      await notifee.cancelNotification(notification.id)
    }
  })
