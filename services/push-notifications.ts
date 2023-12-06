import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export async function schedulePushNotification({
  appointmentStartTime,
  formattedTime,
  appointmentDescription,
  appointmentID,
  checkedIfScheduled,
}: {
  appointmentStartTime: string,
  formattedTime: string,
  appointmentDescription: string,
  appointmentID: string,
  checkedIfScheduled?: boolean,
}): Promise<void> {
  // Checking to see if this appointment already has a push notification scheduled
  // This is to prevent duplicate push notifications from being scheduled
  if (!checkedIfScheduled) {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const alreadyScheduled = scheduled.find((notification) => notification.content.data.data === appointmentID);
    if (alreadyScheduled) { return; }
  }

  const time = new Date(appointmentStartTime);
  time.setMinutes(time.getMinutes() - 30);
  // TODO: replace trigger with time once testing is complete

  const trigger = new Date(Date.now());
  trigger.setSeconds(trigger.getSeconds() + 60);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: appointmentDescription,
      body: `Your appointment starts in 30 minutes at ${formattedTime}`,
      data: { data: appointmentID },
    },
    trigger,
  });
}
export async function registerForPushNotificationsAsync(): Promise<any> {
  let token: Notifications.ExpoPushToken;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert('Must use physical device for Push Notifications');
  }
  await SecureStore.setItemAsync('push_token', token.data);
}
