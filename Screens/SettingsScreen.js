import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Alert, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync();
    loadReminderSetting();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Enable notifications in system settings.');
    }
  };

  const loadReminderSetting = async () => {
    try {
      const saved = await AsyncStorage.getItem('@remindersEnabled');
      if (saved !== null) {
        setRemindersEnabled(JSON.parse(saved));
      }
    } catch (error) {
      console.log('Failed to load reminder setting');
    }
  };

  const handleToggle = async (value) => {
    setRemindersEnabled(value);
    await AsyncStorage.setItem('@remindersEnabled', JSON.stringify(value));
    if (value) {
      scheduleWaterReminder();
      scheduleSleepReminder();
      scheduleExerciseReminder();
    } else {
      cancelAllReminders();
    }
  };

  const scheduleWaterReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '💧 Time to hydrate!',
        body: 'Don’t forget to log your water intake.',
      },
      trigger: { hour: 12, minute: 0, repeats: true },
    });
  };

  const scheduleSleepReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🛌 Time to log your sleep',
        body: 'Track your rest for a better night’s sleep.',
      },
      trigger: { hour: 22, minute: 0, repeats: true },
    });
  };

  const scheduleExerciseReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🏃 Log your exercise!',
        body: 'How much did you move today? Log your activity.',
      },
      trigger: { hour: 18, minute: 0, repeats: true },
    });
  };

  const cancelAllReminders = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Daily Reminders</Text>
        <Switch value={remindersEnabled} onValueChange={handleToggle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
  },
});




