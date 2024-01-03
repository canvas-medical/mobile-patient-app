import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

/**
 * Schedules a push notification for an appointment.
 * If the appointment already has a push notification scheduled, it will not schedule a new one.
 * The notification will be triggered 30 minutes before the appointment start time.
 *
 * @param {Object} options - The options for scheduling the push notification.
 * @param {string} options.appointmentStartTime - The start time of the appointment.
 * @param {string} options.formattedTime - The formatted time of the appointment.
 * @param {string} options.appointmentDescription - The description of the appointment.
 * @param {string} options.appointmentID - The ID of the appointment.
 * @param {boolean} [options.checkedIfScheduled] - Optional flag indicating if the appointment has already been checked for a scheduled notification.
 * @returns {Promise<void>} A promise that resolves when the push notification is scheduled.
 */
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
  if (!checkedIfScheduled) {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const alreadyScheduled = scheduled.find((notification) => notification.content.data.data === appointmentID);
    if (alreadyScheduled) { return; }
  }

  const trigger = new Date(appointmentStartTime);
  trigger.setMinutes(trigger.getMinutes() - 30);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: appointmentDescription,
      body: `Your appointment starts in 30 minutes at ${formattedTime}`,
      data: { data: appointmentID },
    },
    trigger
  });
}

/**
 * Registers the device for push notifications.
 * This function sets up the necessary notification channel for Android devices,
 * requests permission to send notifications, and retrieves the Expo push token.
 * The push token is then stored securely using SecureStore.
 *
 * @returns {Promise<void>} A promise that resolves when the device is registered for push notifications.
 */
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
  } else console.log('Must use physical device for Push Notifications');
  await SecureStore.setItemAsync('push_token', token.data);
}
